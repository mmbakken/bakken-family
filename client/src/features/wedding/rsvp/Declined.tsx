import { useTitle } from '@/hooks'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  clickedAttendingEntry,
  clickedNotAttendingConfirmation,
} from '@/features/wedding/thunks'
import {
  getEntryEvent,
  getAllGuests,
  getGuestCount,
} from '@/features/wedding/selectors'
import { Button } from '@/components/ui/button'

const Entry = () => {
  useTitle('Wedding - RSVP')

  const dispatch = useAppDispatch()
  const entryEvent = useAppSelector(getEntryEvent)
  const guests = useAppSelector(getAllGuests)
  const guestCount = useAppSelector(getGuestCount)

  const allowUpdates = entryEvent != null && guests != null
  const acceptText =
    guestCount === 1
      ? "Just kidding - I'll be there!"
      : "Just kidding - we'll be there!"
  const declineText =
    guestCount === 1
      ? "No, I really can't make it."
      : "No, we really can't make it."

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
    dispatch(clickedNotAttendingConfirmation())
  }

  return (
    <div className="min-h-cvh flex w-screen flex-col justify-center gap-6 overflow-hidden px-6 py-4">
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
          <h2 className="text-center text-2xl">Are you sure??</h2>
          <img
            className="aspect-square size-full max-w-96 flex-shrink rounded-xl border"
            src="/hilary-are-you-sure.jpg"
            alt="A photo of Hilary being sad :("
          />
        </div>

        <div className="flex w-full max-w-64 flex-col items-center justify-center gap-3">
          <Button size="lg" className="w-full" onClick={handleAttendingClick}>
            {acceptText}
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="w-full"
            onClick={handleNotAttendingClick}
          >
            {declineText}
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Entry
