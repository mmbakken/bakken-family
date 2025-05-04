import { Context } from 'hono'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../../db/schema.ts'
import { eq, inArray } from 'drizzle-orm/expressions'

const db = drizzle(Deno.env.get('DATABASE_URL')!, { schema })

// Returns the RSVPs for the currently logged in user.
export const getRsvps = async (c: Context) => {
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
    return c.json({ rsvps: [] })
  }

  const userGuestIds = userGuests.map((user) => user.id)

  if (userGuestIds == null || userGuestIds.length === 0) {
    return c.json({ rsvps: [] })
  }

  // Get all RSVPs for all of these guests.
  const rsvps = await db.select({
    id: schema.rsvps.id,
    guestId: schema.rsvps.guestId,
    eventId: schema.rsvps.eventId,
  }).from(
    schema.rsvps,
  ).where(inArray(schema.rsvps.guestId, userGuestIds))

  return c.json({
    rsvps: rsvps,
  })
}
