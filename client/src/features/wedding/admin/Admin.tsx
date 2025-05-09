import { useAppSelector } from '@/store'
import { useTitle } from '@/hooks'
import {
  useGetGuestsQuery,
  useGetRsvpsQuery,
  useGetEventsQuery,
  useGetInvitesQuery,
} from '@/services/api'
import {
  getAllGuests,
  getAllRsvps,
  getAllEvents,
  getAllInvites,
} from '@/features/wedding/slice'
import { Loader } from 'lucide-react'

const Admin = () => {
  useTitle('Wedding - RSVP')

  const {
    error: guestsError,
    isError: guestsIsError,
    isLoading: isLoadingGuests,
  } = useGetGuestsQuery()
  const {
    error: rsvpsError,
    isError: rsvpsIsError,
    isLoading: isLoadingRsvps,
  } = useGetRsvpsQuery()
  const {
    error: eventsError,
    isError: eventsIsError,
    isLoading: isLoadingEvents,
  } = useGetEventsQuery()
  const {
    error: invitesError,
    isError: invitesIsError,
    isLoading: isLoadingInvites,
  } = useGetInvitesQuery()

  const allGuests = useAppSelector(getAllGuests)
  const allRsvps = useAppSelector(getAllRsvps)
  const allEvents = useAppSelector(getAllEvents)
  const allInvites = useAppSelector(getAllInvites)

  const isError =
    guestsIsError || rsvpsIsError || eventsIsError || invitesIsError
  const isLoading =
    isLoadingGuests || isLoadingRsvps || isLoadingEvents || isLoadingInvites

  if (guestsError != null) {
    console.error('Error with loading guests:')
    console.error(guestsError)
    return null
  }

  if (rsvpsError != null) {
    console.error('Error with loading rsvps:')
    console.error(rsvpsError)
    return null
  }

  if (eventsError != null) {
    console.error('Error with loading events:')
    console.error(eventsError)
    return null
  }

  if (invitesError != null) {
    console.error('Error with loading invites:')
    console.error(invitesError)
    return null
  }

  return (
    <div className="bg-app-blush-100">
      <header>
        <h1>Hello, this is the Admin Page</h1>
      </header>

      <section className="flex flex-col gap-4">
        {isLoading && <Loader className="animate-spin" />}

        {isError && (
          <pre>
            {JSON.stringify(
              'Something went wrong :( - sorry about that. Try again later.',
              null,
              2,
            )}
          </pre>
        )}

        {!isLoading && !isError && (
          <div>
            <pre>{JSON.stringify(allGuests, null, 2)}</pre>
            <pre>{JSON.stringify(allRsvps, null, 2)}</pre>
            <pre>{JSON.stringify(allEvents, null, 2)}</pre>
            <pre>{JSON.stringify(allInvites, null, 2)}</pre>
          </div>
        )}
      </section>
    </div>
  )
}

export default Admin
