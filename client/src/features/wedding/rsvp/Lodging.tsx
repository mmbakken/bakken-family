import { useAppDispatch } from '@/store'
import { useTitle } from '@/hooks'
import { clickedBack, clickedNext } from '../slice'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Lodging = () => {
  useTitle('Wedding - RSVP - Lodging')

  const dispatch = useAppDispatch()

  const handleBackClick = () => {
    dispatch(clickedBack())
  }

  const handleNextClick = () => {
    dispatch(clickedNext())
  }

  return (
    <div className="flex min-h-screen w-screen flex-col gap-6 overflow-hidden px-6 py-4">
      <header className="flex items-center justify-between gap-2">
        <Button size="icon" onClick={handleBackClick}>
          <ChevronLeft />
        </Button>
        <h1 className="text-primary text-center text-5xl leading-16">
          Lodging
        </h1>
        <Button size="icon" disabled onClick={handleNextClick}>
          <ChevronRight />
        </Button>
      </header>
    </div>
  )
}

export default Lodging
