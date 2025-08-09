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

  const rawGuests = await db.select().from(
    schema.guests,
  )

  // const rawInvites = await db.select().from(
  //   schema.invites,
  // )

  // Get all Invites for all guests.
  const rawInvites = await db.query.invites.findMany({
    columns: {
      id: true,
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

  // Convert ids to strings
  const rsvps = rawRsvps.map((rsvp) => {
    return {
      ...rsvp,
      id: `${rsvp.id}`,
      guestId: `${rsvp.guestId}`,
      eventId: `${rsvp.eventId}`,
    }
  })

  const events = rawEvents.map((event) => {
    return {
      ...event,
      id: `${event.id}`,
    }
  })

  const guests = rawGuests.map((guest) => {
    return {
      ...guest,
      id: `${guest.id}`,
      userId: `${guest.userId}`,
    }
  })

  // Convert ids to strings
  const invites = rawInvites.map((invite) => {
    return {
      ...invite,
      id: `${invite.id}`,
      guestId: `${invite.guestId}`,
      eventId: `${invite.eventId}`,
    }
  })

  return c.json({
    rsvps,
    events,
    guests,
    invites,
  })
}
