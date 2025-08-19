import { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../../db/schema.ts'
import { eq, inArray } from 'drizzle-orm/expressions'

const db = drizzle(Deno.env.get('DATABASE_URL')!, { schema })

// Returns the Admin Page data.
// This is a summary amount of data for the whole app.
export const getAdmin = async (c: Context) => {
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

  const rawUsers = await db.select().from(
    schema.users,
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

  const invites = rawInvites.map((invite) => {
    return {
      ...invite,
      id: `${invite.id}`,
      guestId: `${invite.guestId}`,
      eventId: `${invite.eventId}`,
    }
  })

  const users = rawUsers.map((user) => {
    return {
      id: `${user.id}`,
      username: user.username,
      role: user.role,
      lastLogin: user.lastLogin,
      submittedOn: user.submittedOn,
    }
  })

  return c.json({
    rsvps,
    events,
    guests,
    invites,
    users,
  })
}

export const resetUserRsvps = async (c: Context) => {
  const userId = c.req.param('userId')

  if (userId == null) {
    throw new HTTPException(422, { message: 'Must provide userId param' })
  }

  // Validate that user exists.
  const user = await db.select({
    id: schema.users.id,
  }).from(
    schema.users,
  ).where(eq(schema.users.id, Number(userId)))

  if (user == null) {
    throw new HTTPException(422, { message: 'User not found' })
  }

  const userGuests = await db.select({
    id: schema.guests.id,
    userId: schema.guests.userId,
  }).from(
    schema.guests,
  ).where(eq(schema.guests.userId, Number(userId)))

  if (userGuests == null || userGuests.length === 0) {
    throw new HTTPException(422, { message: 'User has no guests.' })
  }

  const guestIds = userGuests.map((g) => g.id)

  console.log(
    `Deleting RSVPs for this userId "${userId}" and these guest ids: "${guestIds}"`,
  )

  // Delete RSVPs for this user.
  const deletedRsvps = await db.delete(schema.rsvps).where(inArray(
    schema.rsvps.guestId,
    guestIds,
  )).returning({ deletedId: schema.rsvps.id })

  const deletedRsvpIds = deletedRsvps.map((r) => `${r.deletedId}`)

  console.log('Deleted these RSVPs:')
  console.dir(deletedRsvpIds)

  // Update the user.submittedOn timestamp
  const updatedUsers = await db.update(schema.users).set({
    submittedOn: null,
  }).where(
    eq(schema.users.id, Number(userId)),
  ).returning({
    id: schema.users.id,
    role: schema.users.role,
    username: schema.users.username,
    lastLogin: schema.users.lastLogin,
    submittedOn: schema.users.submittedOn,
  })

  const updatedUser = {
    ...updatedUsers[0],
    id: `${updatedUsers[0].id}`,
  }

  return c.json({
    deletedRsvpIds,
    updatedUser,
  })
}
