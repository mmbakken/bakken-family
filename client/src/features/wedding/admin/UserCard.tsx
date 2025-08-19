import { useState } from 'react'
import { format } from 'date-fns'
import { useAppDispatch, useAppSelector } from '@/store'
import { resetUserRsvps } from '@/features/wedding/thunks'
import { getUser } from '@/features/wedding/selectors'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover'

type UserCardProps = {
  userId: string
}

const UserCard = ({ userId }: UserCardProps) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => getUser(state, userId))
  const [showFocus, setShowFocus] = useState(false)

  if (user == null) {
    return null
  }
  const formatCode = 'EEE M/dd/yy - h:mma'
  const lastLoginDate =
    user.lastLogin == null
      ? 'Before Mon 8/18/25'
      : format(user.lastLogin, formatCode)
  const submittedOnDate =
    user.submittedOn == null ? 'Never' : format(user.submittedOn, formatCode)

  const handleResetConfirm = () => {
    dispatch(resetUserRsvps(user.id))
  }

  const handleOpenChange = (open: boolean) => {
    setShowFocus(open)
  }

  const cardStyles = `flex w-full max-w-screen-sm flex-col border rounded-md p-4 transition ${showFocus ? 'border-2 border-primary shadow-md p-[0.9375rem]' : ''}`

  return (
    <div className={cardStyles}>
      <div className="flex items-center justify-between gap-2 pb-4">
        <h2 className="text-xl">{user.username}</h2>
        <div className="flex items-baseline gap-1">
          <span className="text-xs">ID</span>
          <span className="border-primary bg-primary shrink grow-0 rounded-full border px-1.5 py-0.5 text-center text-xs text-neutral-100">
            {user.id}
          </span>
        </div>
      </div>

      <div className="flex w-full flex-wrap gap-4 text-sm md:gap-8">
        <div className="flex flex-col">
          <div className="pb-2 font-semibold">Last Login</div>
          <div className="">{lastLoginDate}</div>
        </div>

        <div className="flex flex-col">
          <div className="pb-2 font-semibold">Submitted On</div>
          <div className="">{submittedOnDate}</div>
        </div>

        <div className="w-full shrink-0 self-end md:w-auto">
          <Popover onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
              <Button variant="outline">Reset RSVPs</Button>
            </PopoverTrigger>

            <PopoverContent>
              <div className="flex flex-col items-center gap-6">
                <h1 className="w-full text-center text-lg font-semibold">
                  Are you sure?
                </h1>

                <p className="text-center">
                  This will delete their RSVPs and remove their{' '}
                  <code>submittedOn</code> timestamp. Any allergies added during
                  the RSVP process will not be impacted.
                </p>

                <div className="flex w-full flex-col items-center gap-4">
                  <PopoverClose asChild>
                    <Button
                      variant="destructive"
                      className="w-auto"
                      onClick={handleResetConfirm}
                    >
                      Reset {user.username}'s RSVPs
                    </Button>
                  </PopoverClose>

                  <PopoverClose asChild>
                    <Button variant="secondary" className="w-2/5">
                      Cancel
                    </Button>
                  </PopoverClose>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}

export default UserCard
