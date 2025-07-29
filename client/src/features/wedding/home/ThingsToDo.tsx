import { Button } from '@/components/ui/button'
import { useTitle } from '@/hooks'
import { Link } from '@tanstack/react-router'

const ThingsToDo = () => {
  useTitle('Wedding - Things to Do')

  return (
    <div className="flex h-dvh w-screen flex-col items-center gap-8 overflow-hidden px-6 py-4">
      <header className="flex flex-col gap-2">
        <h1 className="font-birthstone text-primary text-center text-6xl leading-20">
          Things to Do
        </h1>
      </header>

      <main className="flex flex-col items-center gap-8">
        <h2>
          Check back soon to read about things to do in and around Steamboat
          Springs, Colorado!
        </h2>
        <Link to="/wedding">
          <Button variant="link">Home</Button>
        </Link>
      </main>
    </div>
  )
}

export default ThingsToDo
