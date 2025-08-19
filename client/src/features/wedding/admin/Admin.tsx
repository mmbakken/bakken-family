import { useEffect } from 'react'
import { useAppDispatch } from '@/store'
import { useTitle } from '@/hooks'
import { fetchAdminData } from '@/features/wedding/thunks'
import {
  RsvpsByGuest,
  EventsSummary,
  GuestAllergies,
  Users,
} from '@/features/wedding/admin'

const Admin = () => {
  useTitle('Wedding - Admin')
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAdminData())
  }, [dispatch])

  return (
    <div className="flex h-dvh w-screen max-w-7xl flex-col gap-4 px-2 py-4">
      <header>
        <h1 className="text-4xl">Admin Page</h1>
      </header>

      <section className="flex w-full flex-col gap-8">
        <RsvpsByGuest />
        <hr className="border-app-purple-700 my-4 border" />
        <EventsSummary />
        <hr className="border-app-purple-700 my-4 border" />
        <GuestAllergies />
        <hr className="border-app-purple-700 my-4 border" />
        <Users />
      </section>
    </div>
  )
}

export default Admin
