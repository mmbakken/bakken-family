import { useAppDispatch, useAppSelector } from '@/store'
import { useTitle } from '@/hooks'
import { fetchRsvpData } from '@/features/wedding/thunks'
import {
  getAllGuests,
  getAllRsvps,
  getAllEvents,
  getAllInvites,
} from '@/features/wedding/selectors'
import { useEffect } from 'react'

const Admin = () => {
  const dispatch = useAppDispatch()
  useTitle('Wedding - Admin')

  useEffect(() => {
    dispatch(fetchRsvpData())
  }, [dispatch])

  const allGuests = useAppSelector(getAllGuests)
  const allRsvps = useAppSelector(getAllRsvps)
  const allEvents = useAppSelector(getAllEvents)
  const allInvites = useAppSelector(getAllInvites)

  return (
    <div className="bg-app-blush-100 min-h-screen min-w-screen p-4">
      <header>
        <h1 className="text-3xl">Admin Page</h1>
      </header>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl">Guests</h2>
          <pre>{JSON.stringify(allGuests, null, 2)}</pre>

          <hr className="border-app-purple-700 my-8 rounded-xl border" />

          <h2 className="text-xl">RSVPs</h2>
          <pre>{JSON.stringify(allRsvps, null, 2)}</pre>

          <hr className="border-app-purple-700 my-8 border" />

          <h2 className="text-xl">Events</h2>
          <pre>{JSON.stringify(allEvents, null, 2)}</pre>

          <hr className="border-app-purple-700 my-8 border" />

          <h2 className="text-xl">Invites</h2>
          <pre>{JSON.stringify(allInvites, null, 2)}</pre>

          <hr className="border-app-purple-700 my-8 border" />
        </div>
      </section>
    </div>
  )
}

export default Admin
