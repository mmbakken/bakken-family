import { ENTREE_OPTIONS } from '@/features/wedding/constants'
import { Button } from '@/components/ui/button'

type EntreeButtonsProps = {
  entree: string | null
  onSelect: (entree: string) => void
}

// UI component. Renders three buttons next to each other. Each is selectable at
// the exclusion of the other (like a radio button group). The status drives
// the styles of both buttons.
const EntreeButtons = ({ entree, onSelect }: EntreeButtonsProps) => {
  // TODO: Improve styles
  const pendingVariant = 'secondary'
  const activeVariant = 'default'
  const inactiveVariant = 'secondary'

  const beefVariant =
    entree == ENTREE_OPTIONS.PENDING
      ? pendingVariant
      : entree === ENTREE_OPTIONS.BEEF
        ? activeVariant
        : inactiveVariant

  const fishVariant =
    entree == ENTREE_OPTIONS.PENDING
      ? pendingVariant
      : entree === ENTREE_OPTIONS.FISH
        ? activeVariant
        : inactiveVariant

  const veganVariant =
    entree == ENTREE_OPTIONS.PENDING
      ? pendingVariant
      : entree === ENTREE_OPTIONS.VEGAN
        ? activeVariant
        : inactiveVariant

  return (
    <div className="flex">
      <Button
        variant={beefVariant}
        onClick={() => onSelect(ENTREE_OPTIONS.BEEF)}
      >
        {ENTREE_OPTIONS.BEEF}
      </Button>
      <Button
        variant={fishVariant}
        onClick={() => onSelect(ENTREE_OPTIONS.FISH)}
      >
        {ENTREE_OPTIONS.FISH}
      </Button>
      <Button
        variant={veganVariant}
        onClick={() => onSelect(ENTREE_OPTIONS.VEGAN)}
      >
        {ENTREE_OPTIONS.VEGAN}
      </Button>
    </div>
  )
}

export default EntreeButtons
