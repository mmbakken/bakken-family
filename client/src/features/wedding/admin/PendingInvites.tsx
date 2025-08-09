import { useAppSelector } from '@/store'
import { getPendingInvites } from '@/features/wedding/selectors'

const PendingInvites = () => {
  const pendingInvites = useAppSelector(getPendingInvites)

  if (pendingInvites == null) {
    return null
  }

  return (
    <div className="w-full">
      <h2 className="pb-4 text-2xl">Pending Invites</h2>

      <div className="flex w-full gap-2">
        <div className="w-48 shrink-0 font-semibold">Name</div>
        <div className="w-48 shrink-0 font-semibold">Event</div>
      </div>

      {pendingInvites.map((invite) => {
        return (
          <div key={invite.id} className="flex gap-2">
            <div className="w-48 shrink-0">{invite.guests.fullName}</div>
            <div className="w-48 shrink-0">{invite.events.name}</div>
          </div>
        )
      })}
    </div>
  )
}

export default PendingInvites
