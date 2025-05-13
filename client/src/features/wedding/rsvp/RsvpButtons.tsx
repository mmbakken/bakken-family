import { ATTENDING_STATUS } from '@/features/wedding/constants'
import { Button } from '@/components/ui/button'

type RsvpButtonsProps = {
  accepted: number // -1, -0, or 1
  onSelect: (attending: boolean) => void
}

// UI component. Renders two buttons next to each other. Each is selectable
// at the exclusion of the other (like a radio button group). The status
// drives the styles of both buttons.
const RsvpButtons = ({ accepted, onSelect }: RsvpButtonsProps) => {
  // TODO: Improve styles
  const pendingVariant = 'secondary'
  const activeVariant = 'default'
  const inactiveVariant = 'secondary'

  const attendingVariant =
    accepted == ATTENDING_STATUS.PENDING
      ? pendingVariant
      : accepted === ATTENDING_STATUS.ACCEPTED
        ? activeVariant
        : inactiveVariant
  const notAttendingVariant =
    accepted == ATTENDING_STATUS.PENDING
      ? pendingVariant
      : accepted === ATTENDING_STATUS.DECLINED
        ? activeVariant
        : inactiveVariant

  return (
    <div className="flex gap-1">
      <Button variant={attendingVariant} onClick={() => onSelect(true)}>
        Attending
      </Button>
      <Button variant={notAttendingVariant} onClick={() => onSelect(false)}>
        Not Attending
      </Button>
    </div>
  )
}

export default RsvpButtons
