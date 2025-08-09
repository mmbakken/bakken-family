import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { useTitle } from '@/hooks'
import { fetchAdminData } from '@/features/wedding/thunks'
import { getAdminData } from '@/features/wedding/selectors'
import { RsvpsByGuest } from '@/features/wedding/admin'

const Admin = () => {
  useTitle('Wedding - Admin')
  const dispatch = useAppDispatch()
  const { users, guests, events, invites } = useAppSelector(getAdminData)

  useEffect(() => {
    dispatch(fetchAdminData())
  }, [dispatch])

  return (
    <div className="bg-app-blush-100 min-h-screen w-full min-w-screen p-4">
      <header>
        <h1 className="text-3xl">Admin Page</h1>
      </header>

      <section className="flex w-full flex-col gap-4">
        <div className="w-full">
          <h2 className="text-xl">Users</h2>
          <pre>{JSON.stringify(users, null, 2)}</pre>

          <hr className="border-app-purple-700 my-8 rounded-xl border" />

          <h2 className="text-xl">Guests</h2>
          <pre>{JSON.stringify(guests, null, 2)}</pre>

          <hr className="border-app-purple-700 my-8 rounded-xl border" />
          <RsvpsByGuest />
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
