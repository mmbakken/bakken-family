import { createSlice } from '@reduxjs/toolkit'
import {
  clickedAttendingEntry,
  clickedNotAttendingConfirmation,
  clickedNotAttendingEntry,
  clickedSubmit,
  fetchAdminData,
  fetchRsvpData,
  updateGuest,
  upsertRsvp,
} from '@/features/wedding/thunks'
import { getHasLodgingInvites } from '@/features/wedding/selectors'
import { STEPS } from '@/features/wedding/constants'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from '@/store'
import type {
  EventT,
  GuestT,
  InviteT,
  RsvpT,
  UserT,
} from '@/features/wedding/types'

// Helper function. Given a list of Rsvps and an Rsvp that may exist in the main
// list, returns the list of Rsvps that always includes the Rsvp (upserted).
const getUpdatedRsvps = (rsvps: RsvpT[], upsertedRsvp: RsvpT) => {
  // No-op
  if (upsertedRsvp == null) {
    return rsvps
  }

  // If the Rsvp exists in the list, update its object with the latest data.
  let found = false
  const updatedRsvps = rsvps.map((r) => {
    if (r.id === upsertedRsvp.id) {
      found = true
      return upsertedRsvp
    } else {
      return r
    }
  })

  // Otherwise, add the new Rsvp to the list.
  if (!found) {
    updatedRsvps.push(upsertedRsvp)
  }

  return updatedRsvps
}

interface WeddingState {
  // Are we fetching any kind of data, right now?
  isLoading: boolean

  // Set to true once all necessary data for rendering the app has loaded.
  hasLoaded: boolean

  // API state. Stuff we fetch from the API and sometimes update. Includes only
  // data relevant to this user.
  entities: {
    user: UserT | null
    guests: GuestT[]
    events: EventT[]
    invites: InviteT[]
    rsvps: RsvpT[]
  }

  // State about the RSVP process.
  rsvps: {
    step: number
  }

  // State for the Admin page. Includes data from across many users.
  admin: {
    hasLoaded: boolean
    users: UserT[]
    guests: GuestT[]
    events: EventT[]
    invites: InviteT[]
    rsvps: RsvpT[]
  }
}

const initialState: WeddingState = {
  isLoading: false,
  hasLoaded: false,
  entities: {
    user: null,
    guests: [],
    events: [],
    invites: [],
    rsvps: [],
  },
  rsvps: {
    step: STEPS.ENTRY,
  },
  admin: {
    hasLoaded: false,
    users: [],
    guests: [],
    events: [],
    invites: [],
    rsvps: [],
  },
}

export const weddingSlice = createSlice({
  name: 'wedding',
  initialState,
  reducers: {
    clickedBack: (state) => {
      switch (state.rsvps.step) {
        case STEPS.ENTRY: {
          state.rsvps.step = STEPS.ENTRY
          break
        }
        case STEPS.MAIN: {
          state.rsvps.step = STEPS.ENTRY
          break
        }
        case STEPS.LODGING: {
          state.rsvps.step = STEPS.MAIN
          break
        }
        case STEPS.DONE: {
          state.rsvps.step = STEPS.ENTRY
          break
        }
        // This shouldn't happen.
        default: {
          state.rsvps.step = STEPS.ENTRY
        }
      }
    },
    setNextStep: (state, action: PayloadAction<ClickedNextPayload>) => {
      switch (state.rsvps.step) {
        case STEPS.ENTRY: {
          state.rsvps.step = STEPS.MAIN
          break
        }
        case STEPS.MAIN: {
          if (action.payload.hasLodgingInvites) {
            state.rsvps.step = STEPS.LODGING
            break
          }

          state.rsvps.step = STEPS.DONE
          break
        }
        case STEPS.LODGING: {
          state.rsvps.step = STEPS.DONE
          break
        }
        case STEPS.DONE: {
          state.rsvps.step = STEPS.ENTRY
          break
        }
        default: {
          state.rsvps.step = STEPS.DONE
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRsvpData.fulfilled, (state, action) => {
      const {
        user,
        events,
        guests,
        invites,
        rsvps,
        hasLodgingInvites,
        hasAcceptedEntryEvent,
        hasDeclinedEntryEvent,
        hasCompletedEntryInvites,
        hasCompletedAllMainInvites,
        hasDeclinedAllMainEvents,
        hasCompletedAllLodgingInvites,
      } = action.payload

      state.entities.user = user
      state.entities.events = events
      state.entities.guests = guests
      state.entities.invites = invites
      state.entities.rsvps = rsvps
      state.hasLoaded = true

      // This is the only time the step should be set programatically. Otherwise
      // the user should be free to go back any time. Going forward a step is
      // restricted based on completion of the current step.

      // If the user has submitted, then show them the Done screen.
      if (user.submittedOn != null) {
        state.rsvps.step = STEPS.DONE
        return
      }

      // If the user has no saved RSVPs, they're on the entry step.
      if (!hasCompletedEntryInvites) {
        state.rsvps.step = STEPS.ENTRY
        return
      }

      // Did they decline the Entry event?
      if (hasDeclinedEntryEvent) {
        state.rsvps.step = STEPS.DECLINED
        return
      }

      // Otherwise, see if they have Main invites to finish.
      if (
        (hasAcceptedEntryEvent &&
          !hasCompletedAllMainInvites) || hasDeclinedAllMainEvents
      ) {
        state.rsvps.step = STEPS.MAIN
        return
      }

      // Otherwise, see if they have Lodging invites to finish.
      if (
        hasAcceptedEntryEvent && hasLodgingInvites &&
        !hasCompletedAllLodgingInvites
      ) {
        state.rsvps.step = STEPS.LODGING
        return
      }

      // Finally, the user may have completed all Invites.
      state.rsvps.step = STEPS.DONE
    })

    builder.addCase(fetchAdminData.fulfilled, (state, action) => {
      const {
        hasLoaded,
        users,
        events,
        guests,
        invites,
        rsvps,
      } = action.payload

      console.log('fetchAdminData action.payload')
      console.dir(action.payload)

      state.admin.users = users
      state.admin.events = events
      state.admin.guests = guests
      state.admin.invites = invites
      state.admin.rsvps = rsvps
      state.admin.hasLoaded = hasLoaded
    })

    builder.addCase(clickedAttendingEntry.fulfilled, (state, action) => {
      const upsertedRsvp = action.payload
      state.entities.rsvps = getUpdatedRsvps(state.entities.rsvps, upsertedRsvp)
      state.rsvps.step = STEPS.MAIN
    })

    builder.addCase(clickedNotAttendingEntry.fulfilled, (state, action) => {
      const upsertedRsvp = action.payload
      state.entities.rsvps = getUpdatedRsvps(state.entities.rsvps, upsertedRsvp)
      state.rsvps.step = STEPS.DECLINED
    })

    builder.addCase(upsertRsvp.fulfilled, (state, action) => {
      const upsertedRsvp = action.payload
      state.entities.rsvps = getUpdatedRsvps(state.entities.rsvps, upsertedRsvp)
    })

    builder.addCase(
      clickedNotAttendingConfirmation.fulfilled,
      (state, action) => {
        // Don't bother updating the RSVPs - we're done here.
        state.entities.user = action.payload
        state.rsvps.step = STEPS.DONE
      },
    )

    builder.addCase(
      clickedSubmit.fulfilled,
      (state, action) => {
        // Don't bother updating the RSVPs - we're done here.
        state.entities.user = action.payload
        state.rsvps.step = STEPS.DONE
      },
    )

    builder.addCase(updateGuest.fulfilled, (state, action) => {
      const guest = action.payload

      if (guest == null) {
        return
      }

      let found = false
      const updatedGuests = state.entities.guests.map((g) => {
        if (g.id === guest.id) {
          found = true
          return guest
        } else {
          return g
        }
      })

      if (!found) {
        updatedGuests.push(guest)
      }

      state.entities.guests = updatedGuests
    })
  },
})

export const {
  clickedBack,
} = weddingSlice.actions
export default weddingSlice.reducer

//======================================
// Sync thunks for injecting state into actions.
//======================================

type ClickedNextPayload = {
  hasLodgingInvites: boolean
}

interface Thunk {
  (): (dispatch: AppDispatch, getState: () => RootState) => void
}

export const clickedNext: Thunk = () => (dispatch, getState) => {
  const state = getState()
  const hasLodgingInvites = getHasLodgingInvites(state)
  dispatch(weddingSlice.actions.setNextStep({ hasLodgingInvites }))
}
