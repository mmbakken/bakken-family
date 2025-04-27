import { Context } from 'hono'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../../db/schema.ts'

const db = drizzle(Deno.env.get('DATABASE_URL')!, { schema })

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
