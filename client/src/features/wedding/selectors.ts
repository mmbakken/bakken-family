import { createSelector } from '@reduxjs/toolkit'
import { STEPS } from '@/features/wedding/constants'
import type { RootState } from '@/store'
import type { EventT, GuestT, InviteT, RsvpT } from '@/features/wedding/types'

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

//======================================
// Guests
//======================================

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

//======================================
// Events
//======================================

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

// Returns the main event ids, ordered by their `sort` field.
export const getOrderedMainEventIds = createSelector(
  [getMainEvents],
  (mainEvents) => {
    const events = mainEvents.map((e) => e)
    events.sort((a, b) => a.order - b.order)
    return events.map((e) => e.id)
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

// Returns an array of events which are Lodging events.
const getLodgingEvents = createSelector(
  [getAllEvents],
  (allEvents) => {
    const lodgingEvents = allEvents.filter((event) => {
      return LODGING_EVENT_NAMES.includes(event.name)
    }) ?? []

    return lodgingEvents
  },
)

// Returns the lodging event ids, ordered by their `sort` field.
export const getOrderedLodgingEventIds = createSelector(
  [getLodgingEvents],
  (lodgingEvents) => {
    const events = lodgingEvents.map((e) => e)
    events.sort((a, b) => a.order - b.order)
    return events.map((e) => e.id)
  },
)

// Given an Event id, returns true if the event requires an entree selection. If
// no Event is found, returns false.
export const getHasEntree = createSelector(
  [
    getAllEvents,
    (_state, eventId) => eventId,
  ],
  (allEvents, eventId) => {
    if (allEvents == null || eventId == null) {
      return false
    }

    const event = allEvents.find((thisEvent) => thisEvent.id === eventId)

    if (event == null) {
      return false
    }

    return event.hasEntree
  },
)

//======================================
// Invites
//======================================

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

// Returns the Event objects, grouped by their ids.
export const getEventsById = createSelector(
  [getAllEvents],
  (allEvents) => {
    return allEvents.reduce((eventsById, event) => {
      eventsById[event.id] = event
      return eventsById
    }, {} as Record<string, EventT>)
  },
)

// Returns all event invites, grouped by their event id. One event id is the key
// to an array of invites.
export const getInvitesByEventId = createSelector(
  [getAllInvites],
  (allInvites) => {
    return allInvites.reduce((invitesByEventId, invite) => {
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

// Returns true if the user has lodging invites (and therefore should be allowed
// to see the Lodging RSVP page).
export const getHasLodgingInvites = createSelector(
  [getLodgingInviteIds],
  (lodgingInviteIds) => {
    return lodgingInviteIds.length > 0
  },
)

//======================================
// Rsvps
//======================================

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
export const getHasCompletedAllLodgingInvites = createSelector(
  [getLodgingRsvpIds, getLodgingInviteIds],
  (lodgingRsvpIds, lodgingInviteIds) => {
    return lodgingRsvpIds.length === lodgingInviteIds.length
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

// Given an event id and guest id, returns the Rsvp, or null.
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
