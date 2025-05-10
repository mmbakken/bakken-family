import { useTitle } from '@/hooks'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  getEntryEvent,
  clickedAttending,
  clickedNotAttending,
  upsertRsvp,
  getAllGuests,
} from '@/features/wedding/slice'
import { Button } from '@/components/ui/button'

const Entry = () => {
  useTitle('Wedding - RSVP')

  const dispatch = useAppDispatch()
  const entryEvent = useAppSelector(getEntryEvent)
  const guests = useAppSelector(getAllGuests)

  const allowUpdates = entryEvent != null && guests != null

  const handleAttendingClick = () => {
    if (!allowUpdates) {
      return
    }

    dispatch(clickedAttending())

    guests.map((guest) => {
      dispatch(
        upsertRsvp({
          accepted: true,
          eventId: entryEvent?.id,
          guestId: guest.id,
        }),
      )
    })
  }

  const handleNotAttendingClick = () => {
    if (!allowUpdates) {
      return
    }

    dispatch(clickedNotAttending())

    guests.map((guest) => {
      dispatch(
        upsertRsvp({
          accepted: false,
          eventId: entryEvent?.id,
          guestId: guest.id,
        }),
      )
    })
  }

  return (
    <div className="flex h-screen w-screen flex-col gap-6 overflow-hidden px-6 py-4">
      <header className="flex flex-col">
        <div className="text-center text-sm text-neutral-700">
          <p>You're invited to the wedding of</p>
        </div>
        <h1 className="text-primary text-center text-5xl leading-16">
          Hilary & Matt
        </h1>
        <div className="text-md flex flex-col gap-0.5 text-center leading-5">
          <p>Steamboat Springs, CO</p>
          <p>Saturday, October 11, 2025</p>
        </div>
      </header>

      <section className="flex h-full w-full flex-col items-center justify-center gap-6 px-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-center text-2xl">Can you make it?</h2>
          <img
            className="aspect-square size-full flex-shrink rounded-xl border"
            src="/engagement-4.jpg"
            alt="Engagement photo"
          />
        </div>

        <div className="flex w-full max-w-64 flex-col items-center justify-center gap-3">
          <Button size="lg" className="w-full" onClick={handleAttendingClick}>
            Joyfully Accept
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="w-full"
            onClick={handleNotAttendingClick}
          >
            Regretfully Decline
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Entry
