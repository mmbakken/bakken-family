import { Context } from 'hono'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../../db/schema.ts'
import { and, eq, inArray } from 'drizzle-orm/expressions'

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
    return c.json([])
  }

  const userGuestIds = userGuests.map((user) => user.id)

  if (userGuestIds == null || userGuestIds.length === 0) {
    return c.json([])
  }

  // Get all RSVPs for all of these guests.
  const rawRsvps = await db.select().from(
    schema.rsvps,
  ).where(inArray(schema.rsvps.guestId, userGuestIds))

  // Convert ids to strings
  const rsvps = rawRsvps.map((rsvp) => {
    return {
      ...rsvp,
      id: `${rsvp.id}`,
      guestId: `${rsvp.guestId}`,
      eventId: `${rsvp.eventId}`,
    }
  })

  return c.json(rsvps)
}

// Adds OR updates the RSVP matching the event id and guest id params.
export const upsertRsvp = async (c: Context) => {
  const user = c.get('user')

  if (user == null) {
    return c.json({ error: 'User not found.' }, 404)
  }

  const body = await c.req.json()
  const guestId = Number(body.guestId)
  const eventId = Number(body.eventId)
  const accepted = Boolean(body.accepted)

  if (
    guestId == null ||
    eventId == null ||
    accepted == null
  ) {
    return c.json({ error: 'Missing params' }, 422)
  }

  // First, see if there's already a record with an eventId and guestId.
  // Note: This would be simpler to do with a combined primary key and "upsert"
  // type of query, but alas, I'm bad at SQL and it's late.
  const foundRsvp = await db.select().from(schema.rsvps).where(
    and(
      eq(schema.rsvps.guestId, guestId),
      eq(schema.rsvps.eventId, eventId),
    ),
  )

  console.log('foundRsvp:')
  console.dir(foundRsvp)

  // If found, update this RSVP with the new attending status.
  if (foundRsvp && foundRsvp.length) {
    const updatedRsvps = await db.update(schema.rsvps).set({
      accepted: accepted,
      updatedOn: new Date(),
    }).where(
      and(
        eq(schema.rsvps.guestId, guestId),
        eq(schema.rsvps.eventId, eventId),
      ),
    ).returning()

    const updatedRsvp = updatedRsvps[0]

    console.log('updatedRsvp:')
    console.dir(updatedRsvp)

    // Convert ids to strings
    return c.json({
      ...updatedRsvp,
      id: `${updatedRsvp.id}`,
      guestId: `${updatedRsvp.guestId}`,
      eventId: `${updatedRsvp.eventId}`,
    })
  }

  // Otherwise, if no RSVP is found to update, just add a new one.
  const newRsvps = await db.insert(schema.rsvps).values({
    guestId,
    eventId,
    accepted,
  }).returning()

  const newRsvp = newRsvps[0]

  console.log('newRsvp')
  console.dir(newRsvp)

  // Convert ids to strings
  return c.json({
    ...newRsvp,
    id: `${newRsvp.id}`,
    guestId: `${newRsvp.guestId}`,
    eventId: `${newRsvp.eventId}`,
  })
}

// Updates an existing RSVP id params.
// NOTE: Only allow updating the entree field this way.
export const updateRsvp = async (c: Context) => {
  const user = c.get('user')

  if (user == null) {
    return c.json({ error: 'User not found.' }, 404)
  }

  const body = await c.req.json()
  const id = Number(body.id)
  const entree = body.entree ? String(body.entree) : null

  if (
    id == null ||
    entree == null
  ) {
    return c.json({ error: 'Missing params' }, 422)
  }

  const updatedRsvps = await db.update(schema.rsvps).set({
    entree: entree,
    updatedOn: new Date(),
  }).where(
    eq(schema.rsvps.id, id),
  ).returning()

  const updatedRsvp = updatedRsvps[0]

  console.log('updatedRsvp:')
  console.dir(updatedRsvp)

  // Convert ids to strings
  return c.json({
    ...updatedRsvp,
    id: `${updatedRsvp.id}`,
    guestId: `${updatedRsvp.guestId}`,
    eventId: `${updatedRsvp.eventId}`,
  })
}
