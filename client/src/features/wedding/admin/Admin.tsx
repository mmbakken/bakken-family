import { useAppDispatch, useAppSelector } from '@/store'
import { useTitle } from '@/hooks'
import { fetchAdminData } from '@/features/wedding/thunks'
import { getAdminData } from '@/features/wedding/selectors'
import { useEffect } from 'react'

const Admin = () => {
  useTitle('Wedding - Admin')
  const dispatch = useAppDispatch()
  const { rsvps, users, events, guests, invites } = useAppSelector(getAdminData)

  useEffect(() => {
    dispatch(fetchAdminData())
  }, [dispatch])

  console.log('RSVPs:')
  console.dir(rsvps)

  return (
    <div className="bg-app-blush-100 min-h-screen min-w-screen p-4">
      <header>
        <h1 className="text-3xl">Admin Page</h1>
      </header>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl">Users</h2>
          <pre>{JSON.stringify(users, null, 2)}</pre>

          <hr className="border-app-purple-700 my-8 rounded-xl border" />

          <h2 className="text-xl">Guests</h2>
          <pre>{JSON.stringify(guests, null, 2)}</pre>

          <hr className="border-app-purple-700 my-8 rounded-xl border" />

          <h2 className="text-xl">RSVPs</h2>
          <pre>{JSON.stringify(rsvps, null, 2)}</pre>

          <hr className="border-app-purple-700 my-8 border" />

          <h2 className="text-xl">Events</h2>
          <pre>{JSON.stringify(events, null, 2)}</pre>

          <hr className="border-app-purple-700 my-8 border" />

          <h2 className="text-xl">Invites</h2>
          <pre>{JSON.stringify(invites, null, 2)}</pre>
        </div>
      </section>
    </div>
  )
}

export default Admin
