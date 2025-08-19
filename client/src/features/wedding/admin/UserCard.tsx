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

  const lastLoginDateUTC =
    user.lastLogin == null
      ? 'Never'
      : format(user.lastLogin, 'EEEE, MMMM dd, yyyy HH:mm')
  const submittedOnDateUTC =
    user.submittedOn == null
      ? 'Never'
      : format(user.submittedOn, 'EEEE, MMMM dd, yyyy HH:mm')

  const handleResetConfirm = () => {
    dispatch(resetUserRsvps(user.id))
  }

  const handleOpenChange = (open: boolean) => {
    setShowFocus(open)
  }

  const cardStyles = `flex w-full flex-col border rounded-md p-4 transition ${showFocus ? 'border-2 border-primary shadow-md p-[0.9375rem]' : ''}`

  return (
    <div className={cardStyles}>
      <h2 className="pb-4 text-xl">{user.username}</h2>

      <div>
        <div className="flex w-full gap-2">
          <div className="w-16 shrink-0 pb-2 font-semibold">ID</div>
          <div className="w-16 shrink-0 pb-2 font-semibold">Role</div>
          <div className="w-48 shrink-0 pb-2 font-semibold">Last Login</div>
          <div className="w-48 shrink-0 pb-2 font-semibold">Submitted On</div>
          <div className="w-48 shrink-0 pb-2 font-semibold">Actions</div>
        </div>

        <div className="flex w-full gap-2">
          <div className="w-16 shrink-0">{user.id}</div>
          <div className="w-16 shrink-0">{user.role}</div>

          {/* TODO: Add local time zone formatting */}
          <div className="w-48 shrink-0">{lastLoginDateUTC}</div>
          <div className="w-48 shrink-0">{submittedOnDateUTC}</div>

          <div className="w-48 shrink-0">
            <Popover onOpenChange={handleOpenChange}>
              <PopoverTrigger asChild>
                <Button variant="outline">Reset User</Button>
              </PopoverTrigger>

              <PopoverContent>
                <div className="flex flex-col items-center gap-6">
                  <h1 className="w-full text-center text-lg font-semibold">
                    Are you sure?
                  </h1>

                  <p className="text-center">
                    This will delete their RSVPs and remove their{' '}
                    <code>submittedOn</code> timestamp. Any allergies added
                    during the RSVP process will not be impacted.
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
    </div>
  )
}

export default UserCard
