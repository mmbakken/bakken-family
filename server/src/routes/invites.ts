import { Context } from 'hono'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../../db/schema.ts'
import { eq, inArray } from 'drizzle-orm/expressions'

const db = drizzle(Deno.env.get('DATABASE_URL')!, { schema })

// Returns the guests for the currently logged in user.
export const getInvites = async (c: Context) => {
  const user = c.get('user')

  if (user == null) {
    return c.json({ error: 'User not found' }, 404)
  }

  // Find all guest ids for this user.
  const userGuests = await db.select({
    id: schema.guests.id,
  }).from(
    schema.guests,
  ).where(eq(schema.guests.userId, user.id))

  if (userGuests == null || userGuests.length === 0) {
    return c.json({ invites: [] })
  }

  const userGuestIds = userGuests.map((user) => user.id)

  if (userGuestIds == null || userGuestIds.length === 0) {
    return c.json({ invites: [] })
  }

  // Find all event information for each of the invites for each of the guests
  // for this logged in user.
  const invites = await db.select().from(schema.events).where(
    inArray(schema.invites.guestId, userGuestIds),
  ).leftJoin(
    schema.invites,
    eq(schema.events.id, schema.invites.eventId),
  )

  return c.json({
    invites: invites,
  })
}
