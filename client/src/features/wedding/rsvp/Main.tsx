import { useAppDispatch, useAppSelector } from '@/store'
import { useTitle, useScrollToTop } from '@/hooks'
import { clickedBack, clickedNext } from '@/features/wedding/slice'
import {
  clickedNotAttendingConfirmation,
  clickedSubmit,
} from '@/features/wedding/thunks'
import {
  getGuestCount,
  getHasDeclinedAllMainEvents,
  getHasCompletedAllMainInvites,
  getOrderedMainEventIds,
  getHasMainInvites,
  getHasLodgingInvites,
} from '@/features/wedding/selectors'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { Event } from '@/features/wedding/rsvp'

const Main = () => {
  useTitle('Wedding - RSVP')
  useScrollToTop()
  const dispatch = useAppDispatch()

  //======================================
  // Redux state
  //======================================

  const hasCompletedAllMainInvites = useAppSelector(
    getHasCompletedAllMainInvites,
  )
  const orderedMainEventIds = useAppSelector(getOrderedMainEventIds)
  const hasMainInvites = useAppSelector(getHasMainInvites)
  const hasLodgingInvites = useAppSelector(getHasLodgingInvites)
  const hasDeclinedAllMainEvents = useAppSelector(getHasDeclinedAllMainEvents)
  const guestCount = useAppSelector(getGuestCount)

  //======================================
  // Derived state
  //======================================

  const declineAllLabel = `Actually, ${guestCount === 1 ? 'I' : 'we'} can't make it.`
  const primaryButtonLabel = hasDeclinedAllMainEvents
    ? declineAllLabel
    : hasLodgingInvites
      ? 'Next'
      : 'Submit'
  const showArrow = !hasDeclinedAllMainEvents && hasLodgingInvites

  //======================================
  // Event handlers
  //======================================

  const handleBackClick = () => {
    dispatch(clickedBack())
  }

  const handlePrimaryButtonClick = () => {
    if (hasDeclinedAllMainEvents) {
      dispatch(clickedNotAttendingConfirmation())
      return
    }

    if (hasLodgingInvites) {
      dispatch(clickedNext())
      return
    }

    dispatch(clickedSubmit())
  }

  return (
    <div className="flex min-h-screen w-screen flex-col gap-8 overflow-hidden px-6 py-6">
      <header>
        <h1 className="text-primary text-5xl">RSVP</h1>
      </header>

      <div>
        {hasMainInvites &&
          orderedMainEventIds.map((eventId, index) => {
            return (
              <>
                <Event id={eventId} key={eventId} />
                {index !== orderedMainEventIds.length - 1 && (
                  <hr className="mx-8 my-10 h-px border-0 bg-neutral-300" />
                )}
              </>
            )
          })}
      </div>

      <section className="flex h-full w-full flex-col items-center justify-center pt-4">
        <div className="flex w-full max-w-64 flex-col items-center justify-center gap-3">
          <Button
            size="lg"
            disabled={!hasCompletedAllMainInvites}
            className="w-full"
            onClick={handlePrimaryButtonClick}
          >
            {primaryButtonLabel}
            {showArrow && <ChevronRight />}
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="w-full"
            onClick={handleBackClick}
          >
            Back
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Main
