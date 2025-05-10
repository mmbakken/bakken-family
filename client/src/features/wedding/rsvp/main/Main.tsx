import { useAppDispatch, useAppSelector } from '@/store'
import { useTitle } from '@/hooks'
import { clickedBack, clickedNext } from '@/features/wedding/slice'
import {
  getHasCompletedAllMainInvites,
  getOrderedMainEventIds,
  getHasMainInvites,
} from '@/features/wedding/selectors'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Event } from '@/features/wedding/rsvp/main'

const Main = () => {
  useTitle('Wedding - RSVP')

  const dispatch = useAppDispatch()

  const hasCompletedAllMainInvites = useAppSelector(
    getHasCompletedAllMainInvites,
  )
  const orderedMainEventIds = useAppSelector(getOrderedMainEventIds)
  const hasMainInvites = useAppSelector(getHasMainInvites)

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
        <h1 className="text-primary text-center text-5xl leading-16">RSVP</h1>
        <Button size="icon" disabled onClick={handleNextClick}>
          <ChevronRight />
        </Button>
      </header>

      <p>
        Has completed all Main invites: {String(hasCompletedAllMainInvites)}
      </p>

      {hasMainInvites &&
        orderedMainEventIds.map((eventId) => {
          return <Event id={eventId} key={eventId} />
        })}
    </div>
  )
}

export default Main
