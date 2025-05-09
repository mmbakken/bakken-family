import { useTitle } from '@/hooks'
import { STEPS } from '@/features/wedding/constants'
import { getIsLoadingRsvpData, getRsvpStep } from '@/features/wedding/slice'
import {
  useGetGuestsQuery,
  useGetRsvpsQuery,
  useGetEventsQuery,
  useGetInvitesQuery,
} from '@/services/api'
import { Entry, Main, Lodging, Done, Declined } from '@/features/wedding/rsvp'
import { useAppSelector } from '@/store'
import { LoaderIcon } from 'lucide-react'

const Rsvp = () => {
  useTitle('Wedding - RSVP')

  // Fetch all necessary data for the RSVP process right away.
  useGetGuestsQuery()
  useGetRsvpsQuery()
  useGetEventsQuery()
  useGetInvitesQuery()

  // const isLoadingRsvpData = useAppSelector(getIsLoadingRsvpData)
  const step = useAppSelector(getRsvpStep)

  // if (isLoadingRsvpData) {
  //   return (
  //     <div className="flex h-screen w-screen items-center justify-center">
  //       <LoaderIcon className="animate spin" />
  //     </div>
  //   )
  // }

  switch (step) {
    case STEPS.ENTRY: {
      return <Entry />
    }

    case STEPS.MAIN: {
      return <Main />
    }

    case STEPS.LODGING: {
      return <Lodging />
    }

    case STEPS.DONE: {
      return <Done />
    }

    case STEPS.DECLINED: {
      return <Declined />
    }

    default: {
      return null
    }
  }
}

export default Rsvp
