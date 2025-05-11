import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '@/store'
import weddingAPI from '@/features/wedding/api'
import {
  getHasCompletedAllLodgingInvites,
  getHasCompletedAllMainInvites,
  getHasCompletedEntryInvites,
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

// Get the Rsvp data necessary to render the app
export const fetchRsvpData = createAppAsyncThunk(
  'wedding/fetchRsvpData',
  async (_, thunkApi) => {
    const user = await weddingAPI.getUser()
    const guests = await weddingAPI.getGuests()
    const events = await weddingAPI.getEvents()
    const invites = await weddingAPI.getInvites()
    const rsvps = await weddingAPI.getRsvps()

    const state = thunkApi.getState()

    const hasLodgingInvites = getHasLodgingInvites(state)
    const hasCompletedEntryInvites = getHasCompletedEntryInvites(state)
    const hasCompletedAllMainInvites = getHasCompletedAllMainInvites(state)
    const hasCompletedAllLodgingInvites = getHasCompletedAllLodgingInvites(
      state,
    )

    return {
      user,
      events,
      guests,
      invites,
      rsvps,
      hasLodgingInvites,
      hasCompletedEntryInvites,
      hasCompletedAllMainInvites,
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

// Create or update an Rsvp.
export const upsertRsvp = createAppAsyncThunk(
  'wedding/upsertRsvp',
  async (rsvp: Partial<RsvpT>) => {
    return await weddingAPI.upsertRsvp(rsvp)
  },
)

// Update an Rsvp.
export const updateRsvp = createAppAsyncThunk(
  'wedding/updateRsvp',
  async (rsvp: Partial<RsvpT>) => {
    return await weddingAPI.updateRsvp(rsvp)
  },
)

// Update allergies for a Guest.
export const updateGuest = createAppAsyncThunk(
  'wedding/updateGuest',
  async (guest: Partial<GuestT>) => {
    return await weddingAPI.updateGuest(guest)
  },
)
