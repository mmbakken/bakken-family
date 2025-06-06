import { createSelector } from '@reduxjs/toolkit'
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

export const getRsvpStep = (state: RootState) => state.wedding.rsvps.step

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

// Returns an array of event ids which are Lodging events.
const getLodgingEventIds = createSelector(
  [getAllEvents],
  (allEvents) => {
    const lodgingEvents = allEvents.filter((event) => {
      return event.isLodging
    }) ?? []

    return lodgingEvents.map((event) => event.id)
  },
)

// Returns an array of events which are Lodging events.
const getLodgingEvents = createSelector(
  [getAllEvents],
  (allEvents) => {
    const lodgingEvents = allEvents.filter((event) => {
      return event.isLodging
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

// Returns an array of invites which are for the Entry event.
const getEntryInvites = createSelector(
  [getAllInvites, getEntryEvent],
  (allInvites, entryEvent) => {
    if (entryEvent == null) {
      return []
    }

    const entryInvites: InviteT[] = []

    allInvites.map((invite) => {
      if (invite.eventId === entryEvent.id) {
        entryInvites.push(invite)
      }
    })

    return entryInvites
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

// Returns a list of all Rsvps which are for the Entry event.
const getEntryRsvps = createSelector(
  [getAllRsvps, getEntryEvent],
  (allRsvps, entryEvent) => {
    if (allRsvps == null || entryEvent == null) {
      return []
    }

    const entryRsvps = allRsvps.filter((rsvp) => {
      return rsvp.eventId === entryEvent.id
    })

    if (entryRsvps == null) {
      return []
    }

    return entryRsvps
  },
)

// Returns true if all Rsvps for the Entry Event are marked "accepted".
export const getHasAcceptedEntryEvent = createSelector(
  [getEntryRsvps],
  (entryRsvps) => {
    if (entryRsvps == null || entryRsvps.length === 0) {
      return false
    }

    const declinedEntryRsvps = entryRsvps.filter((rsvp) => {
      return !rsvp.accepted
    })

    if (declinedEntryRsvps == null) {
      return true
    }

    return declinedEntryRsvps.length === 0
  },
)

// Returns true if all Rsvps for the Entry Event are marked "declined".
export const getHasDeclinedEntryEvent = createSelector(
  [getEntryRsvps],
  (entryRsvps) => {
    if (entryRsvps == null || entryRsvps.length === 0) {
      return false
    }

    const acceptedEntryRsvps = entryRsvps.filter((rsvp) => {
      return rsvp.accepted
    })

    if (acceptedEntryRsvps == null) {
      return true
    }

    return acceptedEntryRsvps.length === 0
  },
)

// Returns an arrya of Rsvps which are for Main events.
const getMainRsvps = createSelector(
  [getAllRsvps, getMainEventIds],
  (allRsvps, mainEventIds) => {
    const mainRsvps: RsvpT[] = []

    allRsvps.map((rsvp) => {
      if (mainEventIds.includes(rsvp.eventId)) {
        mainRsvps.push(rsvp)
      }
    })

    return mainRsvps
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

// Returns true if the user has completed all Rsvps for all Main event invites,
// but has declined all of them.
export const getHasDeclinedAllMainEvents = createSelector(
  [getHasCompletedAllMainInvites, getMainRsvps],
  (hasCompletedAllMainInvites, mainRsvps) => {
    if (!hasCompletedAllMainInvites) {
      return false
    }

    const acceptedRsvp = mainRsvps.find((r) => {
      return Boolean(r.accepted)
    })

    return acceptedRsvp == null
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

export const getHasCompletedEntryInvites = createSelector(
  [getEntryRsvps, getEntryInvites],
  (entryRsvps, entryInvites) => {
    return entryRsvps.length === entryInvites.length
  },
)

// Returns true if the user has an RSVP for each lodging event invite.
export const getHasCompletedAllLodgingInvites = createSelector(
  [getLodgingRsvpIds, getLodgingInviteIds],
  (lodgingRsvpIds, lodgingInviteIds) => {
    return lodgingRsvpIds.length === lodgingInviteIds.length
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

// Returns true if the user is coming to anything during the wedding weekend.
export const getIsComing = createSelector(
  [getEntryRsvps, getMainRsvps],
  (entryRsvps, mainRsvps) => {
    if (entryRsvps == null || mainRsvps == null) {
      return false
    }

    // The user is coming to the wedding if:
    // 1. They said "yes" on the Entry invite (both guests).
    // 2. They said "yes" to at least on Main event (>= 1 guest).

    // Are all guests for this user coming to the wedding?
    const isAttendingEntry = entryRsvps.reduce((carry, entryRsvp) => {
      if (!carry) {
        return false
      }

      return Boolean(entryRsvp.accepted)
    }, true)

    if (!isAttendingEntry) {
      return false
    }

    // Check if any guests are coming to any Main events.
    const isAttendingAnyMainEvent = mainRsvps.find((mainRsvp) => {
      return Boolean(mainRsvp.accepted)
    })

    return isAttendingAnyMainEvent
  },
)
