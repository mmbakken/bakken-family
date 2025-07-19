import { Context, Next } from 'hono'

// Middleware function. Validates that the user data from the token has the
// admin role permission.
export const validateAdminUser = async (c: Context, next: Next) => {
  const user = c.get('user')

  if (user == null) {
    return c.json({ error: 'User not found.' }, 404)
  }

  if (user.role !== 1) {
    console.error('Unauthorized: User is not an admin.')
    return c.json({ message: 'Unauthorized.' }, 403)
  }

  await next()
}
