import { Fragment } from 'react/jsx-runtime'
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
    <div className="flex min-h-dvh w-screen flex-col items-center gap-6 overflow-hidden p-6">
      <header className="flex w-full max-w-2xl flex-col items-center justify-between gap-4">
        <h1 className="font-birthstone text-primary text-center text-7xl leading-24">
          Lodging
        </h1>
        <p>
          We'd love to have you stay with us at the Sky Valley Chateau for the
          weekend of our wedding! It's a 10-bedroom, 10-bathroom vacation
          rental, and it's the site of the ceremony and reception on Saturday
          October 11th. Room assignments TBD - we need to know who is stayng
          with us and which nights.
        </p>
      </header>

      <div className="w-full max-w-2xl">
        {hasLodgingInvites &&
          orderedLodgingEventIds.map((eventId, index) => {
            return (
              <Fragment key={eventId}>
                <Event id={eventId} />
                {index !== orderedLodgingEventIds.length - 1 && (
                  <hr className="mx-8 my-10 h-px border-0 bg-neutral-300" />
                )}
              </Fragment>
            )
          })}
      </div>

      <section className="w-full max-w-2xl">
        <p>Check-out is at 11am on Monday 10/13</p>
      </section>

      <section className="flex h-full w-full max-w-2xl flex-col items-center justify-center pt-4">
        <div className="flex w-full max-w-72 flex-col items-center justify-center gap-3">
          <Button
            size="lg"
            disabled={!hasCompletedAllLodgingInvites}
            className="w-full"
            onClick={handleSubmitClick}
          >
            Submit RSVP
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
