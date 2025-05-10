import { format } from 'date-fns'
import { useAppSelector } from '@/store'
import {
  getInvitesByEventId,
  getEventsById,
} from '@/features/wedding/selectors'
import { GuestRsvp } from '@/features/wedding/rsvp'

type EventProps = {
  id: string
}

const Event = ({ id }: EventProps) => {
  const invitesByEventId = useAppSelector(getInvitesByEventId)
  const eventsById = useAppSelector(getEventsById)

  const event = eventsById[id]
  const invites = invitesByEventId[id]

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
