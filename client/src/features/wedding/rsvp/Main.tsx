import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useAppDispatch, useAppSelector } from '@/store'
import { useTitle } from '@/hooks'
import {
  clickedBack,
  clickedNext,
  getHasCompletedAllMainInvites,
  getOrderedMainEventIds,
  getHasMainInvites,
  getMainInvitesByEventId,
  getMainEventsById,
  getGuestsById,
  getRsvpByEventIdAndGuestId,
  upsertRsvp,
} from '@/features/wedding/slice'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Main = () => {
  useTitle('Wedding - RSVP')

  const dispatch = useAppDispatch()

  const hasCompletedAllMainInvites = useAppSelector(
    getHasCompletedAllMainInvites,
  )
  const orderedMainEventIds = useAppSelector(getOrderedMainEventIds)
  const hasMainInvites = useAppSelector(getHasMainInvites)

  const handleBackClick = () => {
    dispatch(clickedBack())
  }

  const handleNextClick = () => {
    dispatch(clickedNext())
  }

  return (
    <div className="flex min-h-screen w-screen flex-col gap-6 overflow-hidden px-6 py-4">
      <header className="flex items-center justify-between gap-2">
        <Button size="icon" onClick={handleBackClick}>
          <ChevronLeft />
        </Button>
        <h1 className="text-primary text-center text-5xl leading-16">RSVP</h1>
        <Button size="icon" disabled onClick={handleNextClick}>
          <ChevronRight />
        </Button>
      </header>

      <p>
        Has completed all Main invites: {String(hasCompletedAllMainInvites)}
      </p>

      {hasMainInvites &&
        orderedMainEventIds.map((eventId) => {
          return <Event id={eventId} key={eventId} />
        })}
    </div>
  )
}

type EventProps = {
  id: string
}

const Event = ({ id }: EventProps) => {
  const mainInvitesByEventId = useAppSelector(getMainInvitesByEventId)
  const mainEventsById = useAppSelector(getMainEventsById)

  const event = mainEventsById[id]
  const invites = mainInvitesByEventId[id]

  return (
    <div>
      <h2>{event.name}</h2>
      {event.startsAt != null && (
        <p>{format(event.startsAt, "EEEE', 'MMMM do' at 'haaa' MT'")}</p>
      )}
      <p>{event.location}</p>
      <p>{event.description}</p>

      <p>Entree required: {String(event.hasEntree)}</p>

      {invites.map((invite) => {
        return (
          <GuestRsvp id={invite.guestId} eventId={id} key={invite.guestId} />
        )
      })}
    </div>
  )
}

const ATTENDING_STATUS = {
  DECLINED: -1,
  PENDING: 0,
  ACCEPTED: 1,
}

type GuestRsvpProps = {
  id: string
  eventId: string
}

const GuestRsvp = ({ id, eventId }: GuestRsvpProps) => {
  const dispatch = useAppDispatch()
  const guestsById = useAppSelector(getGuestsById)
  const guest = guestsById[id]
  const rsvp = useAppSelector((state) =>
    getRsvpByEventIdAndGuestId(state, eventId, id),
  )

  // Prefer API state, but use local state as fallback.
  const [accepted, setAccepted] = useState(() => {
    if (rsvp != null) {
      return rsvp.accepted
        ? ATTENDING_STATUS.ACCEPTED
        : ATTENDING_STATUS.DECLINED
    }

    return ATTENDING_STATUS.PENDING
  })

  // Allow Redux Rsvp status to update the local state, when it changes
  useEffect(() => {
    setAccepted((accepted) => {
      if (rsvp != null) {
        return rsvp.accepted
          ? ATTENDING_STATUS.ACCEPTED
          : ATTENDING_STATUS.DECLINED
      }

      return accepted
    })
  }, [rsvp])

  // When the user makes a decision on an invite, they are creating an Rsvp.
  const handleInviteRsvp = (attending: boolean) => {
    // Update the local state immediately while waiting for update from API.
    setAccepted(
      attending ? ATTENDING_STATUS.ACCEPTED : ATTENDING_STATUS.DECLINED,
    )

    dispatch(
      upsertRsvp({
        accepted: attending,
        eventId: eventId,
        guestId: id,
      }),
    )
  }

  return (
    <div>
      <p>{guest.fullName}</p>

      <RsvpButtons accepted={accepted} onSelect={handleInviteRsvp} />
    </div>
  )
}

type RsvpButtonsProps = {
  accepted: number // -1, -0, or 1
  onSelect: (attending: boolean) => void
}

// UI component. Renders two buttons next to each other. Each is selectable at
// the exclusion of the other (like a radio button group). The status drives
// the styles of both buttons.
const RsvpButtons = ({ accepted, onSelect }: RsvpButtonsProps) => {
  // TODO: Improve styles
  const pendingVariant = 'secondary'
  const activeVariant = 'default'
  const inactiveVariant = 'secondary'

  const attendingVariant =
    accepted == ATTENDING_STATUS.PENDING
      ? pendingVariant
      : accepted === ATTENDING_STATUS.ACCEPTED
        ? activeVariant
        : inactiveVariant
  const notAttendingVariant =
    accepted == ATTENDING_STATUS.PENDING
      ? pendingVariant
      : accepted === ATTENDING_STATUS.DECLINED
        ? activeVariant
        : inactiveVariant

  return (
    <>
      <Button variant={attendingVariant} onClick={() => onSelect(true)}>
        Attending
      </Button>
      <Button variant={notAttendingVariant} onClick={() => onSelect(false)}>
        Not Attending
      </Button>
    </>
  )
}

export default Main
