import { Context } from 'hono'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../../db/schema.ts'
import { and, eq, inArray, notInArray } from 'drizzle-orm/expressions'

const db = drizzle(Deno.env.get('DATABASE_URL')!, { schema })

// Returns the Admin Page data.
//
// This is a summary amount of data for the whole app:
// - Current user's data
// - All RSVP data
// - All Guest data
// - All Invite data
export const getAdmin = async (c: Context) => {
  // const rawRsvps = await db.select().from(
  //   schema.rsvps,
  // )

  // Get all RSVPs for all guests.
  const rawRsvps = await db.query.rsvps.findMany({
    columns: {
      id: true,
      accepted: true,
      guestId: true,
      eventId: true,
    },
    with: {
      guests: {
        columns: {
          id: true,
          fullName: true,
        },
      },
      events: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  })

  const rawEvents = await db.select().from(
    schema.events,
  )

  // Convert ids to strings
  const rsvps = rawRsvps.map((rsvp) => {
    return {
      ...rsvp,
      id: `${rsvp.id}`,
      guestId: `${rsvp.guestId}`,
      eventId: `${rsvp.eventId}`,
    }
  })

  // Convert ids to strings
  const events = rawEvents.map((event) => {
    return {
      ...event,
      id: `${event.id}`,
    }
  })

  return c.json({
    rsvps,
    events,
  })
}
