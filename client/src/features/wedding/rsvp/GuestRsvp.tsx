import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { upsertRsvp, updateGuest } from '@/features/wedding/thunks'
import {
  getGuestsById,
  getRsvpByEventIdAndGuestId,
  getHasEntree,
} from '@/features/wedding/selectors'
import { RsvpButtons } from '@/features/wedding/rsvp'
import { ATTENDING_STATUS } from '@/features/wedding/constants'
import Allergies from '@/features/wedding/rsvp/Allergies'
import { useDebounce } from '@/hooks'
import type { ChangeEvent } from 'react'

type GuestRsvpProps = {
  id: string
  eventId: string
}

const GuestRsvp = ({ id, eventId }: GuestRsvpProps) => {
  const dispatch = useAppDispatch()
  const guestsById = useAppSelector(getGuestsById)
  const guest = guestsById[id]
  const rsvp = useAppSelector((state) =>
    getRsvpByEventIdAndGuestId(state, eventId, id),
  )
  const hasEntree = useAppSelector((state) => getHasEntree(state, eventId))

  //======================================
  // Form state (local + Redux)
  //======================================

  // Prefer API state, but use local state as fallback.
  const [accepted, setAccepted] = useState(() => {
    if (rsvp == null) {
      return ATTENDING_STATUS.PENDING
    }

    return rsvp.accepted ? ATTENDING_STATUS.ACCEPTED : ATTENDING_STATUS.DECLINED
  })

  // Prefer API state, but use local state as fallback.
  const [allergies, setAllergies] = useState(() => {
    if (guest == null) {
      return ''
    }

    return guest.allergies == null ? '' : guest.allergies
  })

  // Allow Redux Rsvp status to update the local state when it changes.
  useEffect(() => {
    setAccepted((accepted) => {
      if (rsvp == null) {
        return accepted
      }

      return rsvp.accepted
        ? ATTENDING_STATUS.ACCEPTED
        : ATTENDING_STATUS.DECLINED
    })

    // NOTE: Do not update the allergies here - just fire and forget.
  }, [rsvp])

  const debouncededUpdateGuest = useDebounce(() => {
    dispatch(
      updateGuest({
        allergies: allergies,
        id: id,
      }),
    )
  })

  //======================================
  // Derived state
  //======================================

  const showFoodOptions = hasEntree && accepted === ATTENDING_STATUS.ACCEPTED

  //======================================
  // Event handlers
  //======================================

  // When the user makes a decision on an invite, they are creating an Rsvp.
  const onAttendingSelect = (attending: boolean) => {
    // Update the local state immediately while waiting for update from API.
    setAccepted(
      attending ? ATTENDING_STATUS.ACCEPTED : ATTENDING_STATUS.DECLINED,
    )

    dispatch(
      upsertRsvp({
        accepted: attending,
        eventId: eventId,
        guestId: id,
      }),
    )
  }

  // Update the existing Guest when the user edits their allergies.
  const onAllergiesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAllergies(event.currentTarget.value)
    debouncededUpdateGuest()
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-2">
        <h3 className="grow-1 text-xl">{guest.fullName}</h3>
        <RsvpButtons accepted={accepted} onSelect={onAttendingSelect} />
      </div>

      {showFoodOptions && (
        <div className="flex w-full flex-col gap-1">
          <h3>Dietary Restrictions</h3>
          <Allergies allergies={allergies} onChange={onAllergiesChange} />
        </div>
      )}
    </div>
  )
}

export default GuestRsvp
