import { Context } from 'hono'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../../db/schema.ts'
import { eq } from 'drizzle-orm/expressions'

const db = drizzle(Deno.env.get('DATABASE_URL')!, { schema })

export const getUser = (c: Context) => {
  return c.json(c.get('user'))
}

export const getUsers = async (c: Context) => {
  const allUsers = await db.select({
    username: schema.users.username,
    role: schema.users.role,
  }).from(
    schema.users,
  )

  return c.json({
    users: allUsers,
  })
}

// Finalizes the state of all existing Rsvps. Basically this just sets a field
// on the user model to say "don't let more updates happen".
export const submitRsvps = async (c: Context) => {
  const user = c.get('user')

  if (user == null) {
    return c.json({ error: 'User not found.' }, 404)
  }

  // Finally, set the user's submittedOn timestamp
  const updatedUsers = await db.update(schema.users).set({
    submittedOn: new Date(),
  }).where(
    eq(schema.users.id, user.id),
  ).returning()

  const updatedUser = updatedUsers[0]

  console.log('updatedUser:')
  console.dir(updatedUser)

  return c.json(updatedUser)
}
