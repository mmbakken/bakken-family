import { Context } from 'hono'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../../db/schema.ts'
import { and, eq } from 'drizzle-orm/expressions'

const db = drizzle(Deno.env.get('DATABASE_URL')!, { schema })

// Returns the guests for the currently logged in user.
export const getGuests = async (c: Context) => {
  const user = c.get('user')

  if (user == null) {
    return c.json({ error: 'User not found.' }, 404)
  }

  const userGuests = await db.select({
    id: schema.guests.id,
    userId: schema.guests.userId,
    fullName: schema.guests.fullName,
    givenName: schema.guests.givenName,
    allergies: schema.guests.allergies,
  }).from(
    schema.guests,
  ).where(eq(schema.guests.userId, user.id))

  // Convert ids to strings
  const guests = userGuests.map((guest) => {
    return {
      ...guest,
      id: `${guest.id}`,
      userId: `${guest.userId}`,
    }
  })

  return c.json(guests)
}

// Allow the user to update their guests' allergies.
export const updateGuest = async (c: Context) => {
  const user = c.get('user')

  if (user == null) {
    return c.json({ error: 'User not found.' }, 404)
  }

  // The user can only update their guests.
  const body = await c.req.json()
  const id = Number(body.id)
  const allergies = String(body.allergies)

  if (
    id == null || allergies == null
  ) {
    return c.json({ error: 'Missing params' }, 422)
  }

  const updatedGuests = await db.update(schema.guests).set({
    allergies: allergies,
    updatedOn: new Date(),
  }).where(
    and(
      eq(schema.guests.id, id),
      eq(schema.guests.userId, user.id),
    ),
  ).returning()

  const updatedGuest = updatedGuests[0]

  console.log('updatedGuest:')
  console.dir(updatedGuest)

  // Convert ids to strings
  return c.json({
    ...updatedGuest,
    id: `${updatedGuest.id}`,
    userId: `${updatedGuest.userId}`,
  })
}
