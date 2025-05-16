import { useNavigate } from '@tanstack/react-router'
import { useAppSelector } from '@/store'
import { useTitle } from '@/hooks'
import { getIsComing } from '@/features/wedding/selectors'
import { Button } from '@/components/ui/button'

const Done = () => {
  useTitle('Wedding - RSVP - Done')
  const navigate = useNavigate()
  const isComing = useAppSelector(getIsComing)

  const greeting = isComing ? 'Thank you' : 'Thank you'

  const message = isComing
    ? "We'll see you there! In the meantime, swipe around our wedding website and see if you find something you like."
    : "We're sorry you can't make it to the wedding. You can still look around our wedding website if you'd like to."

  const ps =
    'If you need to edit your RSVP, please contact Hilary or Matt directly.'

  const handleHomeClick = () => {
    navigate({ to: '/wedding' })
  }

  return (
    <div className="flex h-dvh w-screen flex-col justify-center gap-8 overflow-hidden px-6 py-4">
      <header>
        <h1 className="font-birthstone text-primary text-center text-7xl leading-12 text-pretty">
          {greeting}
        </h1>
      </header>

      <section className="flex flex-col items-center gap-4">
        <p className="text-pretty md:text-center">{message}</p>
        <p className="text-pretty md:text-center">{ps}</p>
      </section>

      <section className="flex flex-col items-center">
        <Button className="w-full max-w-40" onClick={handleHomeClick}>
          Home
        </Button>
      </section>
    </div>
  )
}

export default Done
