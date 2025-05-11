import { useAppDispatch, useAppSelector } from '@/store'
import { useTitle, useScrollToTop } from '@/hooks'
import { clickedBack, clickedNext } from '@/features/wedding/slice'
import {
  getHasCompletedAllLodgingInvites,
  getOrderedLodgingEventIds,
  getHasLodgingInvites,
} from '@/features/wedding/selectors'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Event } from '@/features/wedding/rsvp'

const Lodging = () => {
  useTitle('Wedding - RSVP - Lodging')
  useScrollToTop()

  const dispatch = useAppDispatch()

  const hasCompletedAllLodgingInvites = useAppSelector(
    getHasCompletedAllLodgingInvites,
  )
  const orderedLodgingEventIds = useAppSelector(getOrderedLodgingEventIds)
  const hasLodgingInvites = useAppSelector(getHasLodgingInvites)

  const handleBackClick = () => {
    dispatch(clickedBack())
  }

  const handleNextClick = () => {
    dispatch(clickedNext())
  }

  return (
    <div className="flex min-h-screen w-screen flex-col gap-6 overflow-hidden px-6 py-4">
      <header className="flex items-center justify-between gap-2">
        <h1 className="text-primary text-center text-5xl leading-16">
          RSVP - Lodging
        </h1>
      </header>

      <p>
        Has completed all Lodging invites:{' '}
        {String(hasCompletedAllLodgingInvites)}
      </p>

      {hasLodgingInvites &&
        orderedLodgingEventIds.map((eventId) => {
          return <Event id={eventId} key={eventId} />
        })}

      <section className="flex h-full w-full flex-col items-center justify-center gap-6 px-2">
        <div className="flex w-full max-w-64 flex-col items-center justify-center gap-3">
          <Button
            size="lg"
            disabled={!hasCompletedAllLodgingInvites}
            className="w-full"
            onClick={handleNextClick}
          >
            Submit
            <ChevronRight />
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="w-full"
            onClick={handleBackClick}
          >
            <ChevronLeft />
            Back
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Lodging
