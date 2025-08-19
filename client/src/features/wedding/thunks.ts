import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '@/store'
import weddingAPI from '@/features/wedding/api'
import {
  getHasAcceptedEntryEvent,
  getHasCompletedAllLodgingInvites,
  getHasCompletedAllMainInvites,
  getHasCompletedEntryInvites,
  getHasDeclinedAllMainEvents,
  getHasDeclinedEntryEvent,
  getHasLodgingInvites,
} from '@/features/wedding/selectors'
import type { GuestT, RsvpT } from '@/features/wedding/types'

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: string
  extra: { s: string; n: number }
}>()

//======================================
// Async thunks for API calls.
//======================================

type LoginParams = {
  username: string
  password: string
}

export const login = createAppAsyncThunk(
  'wedding/login',
  async ({ username, password }: LoginParams) => {
    return await weddingAPI.login(username, password)
  },
)

export const fetchUser = createAppAsyncThunk(
  'wedding/fetchUser',
  async () => {
    return await weddingAPI.getUser()
  },
)

// Get the Rsvp data necessary to render the app.
export const fetchAdminData = createAppAsyncThunk(
  'wedding/fetchAdminData',
  async () => {
    const admin = await weddingAPI.getAdmin()

    return {
      hasLoaded: true,
      users: admin.users,
      guests: admin.guests,
      events: admin.events,
      invites: admin.invites,
      rsvps: admin.rsvps,
    }
  },
)

// Get the Rsvp data necessary to render the app.
export const fetchRsvpData = createAppAsyncThunk(
  'wedding/fetchRsvpData',
  async (_, thunkApi) => {
    const user = await weddingAPI.getUser()
    const guests = await weddingAPI.getGuests()
    const events = await weddingAPI.getEvents()
    const invites = await weddingAPI.getInvites()
    const rsvps = await weddingAPI.getRsvps()

    const state = thunkApi.getState()

    // The state has not yet updated with the new entity data. We should send an
    // updated state value to the selectors
    // TODO: This is sloppy - can we clean it up?
    // - One action for "app on load" that fetches the data
    // - One action for "app did load" that updates the state
    // - Do the multiple dispatches in a thunk.

    const updatedState = {
      ...state,
      wedding: {
        ...state.wedding,
        hasLoaded: true,
        entities: {
          user: user,
          guests: guests,
          events: events,
          invites: invites,
          rsvps: rsvps,
        },
      },
    }

    const hasAcceptedEntryEvent = getHasAcceptedEntryEvent(updatedState)
    const hasDeclinedEntryEvent = getHasDeclinedEntryEvent(updatedState)
    const hasLodgingInvites = getHasLodgingInvites(updatedState)
    const hasCompletedEntryInvites = getHasCompletedEntryInvites(updatedState)
    const hasCompletedAllMainInvites = getHasCompletedAllMainInvites(
      updatedState,
    )
    const hasDeclinedAllMainEvents = getHasDeclinedAllMainEvents(updatedState)
    const hasCompletedAllLodgingInvites = getHasCompletedAllLodgingInvites(
      updatedState,
    )

    return {
      user,
      events,
      guests,
      invites,
      rsvps,
      hasAcceptedEntryEvent,
      hasDeclinedEntryEvent,
      hasLodgingInvites,
      hasCompletedEntryInvites,
      hasCompletedAllMainInvites,
      hasDeclinedAllMainEvents,
      hasCompletedAllLodgingInvites,
    }
  },
)

export const clickedAttendingEntry = createAppAsyncThunk(
  'wedding/clickedAttendingEntry',
  async (rsvp: Partial<RsvpT>) => {
    return await weddingAPI.upsertRsvp(rsvp)
  },
)

export const clickedNotAttendingEntry = createAppAsyncThunk(
  'wedding/clickedNotAttendingEntry',
  async (rsvp: Partial<RsvpT>) => {
    return await weddingAPI.upsertRsvp(rsvp)
  },
)

export const clickedNotAttendingConfirmation = createAppAsyncThunk(
  'wedding/clickedNotAttendingConfirmation',
  async () => {
    await weddingAPI.declineAll()
    const response = await weddingAPI.refreshUserToken()
    const token = response.accessToken
    localStorage.setItem('token', token)
    return token
  },
)

// Create or update an Rsvp.
export const upsertRsvp = createAppAsyncThunk(
  'wedding/upsertRsvp',
  async (rsvp: Partial<RsvpT>) => {
    return await weddingAPI.upsertRsvp(rsvp)
  },
)

// Update allergies for a Guest.
export const updateGuest = createAppAsyncThunk(
  'wedding/updateGuest',
  async (guest: Partial<GuestT>) => {
    return await weddingAPI.updateGuest(guest)
  },
)

// Finalize the Rsvp process. All existing Rsvps are locked, and the user will
// not be able to edit them.
export const clickedSubmit = createAppAsyncThunk(
  'wedding/clickedSubmit',
  async () => {
    await weddingAPI.submit()
    const response = await weddingAPI.refreshUserToken()

    const token = response.accessToken
    localStorage.setItem('token', token)

    const user = await weddingAPI.getUser()
    return user
  },
)

// Removes all RSVPs for a user. Allows user to start the RSVP process over.
export const resetUserRsvps = createAppAsyncThunk(
  'wedding/resetUserRsvps',
  async (userId: string) => {
    const {
      deletedRsvpIds: deletedRsvpIds,
      updatedUser: updatedUser,
    } = await weddingAPI.resetUserRsvps(userId)

    const response = await weddingAPI.refreshUserToken()

    const token = response.accessToken
    localStorage.setItem('token', token)

    const user = await weddingAPI.getUser()

    return {
      user,
      updatedUser,
      deletedRsvpIds,
    }
  },
)
