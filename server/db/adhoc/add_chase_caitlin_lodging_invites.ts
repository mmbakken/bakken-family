import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../schema.ts'
import { and, eq, inArray } from 'drizzle-orm/expressions'

console.log('DATABASE_URL env variable:')
console.dir(Deno.env.get('DATABASE_URL'))

const db = drizzle(Deno.env.get('DATABASE_URL')!, { schema })

const addInvites = async () => {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
  console.log('Adding invites for Chase & Caitlin to stay at the lodge:\n')

  // Use user names and ids to link guests to their user
  const chaseAndCaitlinUsers = await db.select().from(
    schema.users,
  ).where(
    eq(schema.users.username, 'Chase & Caitlin'),
  )

  if (chaseAndCaitlinUsers.length === 0) {
    console.error('No users found for Chase & Caitlin! Aborting.')
    return
  }

  const chaseAndCaitlinUser = chaseAndCaitlinUsers[0]

  console.log('Found Chase & Caitlin user:')
  console.dir(chaseAndCaitlinUser)

  // Find guest records for Chase & Caitlin
  // First find Caitlin
  const Caitlin_Stephens_guests = await db.select().from(schema.guests).where(
    and(
      eq(schema.guests.userId, chaseAndCaitlinUser.id),
      eq(schema.guests.fullName, 'Caitlin Stephens'),
    ),
  ).limit(1)

  if (Caitlin_Stephens_guests == null || Caitlin_Stephens_guests.length !== 1) {
    console.error('No guests found for Caitlin Stephens! Aborting.')
    return
  }

  const Caitlin_Stephens = Caitlin_Stephens_guests[0]

  console.log('Found Caitlin Stephens guest:')
  console.dir(Caitlin_Stephens)

  // Then find Chase
  const Chase_Stephens_guests = await db.select().from(schema.guests).where(
    and(
      eq(schema.guests.userId, chaseAndCaitlinUser.id),
      eq(schema.guests.fullName, 'Chase Stephens'),
    ),
  ).limit(1)

  if (Chase_Stephens_guests == null || Chase_Stephens_guests.length !== 1) {
    console.error('No guests found for Chase Stephens! Aborting.')
    return
  }

  const Chase_Stephens = Chase_Stephens_guests[0]

  console.log('Found Chase Stephens guest:')
  console.dir(Chase_Stephens)

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

  // Add an invite for Chase and Caitlin for each event.
  const users = [Chase_Stephens, Caitlin_Stephens]
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
