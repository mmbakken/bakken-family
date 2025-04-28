import { Context } from 'hono'
import { drizzle } from 'drizzle-orm/node-postgres'
import { eq } from 'drizzle-orm'
import * as schema from '../../db/schema.ts'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import type { UserPayloadJWT } from './types'

const db = drizzle(Deno.env.get('DATABASE_URL')!, { schema })

const signJWT = (payload: UserPayloadJWT) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      Deno.env.get('ACCESS_TOKEN_SECRET')!,
      {},
      (err, token) => {
        if (err) {
          return reject(err)
        }

        return resolve(token)
      },
    )
  })
}

export const login = async (c: Context) => {
  console.log('~~~~~~~~~~~~~~~~~~~~~~')
  console.log('Login route')

  const body = await c.req.json()
  const username = body.username
  const password = body.password

  if (username == null || password == null) {
    return c.json({ message: 'Username and password are required.' }, 401)
  }

  // Find the user with this username.
  const users = await db.select().from(
    schema.users,
  ).where(
    eq(schema.users.username, username),
  )

  if (users == null || users.length === 0) {
    return c.json({ message: 'Username not found.' }, 401)
  }

  const user = users[0]

  // Check the password - if it matches, send back the JWT. The JWT should be
  // included in any other restricted API routes.
  const isMatch = await bcrypt.compare(password, user.password)
  console.log(`Password match? => ${isMatch}`)

  if (isMatch) {
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    }

    // TODO: Record the user's lastLogin as now.

    // Generate JWT for public user data and send back as bearer token
    try {
      const token = await signJWT(payload)
      return c.json({ user: payload, accessToken: `Bearer ${token}` })
    } catch (error) {
      console.error(error)
      return c.json({ message: 'Server error while generating JWT.' }, 500)
    }
  }

  return c.json({ message: 'Bad password.' }, 401)
}
