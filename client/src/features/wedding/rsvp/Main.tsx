import { format } from 'date-fns'
import { useAppDispatch, useAppSelector } from '@/store'
import { useTitle } from '@/hooks'
import {
  useAddRsvpMutation,
  useGetRsvpsQuery,
  useGetInvitesQuery,
} from '@/services/api'
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
} from '../slice'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Main = () => {
  useTitle('Wedding - RSVP')

  const dispatch = useAppDispatch()

  // TODO
  // - fetch all guests
  // - fetch all Main invites
  // - Iterate through all Main invites
  // - Render their event name and event description
  // - Show the guest name per invite

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
  const guestsById = useAppSelector(getGuestsById)
  const guest = guestsById[id]
  const rsvp = useAppSelector((state) =>
    getRsvpByEventIdAndGuestId(state, eventId, id),
  )
  const [addRsvp] = useAddRsvpMutation()

  console.log(`Rsvp for guest ${id} and event ${eventId}`)
  console.dir(rsvp)

  // TODO: Find out if the user has submitted an Rsvp already for this invite.
  const accepted =
    rsvp == null
      ? ATTENDING_STATUS.PENDING
      : rsvp.accepted
        ? ATTENDING_STATUS.ACCEPTED
        : ATTENDING_STATUS.DECLINED

  // TODO:
  // When the user makes a decision on an invite, they are creating an Rsvp.
  const handleInviteRsvp = (attending: boolean) => {
    // dispatch an upsertRsvp action here
    console.log(`handleInviteRsvp // attending: ${attending}`)

    addRsvp({
      accepted: attending,
      eventId: eventId,
      guestId: id,
    })
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
  // TODO: Add styles
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
