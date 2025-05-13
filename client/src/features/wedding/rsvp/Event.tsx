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

  const hasEntree = event.hasEntree
  const inviteCN = hasEntree ? 'flex flex-col gap-4' : 'flex flex-col gap-2'

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h2 className="text-2xl">{event.name}</h2>

        <div>
          {event.startsAt != null && (
            <p className="text-sm text-neutral-500">
              {format(event.startsAt, "EEEE', 'MMMM do' at 'haaa' MT'")}
            </p>
          )}
          <p className="text-sm text-neutral-500">{event.location}</p>
        </div>

        <div>
          <p>{event.description}</p>
        </div>
      </header>

      <section className={inviteCN}>
        {invites.map((invite) => {
          return (
            <GuestRsvp id={invite.guestId} eventId={id} key={invite.guestId} />
          )
        })}
      </section>
    </div>
  )
}

export default Event
