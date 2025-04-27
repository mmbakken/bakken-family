import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema.ts'
import { seedUsers } from './seed_users.ts'

const db = drizzle(Deno.env.get('DATABASE_URL')!, { schema })

const seed = async () => {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`')
  console.log('Seeding database:\n')

  if (seedUsers == null) {
    console.error('Unable to find seedUsers script. Aborting.')
    return
  }

  console.log('Deleting all rsvps...')
  await db.delete(schema.rsvps)
  console.log('  => Done\n')

  console.log('Deleting all invites...')
  await db.delete(schema.invites)
  console.log('  => Done\n')

  console.log('Deleting all guests...')
  await db.delete(schema.guests)
  console.log('  => Done\n')

  console.log('Deleting all events...')
  await db.delete(schema.events)
  console.log('  => Done\n')

  // Create users
  await seedUsers()

  // Use user names and ids to link guests to their user
  const allUsers = await db.select().from(
    schema.users,
  )

  if (allUsers.length === 0) {
    console.error('No users found! Aborting.')
    return
  }

  // Organize the users by name so they're easier to look up when adding guests.
  const usersByName = allUsers.reduce((usersByName, user) => {
    usersByName[user.username] = user
    return usersByName
  }, {} as { [userId: string]: typeof schema.users.$inferSelect })

  // Create guests

  const Matt_Bakken = {
    fullName: 'Matt Bakken',
    givenName: 'Matt',
    userId: usersByName['Matt & Hilary'].id,
  }
  const Hilary_Lohman = {
    fullName: 'Hilary Lohman',
    givenName: 'Hilary',
    userId: usersByName['Matt & Hilary'].id,
  }
  const Mark_Lohman = {
    fullName: 'Mark Lohman',
    givenName: 'Mark',
    userId: usersByName['Mark & Nancy'].id,
  }
  const Nancy_Lohman = {
    fullName: 'Nancy Lohman',
    givenName: 'Nancy',
    userId: usersByName['Mark & Nancy'].id,
  }
  const Ashli_Rupe = {
    fullName: 'Ashli Rupe',
    givenName: 'Ashli',
    userId: usersByName['Ashli & Dave'].id,
  }
  const David_Rupe = {
    fullName: 'David Rupe',
    givenName: 'Dave',
    userId: usersByName['Ashli & Dave'].id,
  }
  const Henry_Rupe = {
    fullName: 'Henry Rupe',
    givenName: 'Henry',
    userId: usersByName['Ashli & Dave'].id,
  }
  const Madelyn_Rupe = {
    fullName: 'Madelyn Rupe',
    givenName: 'Madelyn',
    userId: usersByName['Ashli & Dave'].id,
  }
  const Hannah_Lohman = {
    fullName: 'Hannah Lohman',
    givenName: 'Hannah',
    userId: usersByName['Hannah & Jeff'].id,
  }
  const Jeff_Wallace = {
    fullName: 'Jeff Wallace',
    givenName: 'Jeff',
    userId: usersByName['Hannah & Jeff'].id,
  }
  const Shaina_Lohman = {
    fullName: 'Shaina Lohman',
    givenName: 'Shaina',
    userId: usersByName['Shaina & Miles'].id,
  }
  const Miles_Loftin = {
    fullName: 'Miles Loftin',
    givenName: 'Miles',
    userId: usersByName['Shaina & Miles'].id,
  }
  const Matthew_Lohman = {
    fullName: 'Matthew Lohman',
    givenName: 'Matt',
    userId: usersByName['Matthew Lohman'].id,
  }
  const Daniel_Lohman = {
    fullName: 'Daniel Lohman',
    givenName: 'Daniel',
    userId: usersByName['Daniel Lohman'].id,
  }
  const Mark_Bakken = {
    fullName: 'Mark Bakken',
    givenName: 'Mark',
    userId: usersByName['Mark & Peggy'].id,
  }
  const Peggy_Bakken = {
    fullName: 'Margaret Merrick-Bakken',
    givenName: 'Peggy',
    userId: usersByName['Mark & Peggy'].id,
  }
  const Alex_Bakken = {
    fullName: 'Alex Bakken',
    givenName: 'Alex',
    userId: usersByName['Alex & Brittany'].id,
  }
  const Brittany_Gottchalk = {
    fullName: 'Brittany Gottchalk',
    givenName: 'Brittany',
    userId: usersByName['Alex & Brittany'].id,
  }
  const Emma_Bakken = {
    fullName: 'Emma Bakken',
    givenName: 'Emma',
    userId: usersByName['Emma & Jake'].id,
  }
  const Jake_Genova = {
    fullName: 'Jake Genova',
    givenName: 'Jake',
    userId: usersByName['Emma & Jake'].id,
  }
  const Nana = {
    fullName: 'Barbara Merrick',
    givenName: 'Nana',
    userId: usersByName['Nana & Grandad'].id,
  }
  const Grandad = {
    fullName: 'William Merrick',
    givenName: 'Grandad',
    userId: usersByName['Nana & Grandad'].id,
  }
  const Uncle_Bill = {
    fullName: 'William Merrick',
    givenName: 'Bill',
    userId: usersByName['Uncle Bill'].id,
  }
  const Taylor_Paddock = {
    fullName: 'Taylor Paddock',
    givenName: 'Taylor',
    userId: usersByName['Taylor & Cassie'].id,
  }
  const Cassie_Paddock = {
    fullName: 'Cassie Paddock',
    givenName: 'Cassie',
    userId: usersByName['Taylor & Cassie'].id,
  }
  const Jack_Stigler = {
    fullName: 'Jack Stigler',
    givenName: 'Jack',
    userId: usersByName['Jack Stigler'].id,
  }
  const Nathan_Vogel = {
    fullName: 'Nathan Vogel',
    givenName: 'Nathan',
    userId: usersByName['Nathan & Alexandria'].id,
  }
  const Alexandria_Odekirk = {
    fullName: 'Alexandria Odekirk',
    givenName: 'Alexandria',
    userId: usersByName['Nathan & Alexandria'].id,
  }
  const Heggi_Aschul = {
    fullName: 'Heggi Aschul',
    givenName: 'Heggi',
    userId: usersByName['Heggi & Will'].id,
  }
  const William_Lee = {
    fullName: 'William Lee',
    givenName: 'Will',
    userId: usersByName['Heggi & Will'].id,
  }
  const Kelsey_Carroll = {
    fullName: 'Kelsey Carroll',
    givenName: 'Kelsey',
    userId: usersByName['Kelsey & Jon'].id,
  }
  const Jon_Carroll = {
    fullName: 'Jon Carroll',
    givenName: 'Jon',
    userId: usersByName['Kelsey & Jon'].id,
  }
  const David_Wu = {
    fullName: 'David Wu',
    givenName: 'David',
    userId: usersByName['David & Delanie'].id,
  }
  const Delanie_Wu = {
    fullName: 'Delanie Wu',
    givenName: 'Delanie',
    userId: usersByName['David & Delanie'].id,
  }
  const Michele_Gaffigan = {
    fullName: 'Michele Gaffigan',
    givenName: 'Michele',
    userId: usersByName['Michele & Kenny'].id,
  }
  const Kenny_Hunt = {
    fullName: 'Kenny Hunt',
    givenName: 'Kenny',
    userId: usersByName['Michele & Kenny'].id,
  }
  const Chase_Stephens = {
    fullName: 'Chase Stephens',
    givenName: 'Chase',
    userId: usersByName['Chase & Caitlin'].id,
  }
  const Caitlin_Stephens = {
    fullName: 'Caitlin Stephens',
    givenName: 'Caitlin',
    userId: usersByName['Chase & Caitlin'].id,
  }

  const guests: typeof schema.guests.$inferInsert[] = [
    Matt_Bakken,
    Hilary_Lohman,
    Mark_Lohman,
    Nancy_Lohman,
    Ashli_Rupe,
    David_Rupe,
    Henry_Rupe,
    Madelyn_Rupe,
    Hannah_Lohman,
    Jeff_Wallace,
    Shaina_Lohman,
    Miles_Loftin,
    Matthew_Lohman,
    Daniel_Lohman,
    Mark_Bakken,
    Peggy_Bakken,
    Alex_Bakken,
    Brittany_Gottchalk,
    Emma_Bakken,
    Jake_Genova,
    Nana,
    Grandad,
    Uncle_Bill,
    Taylor_Paddock,
    Cassie_Paddock,
    Jack_Stigler,
    Nathan_Vogel,
    Alexandria_Odekirk,
    Heggi_Aschul,
    William_Lee,
    Kelsey_Carroll,
    Jon_Carroll,
    David_Wu,
    Delanie_Wu,
    Michele_Gaffigan,
    Kenny_Hunt,
    Chase_Stephens,
    Caitlin_Stephens,
  ]

  console.log('Adding all guests:')
  await db.insert(schema.guests).values(guests)
  const allGuests = await db.select().from(schema.guests)
  console.log('  => New guests created!\n')
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`')

  // Create events

  const welcomeParty: typeof schema.events.$inferInsert = {
    name: 'Welcome Party',
    description:
      'Join us for an evening of tacos & margaritas to kick off the wedding weekend! Vegan & non-alcoholic options available as well.',
    startsAt: new Date('2025-10-10T22:00:00.000Z'), // 4pm MDT
    endsAt: new Date('2025-10-11T03:00:00.000Z'), // 9pm MDT
  }

  const ceremony: typeof schema.events.$inferInsert = {
    name: 'Ceremony',
    description: 'Come watch us get married! Semi-formal attire.',
    startsAt: new Date('2025-10-11T20:30:00.000Z'), // 2:30pm MDT
    endsAt: new Date('2025-10-11T21:00:00.000Z'), // 3pm MDT
  }

  const reception: typeof schema.events.$inferInsert = {
    name: 'Reception',
    description:
      'Celebrate with us after the ceremony! Dinner, drinks, music, and good times.',
    startsAt: new Date('2025-10-11T21:00:00.000Z'), // 3pm MDT
    endsAt: new Date('2025-10-13T03:00:00.000Z'), // 9pm MDT
  }

  const sundayHangout: typeof schema.events.$inferInsert = {
    name: 'Sunday Hangout',
    description:
      "TBD, but we'll have something going on during the day after the wedding - maybe visit the hot springs in Steamboat, hang out in town, something like that.",
  }

  const lodgingThu: typeof schema.events.$inferInsert = {
    name: 'Lodging - Thursday Night',
    description:
      'Stay with us at the Sky Valley Chateau on the night of Thursday, October 9th. Room assignments TBD.',
  }

  const lodgingFri: typeof schema.events.$inferInsert = {
    name: 'Lodging - Friday Night',
    description:
      'Stay with us at the Sky Valley Chateau on the night of Friday, October 10th. Room assignments TBD.',
  }

  const lodgingSat: typeof schema.events.$inferInsert = {
    name: 'Lodging - Saturday Night',
    description:
      'Stay with us at the Sky Valley Chateau on the night of Saturday, October 11th. Room assignments TBD. Please note - there will be an after party at the lodge following the wedding reception! This is not a good option if you need to go to bed early. Go to bed before midnight? Straight to jail.',
  }

  const lodgingSun: typeof schema.events.$inferInsert = {
    name: 'Lodging - Sunday Night',
    description:
      'Stay with us at the Sky Valley Chateau on the night of Sunday, October 12th. Room assignments TBD.',
  }

  const events = [
    welcomeParty,
    ceremony,
    reception,
    sundayHangout,
    lodgingThu,
    lodgingFri,
    lodgingSat,
    lodgingSun,
  ]

  console.log('Adding all events:')
  await db.insert(schema.events).values(events)
  const allEvents = await db.select().from(schema.events)
  console.log('  => New events created!\n')
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`')

  // Create invites

  // Organize the guests by userId so they're easier to look up.
  const guestsByUserId = allGuests.reduce((guestsByUserId, guest) => {
    guestsByUserId[guest.userId] = guest
    return guestsByUserId
  }, {} as { [guestId: string]: typeof schema.guests.$inferSelect })

  // Organize the events by name so they're easier to look up.
  const eventsByName = allEvents.reduce((eventsByName, event) => {
    eventsByName[event.name] = event
    return eventsByName
  }, {} as { [eventName: string]: typeof schema.events.$inferSelect })

  const Matt_Bakken_Invites = [
    {
      guestId: guestsByUserId[Matt_Bakken.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Matt_Bakken.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Matt_Bakken.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Matt_Bakken.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },

    // Lodging Events
    {
      guestId: guestsByUserId[Matt_Bakken.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Matt_Bakken.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Matt_Bakken.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Matt_Bakken.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]

  const Hilary_Lohman_Invites = [
    {
      guestId: guestsByUserId[Hilary_Lohman.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Hilary_Lohman.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Hilary_Lohman.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Hilary_Lohman.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Hilary_Lohman.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Hilary_Lohman.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Hilary_Lohman.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Hilary_Lohman.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Ashli_Rupe_Invites = [
    {
      guestId: guestsByUserId[Ashli_Rupe.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Ashli_Rupe.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Ashli_Rupe.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Ashli_Rupe.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Ashli_Rupe.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Ashli_Rupe.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Ashli_Rupe.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Ashli_Rupe.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const David_Rupe_Invites = [
    {
      guestId: guestsByUserId[David_Rupe.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[David_Rupe.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[David_Rupe.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[David_Rupe.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[David_Rupe.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[David_Rupe.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[David_Rupe.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[David_Rupe.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Henry_Rupe_Invites = [
    {
      guestId: guestsByUserId[Henry_Rupe.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Henry_Rupe.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Henry_Rupe.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Henry_Rupe.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Henry_Rupe.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Henry_Rupe.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Henry_Rupe.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Henry_Rupe.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Madelyn_Rupe_Invites = [
    {
      guestId: guestsByUserId[Madelyn_Rupe.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Madelyn_Rupe.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Madelyn_Rupe.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Madelyn_Rupe.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Madelyn_Rupe.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Madelyn_Rupe.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Madelyn_Rupe.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Madelyn_Rupe.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Hannah_Lohman_Invites = [
    {
      guestId: guestsByUserId[Hannah_Lohman.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Hannah_Lohman.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Hannah_Lohman.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Hannah_Lohman.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Hannah_Lohman.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Hannah_Lohman.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Hannah_Lohman.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Hannah_Lohman.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Jeff_Wallace_Invites = [
    {
      guestId: guestsByUserId[Jeff_Wallace.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Jeff_Wallace.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Jeff_Wallace.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Jeff_Wallace.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Jeff_Wallace.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Jeff_Wallace.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Jeff_Wallace.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Jeff_Wallace.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Shaina_Lohman_Invites = [
    {
      guestId: guestsByUserId[Shaina_Lohman.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Shaina_Lohman.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Shaina_Lohman.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Shaina_Lohman.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Shaina_Lohman.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Shaina_Lohman.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Shaina_Lohman.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Shaina_Lohman.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Miles_Loftin_Invites = [
    {
      guestId: guestsByUserId[Miles_Loftin.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Miles_Loftin.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Miles_Loftin.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Miles_Loftin.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Miles_Loftin.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Miles_Loftin.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Miles_Loftin.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Miles_Loftin.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Matthew_Lohman_Invites = [
    {
      guestId: guestsByUserId[Matthew_Lohman.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Matthew_Lohman.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Matthew_Lohman.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Matthew_Lohman.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Matthew_Lohman.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Matthew_Lohman.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Matthew_Lohman.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Matthew_Lohman.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Daniel_Lohman_Invites = [
    {
      guestId: guestsByUserId[Daniel_Lohman.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Daniel_Lohman.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Daniel_Lohman.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Daniel_Lohman.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Daniel_Lohman.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Daniel_Lohman.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Daniel_Lohman.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Daniel_Lohman.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Alex_Bakken_Invites = [
    {
      guestId: guestsByUserId[Alex_Bakken.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Alex_Bakken.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Alex_Bakken.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Alex_Bakken.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Alex_Bakken.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Alex_Bakken.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Alex_Bakken.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Alex_Bakken.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Brittany_Gottchalk_Invites = [
    {
      guestId: guestsByUserId[Brittany_Gottchalk.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Brittany_Gottchalk.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Brittany_Gottchalk.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Brittany_Gottchalk.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Brittany_Gottchalk.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Brittany_Gottchalk.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Brittany_Gottchalk.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Brittany_Gottchalk.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Emma_Bakken_Invites = [
    {
      guestId: guestsByUserId[Emma_Bakken.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Emma_Bakken.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Emma_Bakken.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Emma_Bakken.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Emma_Bakken.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Emma_Bakken.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Emma_Bakken.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Emma_Bakken.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Jake_Genova_Invites = [
    {
      guestId: guestsByUserId[Jake_Genova.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Jake_Genova.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Jake_Genova.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Jake_Genova.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Jake_Genova.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Jake_Genova.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Jake_Genova.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Jake_Genova.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Taylor_Paddock_Invites = [
    {
      guestId: guestsByUserId[Taylor_Paddock.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Taylor_Paddock.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Taylor_Paddock.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Taylor_Paddock.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Taylor_Paddock.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Taylor_Paddock.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Taylor_Paddock.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Taylor_Paddock.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Cassie_Paddock_Invites = [
    {
      guestId: guestsByUserId[Cassie_Paddock.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Cassie_Paddock.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Cassie_Paddock.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Cassie_Paddock.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Cassie_Paddock.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Cassie_Paddock.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Cassie_Paddock.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Cassie_Paddock.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Jack_Stigler_Invites = [
    {
      guestId: guestsByUserId[Jack_Stigler.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Jack_Stigler.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Jack_Stigler.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Jack_Stigler.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Jack_Stigler.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Jack_Stigler.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Jack_Stigler.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Jack_Stigler.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Nathan_Vogel_Invites = [
    {
      guestId: guestsByUserId[Nathan_Vogel.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Nathan_Vogel.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Nathan_Vogel.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Nathan_Vogel.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Nathan_Vogel.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Nathan_Vogel.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Nathan_Vogel.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Nathan_Vogel.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Alexandria_Odekirk_Invites = [
    {
      guestId: guestsByUserId[Alexandria_Odekirk.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Alexandria_Odekirk.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Alexandria_Odekirk.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Alexandria_Odekirk.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Alexandria_Odekirk.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Alexandria_Odekirk.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Alexandria_Odekirk.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Alexandria_Odekirk.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Heggi_Aschul_Invites = [
    {
      guestId: guestsByUserId[Heggi_Aschul.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Heggi_Aschul.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Heggi_Aschul.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Heggi_Aschul.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Heggi_Aschul.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Heggi_Aschul.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Heggi_Aschul.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Heggi_Aschul.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const William_Lee_Invites = [
    {
      guestId: guestsByUserId[William_Lee.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[William_Lee.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[William_Lee.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[William_Lee.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[William_Lee.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[William_Lee.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[William_Lee.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[William_Lee.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Kelsey_Carroll_Invites = [
    {
      guestId: guestsByUserId[Kelsey_Carroll.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Kelsey_Carroll.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Kelsey_Carroll.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Kelsey_Carroll.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Kelsey_Carroll.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Kelsey_Carroll.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Kelsey_Carroll.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Kelsey_Carroll.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Jon_Carroll_Invites = [
    {
      guestId: guestsByUserId[Jon_Carroll.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Jon_Carroll.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Jon_Carroll.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Jon_Carroll.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Jon_Carroll.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Jon_Carroll.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Jon_Carroll.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Jon_Carroll.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const David_Wu_Invites = [
    {
      guestId: guestsByUserId[David_Wu.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[David_Wu.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[David_Wu.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[David_Wu.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[David_Wu.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[David_Wu.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[David_Wu.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[David_Wu.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Delanie_Wu_Invites = [
    {
      guestId: guestsByUserId[Delanie_Wu.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Delanie_Wu.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Delanie_Wu.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Delanie_Wu.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Delanie_Wu.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Delanie_Wu.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Delanie_Wu.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Delanie_Wu.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Michele_Gaffigan_Invites = [
    {
      guestId: guestsByUserId[Michele_Gaffigan.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Michele_Gaffigan.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Michele_Gaffigan.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Michele_Gaffigan.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Michele_Gaffigan.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Michele_Gaffigan.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Michele_Gaffigan.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Michele_Gaffigan.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Kenny_Hunt_Invites = [
    {
      guestId: guestsByUserId[Kenny_Hunt.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Kenny_Hunt.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Kenny_Hunt.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Kenny_Hunt.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByUserId[Kenny_Hunt.userId].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByUserId[Kenny_Hunt.userId].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByUserId[Kenny_Hunt.userId].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByUserId[Kenny_Hunt.userId].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]

  // No lodging invites
  const Chase_Stephens_Invites = [
    {
      guestId: guestsByUserId[Chase_Stephens.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Chase_Stephens.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Chase_Stephens.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Chase_Stephens.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
  ]
  const Caitlin_Stephens_Invites = [
    {
      guestId: guestsByUserId[Caitlin_Stephens.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Caitlin_Stephens.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Caitlin_Stephens.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Caitlin_Stephens.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
  ]
  const Uncle_Bill_Invites = [
    {
      guestId: guestsByUserId[Uncle_Bill.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Uncle_Bill.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Uncle_Bill.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Uncle_Bill.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
  ]
  const Mark_Lohman_Invites = [
    {
      guestId: guestsByUserId[Mark_Lohman.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Mark_Lohman.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Mark_Lohman.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Mark_Lohman.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
  ]
  const Nancy_Lohman_Invites = [
    {
      guestId: guestsByUserId[Nancy_Lohman.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Nancy_Lohman.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Nancy_Lohman.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Nancy_Lohman.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
  ]
  const Mark_Bakken_Invites = [
    {
      guestId: guestsByUserId[Mark_Bakken.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Mark_Bakken.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Mark_Bakken.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Mark_Bakken.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
  ]
  const Peggy_Bakken_Invites = [
    {
      guestId: guestsByUserId[Peggy_Bakken.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Peggy_Bakken.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Peggy_Bakken.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Peggy_Bakken.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
  ]
  const Nana_Invites = [
    {
      guestId: guestsByUserId[Nana.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Nana.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Nana.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Nana.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
  ]
  const Grandad_Invites = [
    {
      guestId: guestsByUserId[Grandad.userId].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByUserId[Grandad.userId].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByUserId[Grandad.userId].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByUserId[Grandad.userId].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
  ]

  const invites: typeof schema.invites.$inferInsert[] = [
    // All event invites
    ...Matt_Bakken_Invites,
    ...Hilary_Lohman_Invites,
    ...Ashli_Rupe_Invites,
    ...David_Rupe_Invites,
    ...Henry_Rupe_Invites,
    ...Madelyn_Rupe_Invites,
    ...Hannah_Lohman_Invites,
    ...Jeff_Wallace_Invites,
    ...Shaina_Lohman_Invites,
    ...Miles_Loftin_Invites,
    ...Matthew_Lohman_Invites,
    ...Daniel_Lohman_Invites,
    ...Alex_Bakken_Invites,
    ...Brittany_Gottchalk_Invites,
    ...Emma_Bakken_Invites,
    ...Jake_Genova_Invites,
    ...Taylor_Paddock_Invites,
    ...Cassie_Paddock_Invites,
    ...Jack_Stigler_Invites,
    ...Nathan_Vogel_Invites,
    ...Alexandria_Odekirk_Invites,
    ...Heggi_Aschul_Invites,
    ...William_Lee_Invites,
    ...Kelsey_Carroll_Invites,
    ...Jon_Carroll_Invites,
    ...David_Wu_Invites,
    ...Delanie_Wu_Invites,
    ...Michele_Gaffigan_Invites,
    ...Kenny_Hunt_Invites,

    // No lodging invites
    ...Chase_Stephens_Invites,
    ...Caitlin_Stephens_Invites,
    ...Uncle_Bill_Invites,
    ...Mark_Lohman_Invites,
    ...Nancy_Lohman_Invites,
    ...Mark_Bakken_Invites,
    ...Peggy_Bakken_Invites,
    ...Nana_Invites,
    ...Grandad_Invites,
  ]

  console.log('Adding all invites:')
  await db.insert(schema.invites).values(invites)
  console.log('  => New invites created!\n')
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`')

  console.log('Querying db for guests:')
  const finalAllGuests = await db.select().from(schema.guests)
  console.dir(finalAllGuests)
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`')

  console.log('Querying db for events:')
  const finalAllEvents = await db.select().from(schema.events)
  console.dir(finalAllEvents)
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`')

  console.log('Querying db for invites:')
  const finalAllInvites = await db.select().from(schema.invites)
  console.dir(finalAllInvites)
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`')

  console.log('Querying db for rsvps (should have none):')
  const finalAllRsvps = await db.select().from(schema.rsvps)
  console.dir(finalAllRsvps)

  console.log('\nDone seeding database.')
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`')
}

await seed()
Deno.exit(0)
