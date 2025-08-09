import { useAppSelector } from '@/store'
import { getAdminData, getRsvpsByGuestId } from '@/features/wedding/selectors'

const RsvpsByGuest = () => {
  const rsvpsByGuestId = useAppSelector(getRsvpsByGuestId)
  const { events } = useAppSelector(getAdminData)

  console.log('rsvpsByGuestId')
  console.dir(rsvpsByGuestId)

  if (rsvpsByGuestId == null) {
    return null
  }

  const guestIds = Object.keys(rsvpsByGuestId)

  return (
    <div className="w-full">
      <h2 className="text-xl">RSVPs by Guest Id</h2>
      {/* <pre>{JSON.stringify(rsvpsByGuestId, null, 2)}</pre> */}

      <div className="flex w-full gap-2">
        <div key="empty">Guest Name</div>
        {events.map((event) => {
          return (
            <div key={event.id} className="w-24">
              {event.name}
            </div>
          )
        })}
      </div>

      {guestIds.map((guestId) => {
        return (
          <div key={guestId} className="flex gap-2">
            <div key="empty" className="w-24 shrink-0 grow-0">
              {rsvpsByGuestId[guestId][0].guests.fullName}
            </div>
            {Object.values(rsvpsByGuestId[guestId]).map((rsvp) => {
              return (
                <div key={rsvp.id} className="w-24 shrink-0 grow-0">
                  <div>{rsvp.accepted ? 'Yes' : 'No'}</div>
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
