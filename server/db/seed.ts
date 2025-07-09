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
    userId: usersByName['The Rupes'].id,
  }
  const David_Rupe = {
    fullName: 'David Rupe',
    givenName: 'Dave',
    userId: usersByName['The Rupes'].id,
  }
  const Henry_Rupe = {
    fullName: 'Henry Rupe',
    givenName: 'Henry',
    userId: usersByName['The Rupes'].id,
  }
  const Madelyn_Rupe = {
    fullName: 'Madelyn Rupe',
    givenName: 'Madelyn',
    userId: usersByName['The Rupes'].id,
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
    fullName: 'Bill Merrick',
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
  const Heggi_Lee = {
    fullName: 'Heggi Lee',
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
    Heggi_Lee,
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

  const wedding: typeof schema.events.$inferInsert = {
    name: 'Wedding',
    sort: 0,
    location: 'Sky Valley Chateau, Steamboat Springs, CO',
    description:
      'General event placeholder for the main RSVP page. Gives a rough yes/no guest count.',
  }

  const welcomeParty: typeof schema.events.$inferInsert = {
    name: 'Welcome Party',
    sort: 1,
    location: 'Sky Valley Chateau, Steamboat Springs, CO',
    description:
      'Join us for an evening of tacos & margaritas to kick off the wedding weekend! Vegan & non-alcoholic options available as well. Casual attire.',
    startsAt: new Date('2025-10-10T22:00:00.000Z'), // 4pm MDT
    endsAt: new Date('2025-10-11T03:00:00.000Z'), // 9pm MDT
  }

  const ceremony: typeof schema.events.$inferInsert = {
    name: 'Ceremony',
    sort: 2,
    location: 'Sky Valley Chateau, Steamboat Springs, CO',
    description: 'Come watch us get married! Semi-formal attire.',
    startsAt: new Date('2025-10-11T20:30:00.000Z'), // 2:30pm MDT
    endsAt: new Date('2025-10-11T21:00:00.000Z'), // 3pm MDT
  }

  const reception: typeof schema.events.$inferInsert = {
    name: 'Reception',
    sort: 3,
    location: 'Sky Valley Chateau, Steamboat Springs, CO',
    description:
      'Celebrate with us after the ceremony! Dinner, drinks, music, and good times. Semi-formal attire.',
    hasEntree: true,
    startsAt: new Date('2025-10-11T21:00:00.000Z'), // 3pm MDT
    endsAt: new Date('2025-10-13T03:00:00.000Z'), // 9pm MDT
  }

  const sundayHangout: typeof schema.events.$inferInsert = {
    name: 'Sunday Hangout',
    sort: 4,
    location: 'Steamboat Springs, CO',
    description:
      "TBD, but we'll have something going on during the day after the wedding - maybe visit the hot springs in Steamboat, hang out in town, something like that.",
  }

  const lodgingThu: typeof schema.events.$inferInsert = {
    name: 'Thursday Night',
    isLodging: true,
    sort: 5,
    location: 'Sky Valley Chateau, Steamboat Springs, CO',
    description: 'Check-in is at 4pm MT',
    startsAt: new Date('2025-10-09T22:00:00.000Z'), // 4pm MDT
  }

  const lodgingFri: typeof schema.events.$inferInsert = {
    name: 'Friday Night',
    isLodging: true,
    sort: 6,
    location: 'Sky Valley Chateau, Steamboat Springs, CO',
    description: '',
    startsAt: new Date('2025-10-10T22:00:00.000Z'), // 4pm MDT
  }

  const lodgingSat: typeof schema.events.$inferInsert = {
    name: 'Saturday Night',
    isLodging: true,
    sort: 7,
    location: 'Sky Valley Chateau, Steamboat Springs, CO',
    description:
      'Please note - there will be an after party at the lodge following the wedding reception! This is not a good option if you need to go to bed early. Go to bed before midnight? Straight to jail.',
    startsAt: new Date('2025-10-11T22:00:00.000Z'), // 4pm MDT
  }

  const lodgingSun: typeof schema.events.$inferInsert = {
    name: 'Sunday Night',
    isLodging: true,
    sort: 8,
    location: 'Sky Valley Chateau, Steamboat Springs, CO',
    description: '',
    startsAt: new Date('2025-10-12T22:00:00.000Z'), // 4pm MDT
  }

  const events = [
    wedding,
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
  const guestsByFullName = allGuests.reduce((guestsByFullName, guest) => {
    guestsByFullName[guest.fullName] = guest
    return guestsByFullName
  }, {} as { [guestFullName: string]: typeof schema.guests.$inferSelect })

  // Organize the events by name so they're easier to look up.
  const eventsByName = allEvents.reduce((eventsByName, event) => {
    eventsByName[event.name] = event
    return eventsByName
  }, {} as { [eventName: string]: typeof schema.events.$inferSelect })

  const Matt_Bakken_Invites = [
    {
      guestId: guestsByFullName[Matt_Bakken.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Matt_Bakken.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Matt_Bakken.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Matt_Bakken.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Matt_Bakken.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },

    // Lodging Events
    {
      guestId: guestsByFullName[Matt_Bakken.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Matt_Bakken.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Matt_Bakken.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Matt_Bakken.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]

  const Hilary_Lohman_Invites = [
    {
      guestId: guestsByFullName[Hilary_Lohman.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Hilary_Lohman.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Hilary_Lohman.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Hilary_Lohman.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Hilary_Lohman.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Hilary_Lohman.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Hilary_Lohman.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Hilary_Lohman.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Hilary_Lohman.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Ashli_Rupe_Invites = [
    {
      guestId: guestsByFullName[Ashli_Rupe.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Ashli_Rupe.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Ashli_Rupe.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Ashli_Rupe.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Ashli_Rupe.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Ashli_Rupe.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Ashli_Rupe.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Ashli_Rupe.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Ashli_Rupe.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const David_Rupe_Invites = [
    {
      guestId: guestsByFullName[David_Rupe.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[David_Rupe.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[David_Rupe.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[David_Rupe.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[David_Rupe.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[David_Rupe.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[David_Rupe.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[David_Rupe.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[David_Rupe.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Henry_Rupe_Invites = [
    {
      guestId: guestsByFullName[Henry_Rupe.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Henry_Rupe.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Henry_Rupe.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Henry_Rupe.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Henry_Rupe.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Henry_Rupe.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Henry_Rupe.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Henry_Rupe.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Henry_Rupe.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Madelyn_Rupe_Invites = [
    {
      guestId: guestsByFullName[Madelyn_Rupe.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Madelyn_Rupe.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Madelyn_Rupe.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Madelyn_Rupe.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Madelyn_Rupe.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Madelyn_Rupe.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Madelyn_Rupe.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Madelyn_Rupe.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Madelyn_Rupe.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Hannah_Lohman_Invites = [
    {
      guestId: guestsByFullName[Hannah_Lohman.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Hannah_Lohman.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Hannah_Lohman.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Hannah_Lohman.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Hannah_Lohman.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Hannah_Lohman.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Hannah_Lohman.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Hannah_Lohman.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Hannah_Lohman.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Jeff_Wallace_Invites = [
    {
      guestId: guestsByFullName[Jeff_Wallace.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Jeff_Wallace.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Jeff_Wallace.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Jeff_Wallace.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Jeff_Wallace.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Jeff_Wallace.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Jeff_Wallace.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Jeff_Wallace.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Jeff_Wallace.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Shaina_Lohman_Invites = [
    {
      guestId: guestsByFullName[Shaina_Lohman.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Shaina_Lohman.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Shaina_Lohman.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Shaina_Lohman.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Shaina_Lohman.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Shaina_Lohman.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Shaina_Lohman.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Shaina_Lohman.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Shaina_Lohman.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Miles_Loftin_Invites = [
    {
      guestId: guestsByFullName[Miles_Loftin.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Miles_Loftin.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Miles_Loftin.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Miles_Loftin.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Miles_Loftin.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Miles_Loftin.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Miles_Loftin.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Miles_Loftin.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Miles_Loftin.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Matthew_Lohman_Invites = [
    {
      guestId: guestsByFullName[Matthew_Lohman.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Matthew_Lohman.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Matthew_Lohman.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Matthew_Lohman.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Matthew_Lohman.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Matthew_Lohman.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Matthew_Lohman.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Matthew_Lohman.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Matthew_Lohman.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Daniel_Lohman_Invites = [
    {
      guestId: guestsByFullName[Daniel_Lohman.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Daniel_Lohman.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Daniel_Lohman.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Daniel_Lohman.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Daniel_Lohman.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Daniel_Lohman.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Daniel_Lohman.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Daniel_Lohman.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Daniel_Lohman.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Alex_Bakken_Invites = [
    {
      guestId: guestsByFullName[Alex_Bakken.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Alex_Bakken.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Alex_Bakken.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Alex_Bakken.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Alex_Bakken.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Alex_Bakken.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Alex_Bakken.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Alex_Bakken.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Alex_Bakken.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Brittany_Gottchalk_Invites = [
    {
      guestId: guestsByFullName[Brittany_Gottchalk.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Brittany_Gottchalk.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Brittany_Gottchalk.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Brittany_Gottchalk.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Brittany_Gottchalk.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Brittany_Gottchalk.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Brittany_Gottchalk.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Brittany_Gottchalk.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Brittany_Gottchalk.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Emma_Bakken_Invites = [
    {
      guestId: guestsByFullName[Emma_Bakken.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Emma_Bakken.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Emma_Bakken.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Emma_Bakken.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Emma_Bakken.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Emma_Bakken.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Emma_Bakken.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Emma_Bakken.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Emma_Bakken.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Jake_Genova_Invites = [
    {
      guestId: guestsByFullName[Jake_Genova.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Jake_Genova.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Jake_Genova.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Jake_Genova.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Jake_Genova.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Jake_Genova.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Jake_Genova.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Jake_Genova.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Jake_Genova.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Taylor_Paddock_Invites = [
    {
      guestId: guestsByFullName[Taylor_Paddock.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Taylor_Paddock.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Taylor_Paddock.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Taylor_Paddock.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Taylor_Paddock.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Taylor_Paddock.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Taylor_Paddock.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Taylor_Paddock.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Taylor_Paddock.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Cassie_Paddock_Invites = [
    {
      guestId: guestsByFullName[Cassie_Paddock.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Cassie_Paddock.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Cassie_Paddock.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Cassie_Paddock.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Cassie_Paddock.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Cassie_Paddock.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Cassie_Paddock.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Cassie_Paddock.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Cassie_Paddock.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Jack_Stigler_Invites = [
    {
      guestId: guestsByFullName[Jack_Stigler.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Jack_Stigler.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Jack_Stigler.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Jack_Stigler.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Jack_Stigler.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Jack_Stigler.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Jack_Stigler.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Jack_Stigler.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Jack_Stigler.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Nathan_Vogel_Invites = [
    {
      guestId: guestsByFullName[Nathan_Vogel.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Nathan_Vogel.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Nathan_Vogel.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Nathan_Vogel.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Nathan_Vogel.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Nathan_Vogel.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Nathan_Vogel.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Nathan_Vogel.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Nathan_Vogel.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Alexandria_Odekirk_Invites = [
    {
      guestId: guestsByFullName[Alexandria_Odekirk.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Alexandria_Odekirk.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Alexandria_Odekirk.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Alexandria_Odekirk.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Alexandria_Odekirk.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Alexandria_Odekirk.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Alexandria_Odekirk.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Alexandria_Odekirk.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Alexandria_Odekirk.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Heggi_Lee_Invites = [
    {
      guestId: guestsByFullName[Heggi_Lee.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Heggi_Lee.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Heggi_Lee.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Heggi_Lee.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Heggi_Lee.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Heggi_Lee.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Heggi_Lee.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Heggi_Lee.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Heggi_Lee.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const William_Lee_Invites = [
    {
      guestId: guestsByFullName[William_Lee.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[William_Lee.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[William_Lee.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[William_Lee.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[William_Lee.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[William_Lee.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[William_Lee.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[William_Lee.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[William_Lee.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Kelsey_Carroll_Invites = [
    {
      guestId: guestsByFullName[Kelsey_Carroll.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Kelsey_Carroll.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Kelsey_Carroll.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Kelsey_Carroll.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Kelsey_Carroll.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Kelsey_Carroll.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Kelsey_Carroll.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Kelsey_Carroll.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Kelsey_Carroll.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Jon_Carroll_Invites = [
    {
      guestId: guestsByFullName[Jon_Carroll.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Jon_Carroll.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Jon_Carroll.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Jon_Carroll.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Jon_Carroll.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Jon_Carroll.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Jon_Carroll.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Jon_Carroll.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Jon_Carroll.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const David_Wu_Invites = [
    {
      guestId: guestsByFullName[David_Wu.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[David_Wu.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[David_Wu.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[David_Wu.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[David_Wu.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[David_Wu.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[David_Wu.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[David_Wu.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[David_Wu.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Delanie_Wu_Invites = [
    {
      guestId: guestsByFullName[Delanie_Wu.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Delanie_Wu.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Delanie_Wu.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Delanie_Wu.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Delanie_Wu.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Delanie_Wu.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Delanie_Wu.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Delanie_Wu.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Delanie_Wu.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Michele_Gaffigan_Invites = [
    {
      guestId: guestsByFullName[Michele_Gaffigan.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Michele_Gaffigan.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Michele_Gaffigan.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Michele_Gaffigan.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Michele_Gaffigan.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Michele_Gaffigan.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Michele_Gaffigan.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Michele_Gaffigan.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Michele_Gaffigan.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]
  const Kenny_Hunt_Invites = [
    {
      guestId: guestsByFullName[Kenny_Hunt.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Kenny_Hunt.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Kenny_Hunt.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Kenny_Hunt.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Kenny_Hunt.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
    {
      guestId: guestsByFullName[Kenny_Hunt.fullName].id,
      eventId: eventsByName[lodgingThu.name].id,
    },
    {
      guestId: guestsByFullName[Kenny_Hunt.fullName].id,
      eventId: eventsByName[lodgingFri.name].id,
    },
    {
      guestId: guestsByFullName[Kenny_Hunt.fullName].id,
      eventId: eventsByName[lodgingSat.name].id,
    },
    {
      guestId: guestsByFullName[Kenny_Hunt.fullName].id,
      eventId: eventsByName[lodgingSun.name].id,
    },
  ]

  // No lodging invites
  const Chase_Stephens_Invites = [
    {
      guestId: guestsByFullName[Chase_Stephens.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Chase_Stephens.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Chase_Stephens.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Chase_Stephens.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Chase_Stephens.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
  ]
  const Caitlin_Stephens_Invites = [
    {
      guestId: guestsByFullName[Caitlin_Stephens.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Caitlin_Stephens.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Caitlin_Stephens.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Caitlin_Stephens.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Caitlin_Stephens.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
  ]
  const Uncle_Bill_Invites = [
    {
      guestId: guestsByFullName[Uncle_Bill.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Uncle_Bill.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Uncle_Bill.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Uncle_Bill.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Uncle_Bill.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
  ]
  const Mark_Lohman_Invites = [
    {
      guestId: guestsByFullName[Mark_Lohman.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Mark_Lohman.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Mark_Lohman.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Mark_Lohman.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Mark_Lohman.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
  ]
  const Nancy_Lohman_Invites = [
    {
      guestId: guestsByFullName[Nancy_Lohman.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Nancy_Lohman.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Nancy_Lohman.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Nancy_Lohman.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Nancy_Lohman.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
  ]
  const Mark_Bakken_Invites = [
    {
      guestId: guestsByFullName[Mark_Bakken.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Mark_Bakken.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Mark_Bakken.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Mark_Bakken.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Mark_Bakken.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
  ]
  const Peggy_Bakken_Invites = [
    {
      guestId: guestsByFullName[Peggy_Bakken.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Peggy_Bakken.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Peggy_Bakken.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Peggy_Bakken.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Peggy_Bakken.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
  ]
  const Nana_Invites = [
    {
      guestId: guestsByFullName[Nana.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Nana.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Nana.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Nana.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Nana.fullName].id,
      eventId: eventsByName[sundayHangout.name].id,
    },
  ]
  const Grandad_Invites = [
    {
      guestId: guestsByFullName[Grandad.fullName].id,
      eventId: eventsByName[wedding.name].id,
    },
    {
      guestId: guestsByFullName[Grandad.fullName].id,
      eventId: eventsByName[welcomeParty.name].id,
    },
    {
      guestId: guestsByFullName[Grandad.fullName].id,
      eventId: eventsByName[ceremony.name].id,
    },
    {
      guestId: guestsByFullName[Grandad.fullName].id,
      eventId: eventsByName[reception.name].id,
    },
    {
      guestId: guestsByFullName[Grandad.fullName].id,
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
    ...Heggi_Lee_Invites,
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
