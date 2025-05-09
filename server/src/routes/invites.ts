import { Context } from 'hono'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../../db/schema.ts'
import { eq, inArray } from 'drizzle-orm/expressions'

const db = drizzle(Deno.env.get('DATABASE_URL')!, { schema })

// Returns the guests for the currently logged in user.
export const getInvites = async (c: Context) => {
  const user = c.get('user')

  if (user == null) {
    return c.json({ error: 'User not found.' }, 404)
  }

  // Find all guest ids for this user.
  const userGuests = await db.select({
    id: schema.guests.id,
  }).from(
    schema.guests,
  ).where(eq(schema.guests.userId, user.id))

  if (userGuests == null || userGuests.length === 0) {
    return c.json([])
  }

  const userGuestIds = userGuests.map((guest) => guest.id)

  if (userGuestIds == null || userGuestIds.length === 0) {
    return c.json([])
  }

  // Find all event information for each of the invites for each of the guests
  // for this logged in user.
  const eventsInvites = await db.select().from(schema.events).where(
    inArray(schema.invites.guestId, userGuestIds),
  ).leftJoin(
    schema.invites,
    eq(schema.events.id, schema.invites.eventId),
  )

  // Organize response into a flatter object, and use strings for ids.

  type EventInvite = {
    id: string
    guestId: string
    eventId: string
    eventName: string
    eventDescription: string | null
    eventHasEntree: boolean
    eventStartsAt: Date | null
    eventEndsAt: Date | null
  }

  const invites: EventInvite[] = []
  eventsInvites.forEach((eventInvite) => {
    if (
      eventInvite.invites == null || eventInvite.invites.id == null ||
      eventInvite.invites.guestId == null
    ) {
      return
    }

    invites.push({
      id: `${eventInvite.invites.id}`,
      guestId: `${eventInvite.invites.guestId}`,
      eventId: `${eventInvite.events.id}`,
      eventName: eventInvite.events.name,
      eventDescription: eventInvite.events.description,
      eventHasEntree: eventInvite.events.hasEntree,
      eventStartsAt: eventInvite.events.startsAt,
      eventEndsAt: eventInvite.events.endsAt,
    })
  })

  return c.json(invites)
}
