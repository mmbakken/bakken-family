import { useAppDispatch, useAppSelector } from '@/store'
import { useTitle } from '@/hooks'
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
        <Button size="icon" onClick={handleBackClick}>
          <ChevronLeft />
        </Button>
        <h1 className="text-primary text-center text-5xl leading-16">
          RSVP - Lodging
        </h1>
        <Button size="icon" onClick={handleNextClick}>
          <ChevronRight />
        </Button>
      </header>

      <p>
        Has completed all Lodging invites:{' '}
        {String(hasCompletedAllLodgingInvites)}
      </p>

      {hasLodgingInvites &&
        orderedLodgingEventIds.map((eventId) => {
          return <Event id={eventId} key={eventId} />
        })}
    </div>
  )
}

export default Lodging
