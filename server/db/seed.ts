import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema.ts'

const db = drizzle(Deno.env.get('DATABASE_URL')!, { schema })

async function main() {
  console.log('Seeding database:\n')

  console.log('Deleting all users...')
  await db.delete(schema.users)
  console.log('  => Done\n')

  console.log('Creating test user...')
  const user: typeof schema.users.$inferInsert = {
    name: 'Test user 1 & test user 2',
    password: 'mt-elbert-1234',
    guestCount: 2,
  }
  await db.insert(schema.users).values(user)
  console.log('  => New user created!\n')

  console.log('Querying db for users:')
  const allUsers = await db.select().from(schema.users)
  console.dir(allUsers)

  console.log('\nDone seeding database.')
}

main()
