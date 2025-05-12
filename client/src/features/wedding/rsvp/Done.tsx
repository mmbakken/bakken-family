import { useNavigate } from '@tanstack/react-router'
import { useAppSelector } from '@/store'
import { useTitle } from '@/hooks'
import { getIsComing } from '@/features/wedding/selectors'
import { Button } from '@/components/ui/button'

const Done = () => {
  useTitle('Wedding - RSVP - Done')
  const navigate = useNavigate()
  const isComing = useAppSelector(getIsComing)

  const greeting = isComing
    ? "We're so glad you can make it!"
    : "We're sorry you can't make it :("

  const handleHomeClick = () => {
    navigate({ to: '/wedding' })
  }

  return (
    <div className="flex min-h-screen w-screen flex-col gap-6 overflow-hidden px-6 py-4">
      <header className="flex items-center justify-between gap-2">
        <h1 className="text-primary text-center text-5xl leading-16 text-pretty">
          {greeting}
        </h1>
      </header>

      {isComing && (
        <section className="flex flex-col gap-4">
          <p>
            We'll see you there! In the meantime, swipe around our wedding
            website and see if you find something you like.
          </p>
          <Button className="max-w-40" onClick={handleHomeClick}>
            Home
          </Button>
        </section>
      )}

      {!isComing && (
        <section className="flex flex-col gap-4">
          <p>You can still look around our wedding website if you'd like to.</p>
          <Button className="max-w-40" onClick={handleHomeClick}>
            Home
          </Button>
        </section>
      )}
    </div>
  )
}

export default Done
