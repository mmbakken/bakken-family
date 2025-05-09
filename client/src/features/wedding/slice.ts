// This slice manages all of the global front-end state from the whole app. The
// API slice is used for managing API state, but the selectors for those API
// state values all live here.

import { createSelector, createSlice } from '@reduxjs/toolkit'
import { weddingAPI } from '@/services/api'
import { STEPS } from '@/features/wedding/constants'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import type { EventT, GuestT, InviteT, RsvpT } from '@/features/wedding/types'

// Define a type for the slice state
interface WeddingState {
  rsvps: {
    userHasInteracted: boolean
    step: number
  }
}

// Define the initial state using that type
const initialState: WeddingState = {
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
    clickedAttending: (state) => {
      state.rsvps.userHasInteracted = true
      state.rsvps.step = STEPS.MAIN
    },
    clickedNotAttending: (state) => {
      state.rsvps.userHasInteracted = true
      state.rsvps.step = STEPS.DECLINED
    },
    clickedBack: (state) => {
      state.rsvps.userHasInteracted = true
      state.rsvps.step = STEPS.ENTRY
    },
    clickedNext: (state) => {
      state.rsvps.userHasInteracted = true
      state.rsvps.step = STEPS.DONE
    },
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
// Selectors - API Slice
//======================================

const emptyGuests: GuestT[] = []
const emptyRsvps: RsvpT[] = []
const emptyEvents: EventT[] = []
const emptyInvites: InviteT[] = []

export const getAllGuestsResult = weddingAPI.endpoints.getGuests.select()
export const getAllRsvpsResult = weddingAPI.endpoints.getRsvps.select()
export const getAllEventsResult = weddingAPI.endpoints.getEvents.select()
export const getAllInvitesResult = weddingAPI.endpoints.getInvites.select()

export const getAllGuests = createSelector(
  [getAllGuestsResult],
  (allGuestsResult) => {
    if (allGuestsResult && allGuestsResult.isSuccess) {
      return allGuestsResult.data ?? emptyGuests
    }

    return emptyGuests
  },
)

export const getAllRsvps = createSelector(
  [getAllRsvpsResult],
  (allRsvpsResult) => {
    if (allRsvpsResult && allRsvpsResult.isSuccess) {
      return allRsvpsResult.data ?? emptyRsvps
    }

    return emptyRsvps
  },
)

export const getAllEvents = createSelector(
  [getAllEventsResult],
  (allEventsResult) => {
    if (allEventsResult && allEventsResult.isSuccess) {
      return allEventsResult.data ?? emptyEvents
    }

    return emptyEvents
  },
)

export const getAllInvites = createSelector(
  [getAllInvitesResult],
  (allInvitesResult) => {
    if (allInvitesResult && allInvitesResult.isSuccess) {
      return allInvitesResult.data ?? emptyInvites
    }

    return emptyInvites
  },
)

// Returns true if any of the necessary API data for the RSVP process is loading
export const getIsLoadingRsvpData = createSelector(
  [
    getAllGuestsResult,
    getAllRsvpsResult,
    getAllEventsResult,
    getAllInvitesResult,
  ],
  (allGuestsResult, allRsvpsResult, allEventsResult, allInvitesResult) => {
    if (
      allGuestsResult == null ||
      allRsvpsResult == null ||
      allEventsResult == null ||
      allInvitesResult == null
    ) {
      return true
    }

    if (
      allGuestsResult.isLoading ||
      allRsvpsResult.isLoading ||
      allEventsResult.isLoading ||
      allInvitesResult.isLoading
    ) {
      return true
    }

    return false
  },
)

//======================================
// Selectors - Wedding Slice
//======================================

const getWeddingState = (state: RootState) => {
  return state.wedding
}

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
    getIsLoadingRsvpData,
    getAllRsvps,
    getHasCompletedAllMainInvites,
    getHasLodgingInvites,
    getHasCompletedAllLodgingInvites,
  ],
  (
    wedding,
    isLoadingRsvpData,
    allRsvps,
    hasCompletedAllMainInvites,
    hasLodgingInvites,
    hasCompletedAllLodgingInvites,
  ) => {
    // TODO: The below logic is good for determining what the initial state of
    // the `step` should be. But for ease of use, just let the user update their
    // step by dispatching simple actions. We should use the below logic AFTER
    // all of the

    if (wedding.rsvps.userHasInteracted || isLoadingRsvpData) {
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
