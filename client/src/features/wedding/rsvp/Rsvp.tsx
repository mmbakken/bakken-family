import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store'
import { useTitle } from '@/hooks'
import { STEPS } from '@/features/wedding/constants'
import { fetchRsvpData } from '@/features/wedding/thunks'
import { getHasLoadedRsvpData, getRsvpStep } from '@/features/wedding/selectors'
import { Entry, Main, Lodging, Done, Declined } from '@/features/wedding/rsvp'
import { LoaderIcon } from 'lucide-react'

const Rsvp = () => {
  useTitle('Wedding - RSVP')

  // Fetch all necessary data for the RSVP process right away.
  const dispatch = useAppDispatch()

  const hasLoadedRsvpData = useAppSelector(getHasLoadedRsvpData)
  const step = useAppSelector(getRsvpStep)

  useEffect(() => {
    if (fetchRsvpData && !hasLoadedRsvpData) {
      dispatch(fetchRsvpData())
    }
  }, [dispatch, hasLoadedRsvpData])

  if (!hasLoadedRsvpData) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <LoaderIcon className="animate spin" />
      </div>
    )
  }

  switch (step) {
    case STEPS.ENTRY: {
      return <Entry />
    }
    case STEPS.DECLINED: {
      return <Declined />
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
    default: {
      return null
    }
  }
}

export default Rsvp
