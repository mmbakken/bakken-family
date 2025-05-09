import { Context } from 'hono'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../../db/schema.ts'

const db = drizzle(Deno.env.get('DATABASE_URL')!, { schema })

// Returns all Events.
export const getEvents = async (c: Context) => {
  const rawEvents = await db.select().from(
    schema.events,
  )

  // Convert ids to strings
  const events = rawEvents.map((event) => {
    return {
      ...event,
      id: `${event.id}`,
    }
  })

  return c.json(events)
}
