import { Context } from 'hono'
import { drizzle } from 'drizzle-orm/node-postgres'
import { eq, or } from 'drizzle-orm'
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
    return c.json({ message: 'Username and password are required.' }, 422)
  }

  const parts = username.split('&')
  const name1 = parts[0]
  const name2 = parts[1]
  const altUsername = name2 == null ? null : `${name2.trim()} & ${name1.trim()}`

  // Find the user with this username.
  let users = []
  if (altUsername != null) {
    users = await db.select().from(
      schema.users,
    ).where(
      or(
        eq(schema.users.username, username),
        eq(schema.users.username, altUsername),
      ),
    )
  } else {
    users = await db.select().from(
      schema.users,
    ).where(
      eq(schema.users.username, username),
    )
  }

  if (users == null || users.length === 0) {
    return c.json({ message: 'Username not found.' }, 422)
  }

  const user = users[0]

  // Check the password - if it matches, send back the JWT. The JWT should be
  // included in any other restricted API routes.
  const isMatch = await bcrypt.compare(password, user.password)
  console.log(`Password match? => ${isMatch}`)

  if (isMatch) {
    console.log(`User "${user.username}" has logged in successfully.`)
    let payload = null

    try {
      // Record the user's lastLogin timestamp.
      const updatedUsers = await db.update(schema.users).set({
        lastLogin: new Date(),
      }).where(
        eq(schema.users.id, user.id),
      ).returning()

      const updatedUser = updatedUsers[0]

      payload = {
        id: updatedUser.id,
        username: updatedUser.username,
        role: updatedUser.role,
        lastLogin: updatedUser.lastLogin,
        submittedOn: updatedUser.submittedOn,
      }
    } catch (error) {
      console.error("Server error while updating user's lastLogin timestamp:")
      console.error(error)

      payload = {
        id: user.id,
        username: user.username,
        role: user.role,
        lastLogin: user.lastLogin,
        submittedOn: user.submittedOn,
      }
    }

    // Generate JWT for public user data and send back as bearer token
    try {
      const token = await signJWT(payload)
      return c.json({ user: payload, accessToken: `Bearer ${token}` })
    } catch (error) {
      console.error(error)
      return c.json({ message: 'Server error while generating JWT.' }, 500)
    }
  }

  return c.json({ message: 'Password is incorrect.' }, 401)
}

// Given that the user is already logged in and has a valid token, send them a
// new token.
export const refreshToken = async (c: Context) => {
  const userTokenData = c.get('user')

  if (userTokenData == null) {
    return c.json({ error: 'User not found.' }, 404)
  }

  // Find the user with this id.
  const users = await db.select().from(
    schema.users,
  ).where(
    eq(schema.users.id, userTokenData.id),
  )

  if (users == null || users.length === 0) {
    return c.json({ message: 'Username not found.' }, 401)
  }

  const user = users[0]

  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    submittedOn: user.submittedOn,
  }

  // Generate JWT for public user data and send back as bearer token
  try {
    const token = await signJWT(payload)
    return c.json({ user: payload, accessToken: `Bearer ${token}` })
  } catch (error) {
    console.error(error)
    return c.json({ message: 'Server error while generating JWT.' }, 500)
  }
}
