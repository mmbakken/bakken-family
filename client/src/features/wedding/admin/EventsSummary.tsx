import { useAppSelector } from '@/store'
import { getEventSummaries } from '@/features/wedding/selectors'

const EventsSummary = () => {
  const eventSummaries = useAppSelector(getEventSummaries)

  if (eventSummaries == null) {
    return null
  }

  return (
    <div className="w-full">
      <h2 className="pb-4 text-2xl">Summary</h2>

      <div className="flex w-full gap-2">
        <div className="w-36 shrink-0 pb-2 text-sm font-semibold">Event</div>
        <div className="w-10 shrink-0 pb-2 text-sm font-semibold">Total</div>
        <div className="w-10 shrink-0 pb-2 text-sm font-semibold">Yes</div>
        <div className="w-10 shrink-0 pb-2 text-sm font-semibold">No</div>
        <div className="w-10 shrink-0 pb-2 text-sm font-semibold">?</div>
      </div>

      {eventSummaries.map((eventSummary) => {
        return (
          <div key={eventSummary.id} className="flex gap-2">
            <div className="w-36 shrink-0 text-sm">{eventSummary.name}</div>
            <div className="w-10 shrink-0 text-sm">
              {eventSummary.totalCount}
            </div>
            <div className="w-10 shrink-0 text-sm">
              {eventSummary.acceptedCount}
            </div>
            <div className="w-10 shrink-0 text-sm">
              {eventSummary.declinedCount}
            </div>
            <div className="w-10 shrink-0 text-sm">
              {eventSummary.pendingCount}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default EventsSummary
