import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import weddingAPI from '@/features/wedding/api'
import { STEPS } from '@/features/wedding/constants'
// import type { PayloadAction } from '@reduxjs/toolkit'
import type {
  EventT,
  GuestT,
  InviteT,
  RsvpT,
  UserT,
} from '@/features/wedding/types'

interface WeddingState {
  // Are we fetching any kind of data, right now?
  isLoading: boolean

  // Set to true once all necessary data for rendering the app has loaded.
  hasLoaded: boolean

  // API state. Stuff we fetch from the API and sometimes update.
  entities: {
    user: UserT | null
    guests: GuestT[]
    events: EventT[]
    invites: InviteT[]

    // These are the only entities we update.
    rsvps: RsvpT[]
  }

  // State about the RSVP process.
  rsvps: {
    userHasInteracted: boolean
    step: number
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
    userHasInteracted: false,
    step: STEPS.ENTRY,
  },
}

export const weddingSlice = createSlice({
  name: 'wedding',
  initialState,
  reducers: {
    // clickedAttending: (state, action: PayloadAction<number>) => {

    // Entry page RSVP creation.
    // TODO: These two should be async thunks that call the API and make an RSVP
    // and the side effect is that the step changes.
    clickedAttending: (state) => {
      state.rsvps.userHasInteracted = true
      state.rsvps.step = STEPS.MAIN
    },
    clickedNotAttending: (state) => {
      state.rsvps.userHasInteracted = true
      state.rsvps.step = STEPS.DECLINED
    },

    // Step navigation actions.
    // TODO: Need an action per-step for back and next, if applicable.
    clickedBack: (state) => {
      state.rsvps.userHasInteracted = true
      state.rsvps.step = STEPS.ENTRY
    },
    clickedNext: (state) => {
      state.rsvps.userHasInteracted = true
      state.rsvps.step = STEPS.DONE
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRsvpData.fulfilled, (state, action) => {
      state.entities.user = action.payload.user
      state.entities.events = action.payload.events
      state.entities.guests = action.payload.guests
      state.entities.invites = action.payload.invites
      state.entities.rsvps = action.payload.rsvps
      state.hasLoaded = true
    })

    builder.addCase(upsertRsvp.fulfilled, (state, action) => {
      const rsvp = action.payload

      if (rsvp == null) {
        return
      }

      let found = false
      const updatedRsvps = state.entities.rsvps.map((r) => {
        if (r.id === rsvp.id) {
          found = true
          return rsvp
        } else {
          return r
        }
      })

      if (!found) {
        updatedRsvps.push(rsvp)
      }

      state.entities.rsvps = updatedRsvps
    })

    builder.addCase(updateRsvp.fulfilled, (state, action) => {
      const rsvp = action.payload

      if (rsvp == null) {
        return
      }

      let found = false
      const updatedRsvps = state.entities.rsvps.map((r) => {
        if (r.id === rsvp.id) {
          found = true
          return rsvp
        } else {
          return r
        }
      })

      if (!found) {
        updatedRsvps.push(rsvp)
      }

      state.entities.rsvps = updatedRsvps
    })

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
  clickedAttending,
  clickedNotAttending,
  clickedBack,
  clickedNext,
} = weddingSlice.actions
export default weddingSlice.reducer

//======================================
// Async thunks for API calls.
//======================================

// Get the Rsvp data necessary to render the app
export const fetchRsvpData = createAsyncThunk(
  'wedding/fetchRsvpData',
  async () => {
    const user = await weddingAPI.getUser()
    const guests = await weddingAPI.getGuests()
    const events = await weddingAPI.getEvents()
    const invites = await weddingAPI.getInvites()
    const rsvps = await weddingAPI.getRsvps()

    return {
      user,
      events,
      guests,
      invites,
      rsvps,
    }
  },
)

// Create or update an Rsvp.
export const upsertRsvp = createAsyncThunk(
  'wedding/upsertRsvp',
  async (rsvp: Partial<RsvpT>) => {
    return await weddingAPI.upsertRsvp(rsvp)
  },
)

// Update an Rsvp.
export const updateRsvp = createAsyncThunk(
  'wedding/updateRsvp',
  async (rsvp: Partial<RsvpT>) => {
    return await weddingAPI.updateRsvp(rsvp)
  },
)

// Update allergies for a Guest.
export const updateGuest = createAsyncThunk(
  'wedding/updateGuest',
  async (guest: Partial<GuestT>) => {
    return await weddingAPI.updateGuest(guest)
  },
)
