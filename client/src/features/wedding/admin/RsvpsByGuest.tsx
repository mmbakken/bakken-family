import { useAppSelector } from '@/store'
import {
  getSortedEventIds,
  getAllEventsById,
  getPendingInvites,
  getSortedGuestIds,
  getAllGuestsById,
  getRsvpsByGuestId,
} from '@/features/wedding/selectors'
import { EventT, GuestT, InviteT, RsvpT } from '../types'
import { ATTENDING_STATUS } from '../constants'

// Returns the status of the guest at this event, given a list of Rsvps and
// pending invites. If no Rsvp or Pending Invite can be found, then the guest
// must not have been invited to this event.
const findGuestEventStatus = (
  guest: GuestT,
  event: EventT,
  rsvps: RsvpT[],
  pendingInvites: InviteT[],
) => {
  const rsvp = rsvps.find(
    (r) => r.guestId === guest.id && r.eventId === event.id,
  )

  if (rsvp != null) {
    return rsvp.accepted ? ATTENDING_STATUS.ACCEPTED : ATTENDING_STATUS.DECLINED
  }

  const invite = pendingInvites.find(
    (i) => i.guestId === guest.id && i.eventId === event.id,
  )

  if (invite != null) {
    return ATTENDING_STATUS.PENDING
  }

  // Nothing else was found => not invited.
  return ATTENDING_STATUS.NOT_INVITED
}

// Returns the label to use for this Rsvp status.
const findStatusLabel = (status: number) => {
  switch (status) {
    case ATTENDING_STATUS.ACCEPTED: {
      return 'Yes'
    }

    case ATTENDING_STATUS.DECLINED: {
      return 'No'
    }

    case ATTENDING_STATUS.PENDING: {
      return '?'
    }

    case ATTENDING_STATUS.NOT_INVITED: {
      return '–'
    }
  }
}

// Returns the Tailwind classname to use for this Rsvp status.
const findStatusClassname = (status: number) => {
  const defaultStyles = ''
  const declinedStyles = 'font-semibold'
  const pendingStyles = 'font-light text-neutral-300'

  switch (status) {
    case ATTENDING_STATUS.ACCEPTED: {
      return defaultStyles
    }

    case ATTENDING_STATUS.DECLINED: {
      return declinedStyles
    }

    case ATTENDING_STATUS.PENDING: {
      return pendingStyles
    }

    case ATTENDING_STATUS.NOT_INVITED: {
      return pendingStyles
    }
  }
}

const RsvpsByGuest = () => {
  const sortedGuestIds = useAppSelector(getSortedGuestIds)
  const allGuestsById = useAppSelector(getAllGuestsById)
  const rsvpsByGuestId = useAppSelector(getRsvpsByGuestId)
  const sortedEventIds = useAppSelector(getSortedEventIds)
  const allEventsById = useAppSelector(getAllEventsById)
  const pendingInvites = useAppSelector(getPendingInvites)

  if (rsvpsByGuestId == null) {
    return null
  }

  return (
    <div className="w-full">
      <h2 className="pb-4 text-2xl">RSVPs</h2>

      {/* Headers, with events in sorted order */}
      <div className="flex w-full gap-2">
        <div key="empty" className="w-46 shrink-0 pb-2 text-sm font-semibold">
          Guest
        </div>

        {sortedEventIds.map((eventId) => {
          const event = allEventsById[eventId]

          return (
            <div
              key={eventId}
              className="w-20 shrink-0 pb-2 text-sm font-semibold"
            >
              {event.name}
            </div>
          )
        })}
      </div>

      {/* Each guest has their RSVP statuses listed in order of each event */}
      {sortedGuestIds.map((guestId) => {
        const guestRsvps = rsvpsByGuestId[guestId]
        const guest = allGuestsById[guestId]

        if (guest == null) {
          return
        }

        return (
          <div key={guestId} className="flex gap-2">
            <div key="empty" className="w-46 shrink-0 text-sm">
              {guest.fullName}
            </div>

            {sortedEventIds.map((eventId) => {
              const event = allEventsById[eventId]
              const status = findGuestEventStatus(
                guest,
                event,
                guestRsvps,
                pendingInvites,
              )
              const statusLabel = findStatusLabel(status)
              const statusClassname = findStatusClassname(status)

              return (
                <div key={event.id} className="w-20 shrink-0 text-sm">
                  <div className={statusClassname}>{statusLabel}</div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default RsvpsByGuest
