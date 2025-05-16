import { useTitle } from '@/hooks'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  clickedAttendingEntry,
  clickedNotAttendingEntry,
} from '@/features/wedding/thunks'
import { getEntryEvent, getAllGuests } from '@/features/wedding/selectors'
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

    guests.map((guest) => {
      dispatch(
        clickedAttendingEntry({
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

    guests.map((guest) => {
      dispatch(
        clickedNotAttendingEntry({
          accepted: false,
          eventId: entryEvent?.id,
          guestId: guest.id,
        }),
      )
    })
  }

  return (
    <div className="flex min-h-dvh w-screen flex-col justify-center gap-10 overflow-hidden px-6 py-4">
      <header className="flex flex-col">
        <div className="text-center text-sm text-neutral-700">
          <p>You're invited to the wedding of</p>
        </div>
        <h1 className="font-birthstone text-primary -mt-2 text-center text-7xl leading-24">
          Hilary & Matt
        </h1>
        <div className="text-md flex flex-col gap-0.5 text-center leading-5">
          <p>Steamboat Springs, CO</p>
          <p>Saturday, October 11, 2025</p>
        </div>
      </header>

      <section className="flex w-full flex-col items-center justify-center gap-6 px-2">
        <div className="flex flex-col gap-2">
          <img
            className="aspect-square size-full flex-shrink rounded-xl border"
            src="/engagement-1.jpg"
            alt="Engagement photo"
          />
        </div>
      </section>

      <section className="flex w-full flex-col items-center justify-center gap-6 px-2">
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
