import { Textarea } from '@/components/ui/textarea'
import type { ChangeEventHandler } from 'react'

type AllergiesProps = {
  allergies: string | null
  onChange: ChangeEventHandler<HTMLTextAreaElement>
}

const Allergies = ({ allergies, onChange }: AllergiesProps) => {
  if (allergies == null) {
    return null
  }

  return (
    <div>
      <Textarea value={allergies} onChange={onChange} />
    </div>
  )
}

export default Allergies
