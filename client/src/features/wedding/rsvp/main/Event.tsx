import { format } from 'date-fns'
import { useAppSelector } from '@/store'
import {
  getMainInvitesByEventId,
  getMainEventsById,
} from '@/features/wedding/selectors'
import { GuestRsvp } from '@/features/wedding/rsvp/main'

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

export default Event
