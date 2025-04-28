import jwt from 'jsonwebtoken'
import { Context, Next } from 'hono'
import type { UserPayloadJWT } from './types'

const verifyJWT = (token: string): UserPayloadJWT => {
  return new Promise((resolve, reject) => {
    if (token == null) {
      return reject(new Error('No token provided.'))
    }

    jwt.verify(
      token,
      Deno.env.get('ACCESS_TOKEN_SECRET')!,
      (err, userPayload) => {
        if (err) {
          return reject(err)
        }

        resolve(userPayload)
      },
    )
  })
}

// Middleware function. Validates the JWT included is valid, and sends the user
// id along for subsequent requests.
export const authenticateToken = async (c: Context, next: Next) => {
  // Format of header: 'Bearer <token>'
  const authHeader = c.req.header().authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null || token == '') {
    return c.json({ message: 'Unauthenticated.' }, 401)
  }

  try {
    const user = await verifyJWT(token)
    c.set('user', user)
    await next()
  } catch (error) {
    console.error(error)
    return c.json({ message: 'Unauthorized.' }, 403)
  }
}
