import { useAppSelector } from '@/store'
import { getEventSummaries } from '@/features/wedding/selectors'

const EventsSummary = () => {
  const eventSummaries = useAppSelector(getEventSummaries)

  if (eventSummaries == null) {
    return null
  }

  return (
    <div className="w-full">
      <h2 className="pb-4 text-2xl">Events Summary</h2>

      <div className="flex w-full gap-2">
        <div className="w-48 shrink-0 pb-2 font-semibold">Event</div>
        <div className="w-24 shrink-0 pb-2 font-semibold">Accepted</div>
        <div className="w-24 shrink-0 pb-2 font-semibold">Declined</div>
        <div className="w-24 shrink-0 pb-2 font-semibold">Pending</div>
      </div>

      {eventSummaries.map((eventSummary) => {
        return (
          <div key={eventSummary.id} className="flex gap-2">
            <div className="w-48 shrink-0">{eventSummary.name}</div>
            <div className="w-24 shrink-0">{eventSummary.acceptedCount}</div>
            <div className="w-24 shrink-0">{eventSummary.declinedCount}</div>
            <div className="w-24 shrink-0">{eventSummary.pendingCount}</div>
          </div>
        )
      })}
    </div>
  )
}

export default EventsSummary
