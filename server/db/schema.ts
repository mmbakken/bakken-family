import { boolean, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

// Users are a means to restrict who can view parts of the site, and allow
// guests to RSVP for everyone in their party.
export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: text().notNull().unique(),
  password: text().notNull(),
  role: integer().notNull().default(0),
  lastLogin: timestamp('last_login'),
})

// Guests are people that are invited to our wedding.
export const guests = pgTable('guests', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer('user_id').notNull().references(() => users.id),
  fullName: text('full_name').notNull(),
  givenName: text('given_name').notNull(),
  allergies: text(),
})

// Events describe a scheduled part of the wedding weekend.
export const events = pgTable('events', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sort: integer().notNull(),
  name: text().notNull().unique(),
  description: text(),
  location: text(),
  hasEntree: boolean().notNull().default(false),
  startsAt: timestamp('starts_at'),
  endsAt: timestamp('ends_at'),
})

// Invites allow us to collect per-guest and per-event responses, and limit who
// is invited to various events.
export const invites = pgTable('invites', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  guestId: integer('guest_id').notNull().references(() => guests.id),
  eventId: integer('event_id').notNull().references(() => events.id),
})

// RSVPs are responses to invitations. They can be created or updated by the
// user for this guest.
export const rsvps = pgTable('rsvps', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  guestId: integer('guest_id').notNull().references(() => guests.id),
  eventId: integer('event_id').notNull().references(() => events.id),
  accepted: boolean().notNull(),
  entree: text(),
  createdOn: timestamp('created_on').notNull().defaultNow(),
  updatedOn: timestamp('updated_on').notNull().defaultNow(),
})
