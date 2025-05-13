import { useAppDispatch, useAppSelector } from '@/store'
import { useTitle, useScrollToTop } from '@/hooks'
import { clickedBack } from '@/features/wedding/slice'
import { clickedSubmit } from '@/features/wedding/thunks'
import {
  getHasCompletedAllLodgingInvites,
  getOrderedLodgingEventIds,
  getHasLodgingInvites,
} from '@/features/wedding/selectors'
import { Button } from '@/components/ui/button'
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

  const handleSubmitClick = () => {
    dispatch(clickedSubmit())
  }

  return (
    <div className="flex min-h-screen w-screen flex-col gap-6 overflow-hidden p-6">
      <header className="flex flex-col items-center justify-between gap-4">
        <h1 className="text-primary text-center text-5xl">Lodging</h1>
        <p>
          We'd love to have you stay with us at the Sky Valley Chateau for the
          weekend of our wedding! It's a 10-bedroom, 10-bathroom vacation
          rental, and it's the site of the ceremony and reception on Saturday
          October 11th. Room assignments TBD - we need to know who is stayng
          with us and which nights.
        </p>
      </header>

      <div>
        {hasLodgingInvites &&
          orderedLodgingEventIds.map((eventId, index) => {
            return (
              <>
                <Event id={eventId} key={eventId} />
                {index !== orderedLodgingEventIds.length - 1 && (
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
            disabled={!hasCompletedAllLodgingInvites}
            className="w-full"
            onClick={handleSubmitClick}
          >
            Submit
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

export default Lodging
