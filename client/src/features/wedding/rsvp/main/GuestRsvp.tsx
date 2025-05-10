import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { upsertRsvp, updateRsvp, updateGuest } from '@/features/wedding/slice'
import {
  getGuestsById,
  getRsvpByEventIdAndGuestId,
  getHasEntree,
} from '@/features/wedding/selectors'
import { RsvpButtons } from '@/features/wedding/rsvp'
import { ATTENDING_STATUS, ENTREE_OPTIONS } from '@/features/wedding/constants'
import EntreeButtons from './EntreeButtons'
import Allergies from './Allergies'
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
  const [entree, setEntree] = useState(() => {
    if (rsvp == null) {
      return ENTREE_OPTIONS.PENDING
    }

    return rsvp.entree == null ? ENTREE_OPTIONS.PENDING : rsvp.entree
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

    setEntree((entree) => {
      if (rsvp == null) {
        return entree
      }

      return rsvp.entree == null ? ENTREE_OPTIONS.PENDING : rsvp.entree
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

  // Update the existing Rsvp when the user selects an entree.
  const onEntreeSelect = (entree: string) => {
    setEntree(entree)

    dispatch(
      updateRsvp({
        id: rsvp?.id,
        entree: entree,
      }),
    )
  }

  // Update the existing Guest when the user edits their allergies.
  const onAllergiesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAllergies(event.currentTarget.value)
    debouncededUpdateGuest()
  }

  return (
    <div>
      <p>{guest.fullName}</p>

      <RsvpButtons accepted={accepted} onSelect={onAttendingSelect} />

      {showFoodOptions && (
        <div>
          <EntreeButtons entree={entree} onSelect={onEntreeSelect} />
          <Allergies allergies={allergies} onChange={onAllergiesChange} />
        </div>
      )}
    </div>
  )
}

export default GuestRsvp
