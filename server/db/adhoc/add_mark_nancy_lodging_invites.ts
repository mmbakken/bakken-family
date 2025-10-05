import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../schema.ts'
import { and, eq, inArray } from 'drizzle-orm/expressions'

console.log('DATABASE_URL env variable:')
console.dir(Deno.env.get('DATABASE_URL'))

const db = drizzle(Deno.env.get('DATABASE_URL')!, { schema })

const addInvites = async () => {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
  console.log('Adding invites for Mark & Nancy to stay at the lodge:\n')

  // Use user names and ids to link guests to their user
  const markAndNancyUsers = await db.select().from(
    schema.users,
  ).where(
    eq(schema.users.username, 'Mark & Nancy'),
  )

  if (markAndNancyUsers.length === 0) {
    console.error('No users found for Mark & Nancy! Aborting.')
    return
  }

  const markAndNancyUser = markAndNancyUsers[0]

  console.log('Found Mark & Nancy user:')
  console.dir(markAndNancyUser)

  // Find guest records for Mark & Nancy
  // First find Nancy
  const Nancy_Lohman_guests = await db.select().from(schema.guests).where(
    and(
      eq(schema.guests.userId, markAndNancyUser.id),
      eq(schema.guests.fullName, 'Nancy Lohman'),
    ),
  ).limit(1)

  if (Nancy_Lohman_guests == null || Nancy_Lohman_guests.length !== 1) {
    console.error('No guests found for Nancy Lohman! Aborting.')
    return
  }

  const Nancy_Lohman = Nancy_Lohman_guests[0]

  console.log('Found Nancy Lohman guest:')
  console.dir(Nancy_Lohman)

  // Then find Mark
  const Mark_Lohman_guests = await db.select().from(schema.guests).where(
    and(
      eq(schema.guests.userId, markAndNancyUser.id),
      eq(schema.guests.fullName, 'Mark Lohman'),
    ),
  ).limit(1)

  if (Mark_Lohman_guests == null || Mark_Lohman_guests.length !== 1) {
    console.error('No guests found for Mark Lohman! Aborting.')
    return
  }

  const Mark_Lohman = Mark_Lohman_guests[0]

  console.log('Found Mark Lohman guest:')
  console.dir(Mark_Lohman)

  // Find lodging events

  const lodgingEventNames = [
    'Thursday Night',
    'Friday Night',
    'Saturday Night',
    'Sunday Night',
  ]

  const lodgingEvents = await db.select().from(
    schema.events,
  ).where(
    inArray(schema.events.name, lodgingEventNames),
  )

  if (lodgingEvents == null || lodgingEvents.length === 0) {
    console.error('No lodging events found! Aborting.')
    return
  }

  console.log('All lodging events:')
  console.dir(lodgingEvents)

  // Create invites for all lodging events for both users.

  // Add an invite for Mark and Nancy for each event.
  const users = [Mark_Lohman, Nancy_Lohman]
  const invites: typeof schema.invites.$inferInsert[] = []
  lodgingEvents.forEach((event) => {
    users.forEach((user) => {
      invites.push({
        guestId: user.id,
        eventId: event.id,
      })
    })
  })

  console.log('Invites to create:')
  console.dir(invites)

  console.log('\n\nAdding all invites:')
  await db.insert(schema.invites).values(invites)
  console.log('  => New invites created!\n')
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`')
}

await addInvites()
Deno.exit(0)
