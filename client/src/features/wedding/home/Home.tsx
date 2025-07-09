import { useTitle } from '@/hooks'
import { Link, useNavigate } from '@tanstack/react-router'
import { Route as LoginRoute } from '@/routes/wedding/login'
import { Header } from '@/features/wedding/home'
import { Button } from '@/components/ui/button'

const Home = () => {
  useTitle('Wedding')

  const navigate = useNavigate()

  //==================================================
  // Event handlers
  //==================================================

  const handleLogoutKeyDown = async (
    e: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (e.key === 'Enter') {
      logout()
    }
  }

  const handleLogoutClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    logout()
  }

  //==================================================
  // API calls
  //==================================================

  // TODO: Move to slice?
  const logout = async () => {
    localStorage.removeItem('token')
    navigate({ to: LoginRoute.fullPath })
  }

  return (
    <div className="flex h-dvh max-h-[60rem] w-screen flex-col items-center justify-between gap-8 overflow-hidden px-6 py-4">
      <Header />

      <main>
        <ul className="flex flex-col items-center gap-4">
          <li className="cursor-pointer text-lg underline-offset-2 hover:underline">
            <Link to="/wedding/rsvp">RSVP</Link>
          </li>
          <li className="cursor-pointer text-lg underline-offset-2 hover:underline">
            <Link to="/wedding/our-story">Our Story</Link>
          </li>
          <li className="cursor-pointer text-lg underline-offset-2 hover:underline">
            <Link to="/wedding/events">Weekend Events</Link>
          </li>
          <li className="cursor-pointer text-lg underline-offset-2 hover:underline">
            <Link to="/wedding/things-to-do">Things to Do</Link>
          </li>
          <li className="cursor-pointer text-lg underline-offset-2 hover:underline">
            <Link to="/wedding/questions">Q&A</Link>
          </li>
          <li className="cursor-pointer text-lg underline-offset-2 hover:underline">
            <Link to="/wedding/tree-nuts">Tree Nuts</Link>
          </li>
          <li className="cursor-pointer text-lg underline-offset-2 hover:underline">
            <Link to="/wedding/registry">Registry</Link>
          </li>
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
