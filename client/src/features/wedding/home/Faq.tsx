import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

type FaqProps = {
  question: string
  answer?: string | string[]
  children?: React.ReactNode
}

// A component to display a question and answer pair. You can provide either a
// text answer, or a list of answers to display in a list, or your own custom
// JSX to display in the answer area, via the children prop.
const Faq = ({ question, answer, children }: FaqProps) => {
  const [isOpen, setIsOpen] = useState(false)

  // Should we list out bullet points, just text, or the children?
  const showText = !Array.isArray(answer) && typeof answer === 'string'
  const showBullets = !showText && Array.isArray(answer)
  const showChildren = !showText && !showBullets

  const handleClick = () => {
    setIsOpen((open) => !open)
  }

  let iconClasses = 'transition duration-250'
  iconClasses += isOpen ? ' -rotate-180' : ''

  return (
    <Collapsible className="w-full bg-neutral-100">
      <CollapsibleTrigger
        className="flex w-full cursor-pointer justify-between gap-2 px-4 py-2 md:py-4"
        onClick={handleClick}
      >
        <span className="text-primary text-left font-semibold">{question}</span>
        <span className="flex shrink-0 flex-col items-center justify-center">
          <ChevronDown className={iconClasses} />
        </span>
      </CollapsibleTrigger>

      <CollapsibleContent className="px-4 pb-4">
        {showText && <span>{answer}</span>}

        {showBullets && (
          <ul className="flex flex-col gap-2">
            {answer.map((answer) => {
              return <li key={answer}>{answer}</li>
            })}
          </ul>
        )}

        {showChildren && children}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default Faq
