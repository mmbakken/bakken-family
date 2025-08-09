import { useAppSelector } from '@/store'
import { getGuestAllergies } from '@/features/wedding/selectors'

const GuestAllergies = () => {
  const guestAllergies = useAppSelector(getGuestAllergies)

  if (guestAllergies == null) {
    return null
  }

  return (
    <div className="w-full pb-4">
      <h2 className="pb-4 text-2xl">Guest Allergies</h2>

      <div className="flex w-full gap-2">
        <div className="w-48 shrink-0 font-semibold">Name</div>
        <div className="w-48 shrink-0 font-semibold">Allergy</div>
      </div>

      {guestAllergies.map((guestAllergy) => {
        return (
          <div key={guestAllergy.id} className="flex gap-2">
            <div className="w-48 shrink-0">{guestAllergy.fullName}</div>
            <div className="w-48 shrink-0">{guestAllergy.allergies}</div>
          </div>
        )
      })}
    </div>
  )
}

export default GuestAllergies
