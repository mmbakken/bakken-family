import { useAppSelector } from '@/store'
import { getAllUserIds } from '@/features/wedding/selectors'
import UserCard from './UserCard'

const Users = () => {
  const userIds = useAppSelector(getAllUserIds)

  if (userIds == null) {
    return null
  }

  return (
    <div className="w-full">
      <h2 className="pb-4 text-2xl">Users</h2>

      <div className="flex flex-col gap-2">
        {userIds.map((userId) => {
          return <UserCard key={userId} userId={userId} />
        })}
      </div>
    </div>
  )
}

export default Users
