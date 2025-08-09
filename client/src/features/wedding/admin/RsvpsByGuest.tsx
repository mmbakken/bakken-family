import { useAppSelector } from '@/store'
import { getAdminData, getRsvpsByGuestId } from '@/features/wedding/selectors'

const RsvpsByGuest = () => {
  const rsvpsByGuestId = useAppSelector(getRsvpsByGuestId)
  const { events } = useAppSelector(getAdminData)

  if (rsvpsByGuestId == null) {
    return null
  }

  const guestIds = Object.keys(rsvpsByGuestId)

  const acceptedStyles = ''
  const rejectedStyles = 'font-semibold'

  return (
    <div className="w-full">
      <h2 className="pb-4 text-2xl">RSVPs by Guest</h2>

      <div className="flex w-full gap-2">
        <div key="empty" className="w-48 shrink-0 pb-2 font-semibold">
          Name
        </div>
        {events.map((event) => {
          return (
            <div key={event.id} className="w-24 shrink-0 pb-2 font-semibold">
              {event.name}
            </div>
          )
        })}
      </div>

      {guestIds.map((guestId) => {
        const rsvps = rsvpsByGuestId[guestId]
        const guestName = rsvps[0].guests.fullName

        return (
          <div key={guestId} className="flex gap-2">
            <div key="empty" className="w-48 shrink-0">
              {guestName}
            </div>

            {rsvps.map((rsvp) => {
              return (
                <div key={rsvp.id} className="w-24 shrink-0">
                  <div
                    className={rsvp.accepted ? acceptedStyles : rejectedStyles}
                  >
                    {rsvp.accepted ? 'Yes' : 'No'}
                  </div>
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
