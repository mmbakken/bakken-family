import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  guestCount: integer('guest_count').notNull().default(0),
})

export const rsvps = pgTable('rsvps', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer('user_id').notNull().references(() => users.id),
  hasSubmitted: boolean('has_submitted').notNull().default(false),
  createdOn: timestamp('created_on').notNull().defaultNow(),
  updatedOn: timestamp('updated_on').notNull().defaultNow(),
  acceptedCount: integer('accepted_count').notNull().default(0),
  declinedCount: integer('declined_count').notNull().default(0),
  lodgingCount: integer('lodging_count').notNull().default(0),
  allergies: text(),
})
