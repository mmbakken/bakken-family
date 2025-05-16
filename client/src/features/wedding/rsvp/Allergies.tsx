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

  const placeholder =
    'Please let us know about any food allergies, dietary restrictions, or aversions you have.'

  return (
    <div className="pb-2">
      <Textarea
        className="max-h-96 resize-y"
        placeholder={placeholder}
        value={allergies}
        onChange={onChange}
      />
    </div>
  )
}

export default Allergies
