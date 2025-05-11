import { useAppDispatch, useAppSelector } from '@/store'
import { useTitle } from '@/hooks'
import { clickedBack, clickedNext } from '@/features/wedding/slice'
import { getIsComing } from '@/features/wedding/selectors'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Done = () => {
  useTitle('Wedding - RSVP - Done')

  const dispatch = useAppDispatch()
  const isComing = useAppSelector(getIsComing)

  // TODO:
  // - What if they say "yes" to Entry, but no to all other events?
  //   => They should be marked as "not attending" for Entry
  // - What if they say "yes" to Entry, tben yes to some events, then they edit
  //   their Entry Rsvp to "No" later?
  //   => Then they'll see the "Declined" screen.
  //   => But, we'll have some bad counts on RSVP acceptance. Hmm...
  //
  // Solution:
  // - For the first case, saying "No" to all Main events for all guests should
  //   lead to your Entry Rsvp being declined too.
  // - For the second case, saying "No" to the Entry event should upsert an Rsvp
  //   for all of the user's guests' invites.

  const greeting = isComing
    ? "We're so glad you can make it!"
    : "We're sorry you can't make it :("

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
          {greeting}
        </h1>
        <Button size="icon" onClick={handleNextClick}>
          <ChevronRight />
        </Button>
      </header>
    </div>
  )
}

export default Done
