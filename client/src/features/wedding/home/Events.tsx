import { Button } from '@/components/ui/button'
import { useTitle } from '@/hooks'
import { Link } from '@tanstack/react-router'

const Events = () => {
  useTitle('Wedding - Events')

  return (
    <div className="flex h-dvh w-screen flex-col items-center gap-8 overflow-hidden px-6 py-4">
      <header className="flex flex-col gap-2">
        <h1 className="font-birthstone text-primary text-center text-6xl leading-20">
          Weekend Events
        </h1>
      </header>

      <main className="flex flex-col items-center gap-8">
        <h2>Check back soon to read about the wedding weekend events!</h2>
        <Link to="/wedding">
          <Button variant="link">Home</Button>
        </Link>
      </main>
    </div>
  )
}

export default Events
