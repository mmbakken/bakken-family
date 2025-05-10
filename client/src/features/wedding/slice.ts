import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { STEPS } from '@/features/wedding/constants'
// import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
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
// API calls
//======================================

const baseUrl = import.meta.env.VITE_ENV === 'production'
  ? `${window.location.origin}/api/v1`
  : `http://localhost:8000/api/v1`

const weddingAPI = {
  getUser: async () => {
    const url = `${baseUrl}/wedding/user`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? '',
      },
    })

    if (!response.ok) {
      throw new Error('Error fetching user.')
    }

    return await response.json()
  },

  getGuests: async () => {
    const url = `${baseUrl}/wedding/guests`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? '',
      },
    })

    if (!response.ok) {
      throw new Error('Error fetching guests.')
    }

    return await response.json()
  },

  getEvents: async () => {
    const url = `${baseUrl}/wedding/events`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? '',
      },
    })

    if (!response.ok) {
      throw new Error('Error fetching events.')
    }

    return await response.json()
  },

  getInvites: async () => {
    const url = `${baseUrl}/wedding/invites`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? '',
      },
    })

    if (!response.ok) {
      throw new Error('Error fetching invites.')
    }

    return await response.json()
  },

  getRsvps: async () => {
    const url = `${baseUrl}/wedding/rsvps`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? '',
      },
    })

    if (!response.ok) {
      throw new Error('Error fetching rsvps.')
    }

    return await response.json()
  },

  upsertRsvp: async (rsvp: Partial<RsvpT>) => {
    const url = `${baseUrl}/wedding/rsvp`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? '',
      },
      body: JSON.stringify(rsvp),
    })

    if (!response.ok) {
      throw new Error('Error upserting RSVP.')
    }

    return await response.json()
  },
}

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
    const response = await weddingAPI.upsertRsvp(rsvp)

    return response
  },
)

//======================================
// Selectors - API Slice
//======================================

const emptyGuests: GuestT[] = []
const emptyEvents: EventT[] = []
const emptyInvites: InviteT[] = []
const emptyRsvps: RsvpT[] = []

const getWeddingState = (state: RootState) => {
  return state.wedding
}

// Returns true when the necessary API data for the RSVP process is loaded.
export const getHasLoadedRsvpData = (state: RootState) =>
  state.wedding.hasLoaded

export const getAllGuests = createSelector(
  [getWeddingState, getHasLoadedRsvpData],
  (state, hasLoadedRsvpData) => {
    const guests = state.entities.guests

    if (hasLoadedRsvpData) {
      return guests ?? emptyGuests
    }

    return emptyGuests
  },
)

export const getAllEvents = createSelector(
  [getWeddingState, getHasLoadedRsvpData],
  (state, hasLoadedRsvpData) => {
    const events = state.entities.events

    if (hasLoadedRsvpData) {
      return events ?? emptyEvents
    }

    return emptyEvents
  },
)

export const getAllInvites = createSelector(
  [getWeddingState, getHasLoadedRsvpData],
  (state, hasLoadedRsvpData) => {
    const invites = state.entities.invites

    if (hasLoadedRsvpData) {
      return invites ?? emptyInvites
    }

    return emptyInvites
  },
)

export const getAllRsvps = createSelector(
  [getWeddingState, getHasLoadedRsvpData],
  (state, hasLoadedRsvpData) => {
    const rsvps = state.entities.rsvps

    if (hasLoadedRsvpData) {
      return rsvps ?? emptyRsvps
    }

    return emptyRsvps
  },
)

// Returns the number of guests for this user.
export const getGuestCount = createSelector(
  [getAllGuests],
  (allGuests) => {
    return allGuests.length
  },
)

// Returns the guest objects, grouped by their ids.
export const getGuestsById = createSelector(
  [getAllGuests],
  (allGuests) => {
    return allGuests.reduce((guestsById, guest) => {
      guestsById[guest.id] = guest
      return guestsById
    }, {} as Record<string, GuestT>)
  },
)

const MAIN_EVENT_NAMES = [
  'Welcome Party',
  'Ceremony',
  'Reception',
  'Sunday Hangout',
]

export const getEntryEvent = createSelector(
  [getAllEvents],
  (allEvents) => {
    const ENTRY_EVENT_NAME = 'Wedding'
    return allEvents.find((event) => {
      return event.name === ENTRY_EVENT_NAME
    })
  },
)

// Returns an array of event ids which are Main events.
const getMainEventIds = createSelector(
  [getAllEvents],
  (allEvents) => {
    const mainEvents = allEvents.filter((event) => {
      return MAIN_EVENT_NAMES.includes(event.name)
    }) ?? []

    return mainEvents.map((event) => event.id)
  },
)

// Returns an array of events which are Main events.
const getMainEvents = createSelector(
  [getAllEvents],
  (allEvents) => {
    const mainEvents = allEvents.filter((event) => {
      return MAIN_EVENT_NAMES.includes(event.name)
    }) ?? []

    return mainEvents
  },
)

// Returns the event ids, ordered by their `sort` field.
export const getOrderedMainEventIds = createSelector(
  [getMainEvents],
  (mainEvents) => {
    const events = mainEvents.map((e) => e)
    events.sort((a, b) => a.order - b.order)
    return events.map((e) => e.id)
  },
)

// Returns an array of invites which are for Main events.
const getMainInvites = createSelector(
  [getAllInvites, getMainEventIds],
  (allInvites, mainEventIds) => {
    const mainInvites: InviteT[] = []

    allInvites.map((invite) => {
      if (mainEventIds.includes(invite.eventId)) {
        mainInvites.push(invite)
      }
    })

    return mainInvites
  },
)

// Returns true if there are Main event invites.
export const getHasMainInvites = createSelector(
  [getMainInvites],
  (mainInvites) => {
    return mainInvites && mainInvites.length > 0
  },
)

// Returns the Main event objects, grouped by their ids.
export const getMainEventsById = createSelector(
  [getMainEvents],
  (mainEvents) => {
    return mainEvents.reduce((mainEventsById, event) => {
      mainEventsById[event.id] = event
      return mainEventsById
    }, {} as Record<string, EventT>)
  },
)

// Returns all Main event invites, grouped by their event id. One event id is
// the key to an array of invites.
export const getMainInvitesByEventId = createSelector(
  [getMainInvites],
  (mainInvites) => {
    return mainInvites.reduce((invitesByEventId, invite) => {
      if (invitesByEventId[invite.eventId] == null) {
        invitesByEventId[invite.eventId] = [invite]
      } else {
        invitesByEventId[invite.eventId].push(invite)
      }

      return invitesByEventId
    }, {} as Record<string, InviteT[]>)
  },
)

// Returns an array of invite ids which are for Main events.
export const getMainInviteIds = createSelector(
  [getAllInvites, getMainEventIds],
  (allInvites, mainEventIds) => {
    const mainInviteIds: string[] = []

    allInvites.map((invite) => {
      if (mainEventIds.includes(invite.eventId)) {
        mainInviteIds.push(invite.id)
      }
    })

    return mainInviteIds
  },
)

// Returns an array of RSVP ids which are for Main events.
const getMainRsvpIds = createSelector(
  [getAllRsvps, getMainEventIds],
  (allRsvps, mainEventIds) => {
    const mainRsvpIds: string[] = []

    allRsvps.map((rsvp) => {
      if (mainEventIds.includes(rsvp.eventId)) {
        mainRsvpIds.push(rsvp.id)
      }
    })

    return mainRsvpIds
  },
)

// Returns true if the user has an RSVP for each main event invite.
export const getHasCompletedAllMainInvites = createSelector(
  [getMainRsvpIds, getMainInviteIds],
  (mainRsvpIds, mainInviteIds) => {
    return mainRsvpIds.length === mainInviteIds.length
  },
)

const LODGING_EVENT_NAMES = [
  'Lodging - Thursday Night',
  'Lodging - Friday Night',
  'Lodging - Saturday Night',
  'Lodging - Sunday Night',
]

// Returns an array of event ids which are Lodging events.
const getLodgingEventIds = createSelector(
  [getAllEvents],
  (allEvents) => {
    const lodgingEvents = allEvents.filter((event) => {
      return LODGING_EVENT_NAMES.includes(event.name)
    }) ?? []

    return lodgingEvents.map((event) => event.id)
  },
)

// Returns an array of invite ids which are for Lodging events.
const getLodgingInviteIds = createSelector(
  [getAllInvites, getLodgingEventIds],
  (allInvites, lodgingEventIds) => {
    const lodgingInviteIds: string[] = []

    allInvites.map((invite) => {
      if (lodgingEventIds.includes(invite.eventId)) {
        lodgingInviteIds.push(invite.id)
      }
    })

    return lodgingInviteIds
  },
)

// Returns an array of RSVP ids which are for Lodging events.
const getLodgingRsvpIds = createSelector(
  [getAllRsvps, getLodgingEventIds],
  (allRsvps, lodgingEventIds) => {
    const lodgingRsvpIds: string[] = []

    allRsvps.map((rsvp) => {
      if (lodgingEventIds.includes(rsvp.eventId)) {
        lodgingRsvpIds.push(rsvp.id)
      }
    })

    return lodgingRsvpIds
  },
)

// Returns true if the user has an RSVP for each lodging event invite.
const getHasCompletedAllLodgingInvites = createSelector(
  [getLodgingRsvpIds, getLodgingInviteIds],
  (lodgingRsvpIds, lodgingInviteIds) => {
    return lodgingRsvpIds.length === lodgingInviteIds.length
  },
)

// Returns true if the user has lodging invites (and therefore should be allowed
// to see the Lodging RSVP page).
export const getHasLodgingInvites = createSelector(
  [getLodgingInviteIds],
  (lodgingInviteIds) => {
    return lodgingInviteIds.length > 0
  },
)

// The active step for this user depends on how many steps they've completed.
export const getRsvpStep = createSelector(
  [
    getWeddingState,
    getHasLoadedRsvpData,
    getAllRsvps,
    getHasCompletedAllMainInvites,
    getHasLodgingInvites,
    getHasCompletedAllLodgingInvites,
  ],
  (
    wedding,
    hasLoadedRsvpData,
    allRsvps,
    hasCompletedAllMainInvites,
    hasLodgingInvites,
    hasCompletedAllLodgingInvites,
  ) => {
    // TODO: The below logic is good for determining what the initial state of
    // the `step` should be. But for ease of use, just let the user update their
    // step by dispatching simple actions. We should use the below logic AFTER
    // all of the

    if (wedding.rsvps.userHasInteracted || !hasLoadedRsvpData) {
      return wedding.rsvps.step
    }

    // If the user has no saved RSVPs, they're on the entry step.
    if (allRsvps.length === 0) {
      return STEPS.ENTRY
    }

    // The first RSVP which must be completed is the general yes/no one. If that
    // is the only RSVP, then show the main step.
    if (allRsvps.length === 1) {
      return STEPS.MAIN
    }

    // Otherwise, see if they have Main invites to finish.
    if (!hasCompletedAllMainInvites) {
      return STEPS.MAIN
    }

    // Otherwise, see if they have Lodging invites to finish.
    if (hasLodgingInvites && !hasCompletedAllLodgingInvites) {
      return STEPS.LODGING
    }

    // Finally, we assume they've completed all invites and created an RSVP for
    // each one. They can view whatever step they want.
    return wedding.rsvps.step
  },
)

export const getRsvpByEventIdAndGuestId = createSelector(
  [
    getAllRsvps,
    (_state, eventId) => eventId,
    (_state, _eventId, guestId) => guestId,
  ],
  (allRsvps, eventId, guestId) => {
    if (allRsvps == null) {
      return null
    }

    const rsvp = allRsvps.find((thisRsvp) =>
      thisRsvp.eventId === eventId && thisRsvp.guestId === guestId
    )

    return rsvp ?? null
  },
)
