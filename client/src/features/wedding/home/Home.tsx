import { useEffect } from 'react'
import { useTitle } from '@/hooks'
import { Link, useNavigate } from '@tanstack/react-router'
import { Route as LoginRoute } from '@/routes/wedding/login'
import { Header } from '@/features/wedding/home'
import { Button } from '@/components/ui/button'
import { getIsAdminUser } from '@/features/wedding/selectors'
import { useAppDispatch, useAppSelector } from '@/store'
import { logout } from '@/features/wedding/slice'
import { getCurrentUserId } from '@/features/wedding/selectors'
import { fetchUser } from '@/features/wedding/thunks'

const Home = () => {
  useTitle('Wedding')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userId = useAppSelector(getCurrentUserId)
  const isAdminUser = useAppSelector(getIsAdminUser)

  // Fetch user data whenver the app loads and the user is already logged in.
  useEffect(() => {
    if (userId == null && localStorage.getItem('token') != null) {
      dispatch(fetchUser())
    }
  }, [dispatch, userId])

  //==================================================
  // Event handlers
  //==================================================

  const handleLogoutKeyDown = async (
    e: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (e.key === 'Enter') {
      logoutUser()
    }
  }

  const handleLogoutClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    logoutUser()
  }

  //==================================================
  // API calls
  //==================================================

  const logoutUser = () => {
    dispatch(logout())
    navigate({ to: LoginRoute.fullPath })
  }

  return (
    <div className="flex h-dvh w-screen flex-col items-center justify-between gap-8 overflow-hidden px-6 py-4">
      <Header />

      <main>
        <ul className="flex flex-col items-center gap-4 md:gap-6">
          <li className="cursor-pointer text-lg underline-offset-2 hover:underline md:text-xl">
            <Link to="/wedding/rsvp">RSVP</Link>
          </li>
          <li className="cursor-pointer text-lg underline-offset-2 hover:underline md:text-xl">
            <Link to="/wedding/our-story">Our Story</Link>
          </li>
          <li className="cursor-pointer text-lg underline-offset-2 hover:underline md:text-xl">
            <Link to="/wedding/events">Weekend Events</Link>
          </li>
          <li className="cursor-pointer text-lg underline-offset-2 hover:underline md:text-xl">
            <Link to="/wedding/things-to-do">Things to Do</Link>
          </li>
          <li className="cursor-pointer text-lg underline-offset-2 hover:underline md:text-xl">
            <Link to="/wedding/questions">FAQs</Link>
          </li>
          <li className="cursor-pointer text-lg underline-offset-2 hover:underline md:text-xl">
            <Link to="/wedding/tree-nuts">Tree Nuts</Link>
          </li>
          <li className="cursor-pointer text-lg underline-offset-2 hover:underline md:text-xl">
            <Link to="/wedding/registry">Registry</Link>
          </li>

          {isAdminUser && (
            <li className="cursor-pointer text-lg underline-offset-2 hover:underline md:text-xl">
              <Link to="/wedding/admin">Admin</Link>
            </li>
          )}
        </ul>
      </main>

      <section>
        <Button
          onKeyDown={handleLogoutKeyDown}
          onClick={handleLogoutClick}
          variant="link"
        >
          Log out
        </Button>
      </section>
    </div>
  )
}

export default Home
