// See Drizzle schema and Hono routes for source of all API response types.
export type UserT = {
  id: string
  username: string
  role: number
  submittedOn: string // timestamp
}

export type GuestT = {
  id: string
  userId: string
  fullName: string
  givenName: string
  allergies: string | null
}

export type RsvpT = {
  id: string
  guestId: string
  eventId: string
  accepted: boolean
  createdOn: string // timestamp
  updatedOn: string // timestamp
}

export type EventT = {
  id: string
  order: number
  name: string
  location: string | null
  description: string | null
  isLodging: boolean
  hasEntree: boolean
  startsAt: Date | null
  endsAt: Date | null
}

// Join type of Invite table and Event table.
export type InviteT = {
  id: string
  guestId: string
  eventId: string
  eventName: string
  eventDescription: string | null
  eventHasEntree: boolean
  eventStartsAt: Date | null
  eventEndsAt: Date | null
}

// RsvpT, but it has extra data from relational tables.
export interface RsvpWithEventAndGuest extends RsvpT {
  guests: {
    id: number
    fullName: string
  }
  events: {
    id: number
    name: string
  }
}
