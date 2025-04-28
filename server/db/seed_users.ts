import * as bcrypt from 'bcrypt'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema.ts'
import USERS from './users.json' with { type: 'json' }

const db = drizzle(Deno.env.get('DATABASE_URL')!, { schema })

export const seedUsers = async () => {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`')
  console.log('Seeding users in database:')

  console.log('  Deleting all users...')
  await db.delete(schema.users)
  console.log('    => Done.')

  console.log('  Adding all users (REAL PEOPLE that WILL exist FOREVER)...')

  // Given the user object data, returns a user with a salted and hashed
  // password that's ready to be inserted into the DB.
  const buildUser = (userData: typeof schema.users.$inferInsert) => {
    return {
      username: userData.username,
      password: bcrypt.hashSync(userData.password),
      role: userData.role,
    }
  }

  const users: typeof schema.users.$inferInsert[] = Object.values(USERS).map(
    (userData) => buildUser(userData),
  )

  await db.insert(schema.users).values(users)
  console.log('    => New users created!')

  console.log('\nQuerying db for users:')
  const allUsers = await db.select().from(schema.users)
  console.dir(allUsers)

  console.log('\nDone seeding users in database.')
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`')
}
