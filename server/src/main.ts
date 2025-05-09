import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { login } from './auth/login.ts'
import { authenticateToken } from './auth/authenticateToken.ts'
import { getUser, getUsers } from './routes/users.ts'
import { getGuests } from './routes/guests.ts'
import { addRsvp, getRsvps } from './routes/rsvps.ts'
import { getEvents } from './routes/events.ts'
import { getInvites } from './routes/invites.ts'

const app = new Hono()
app.use(logger())

// CORS should be called before the route
app.use(
  'api/*',
  cors({
    origin: [
      'https://www.bakken.family',
      'https://bakken.family',
      'http://localhost:5173',
    ],
    allowHeaders: [
      'Upgrade-Insecure-Requests',
      'content-type',
      'Authorization',
    ],
    allowMethods: ['POST', 'PUT', 'GET', 'OPTIONS', 'DELETE'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  }),
)

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Wedding Site internal server error.', 500)
})

app.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' })
})

app.get('/api/v1/wedding', (c) => {
  return c.json({ message: 'Wedding API is loading. Does it update?' })
})

app.post('/api/v1/wedding/login', login)

// Test endpoint to validate auth/token works. Do we need this anymore?
app.get('/api/v1/wedding/users', authenticateToken, getUsers)
app.get('/api/v1/wedding/user', authenticateToken, getUser)

app.get('/api/v1/wedding/guests', authenticateToken, getGuests)
app.get(
  '/api/v1/wedding/events',
  authenticateToken,
  getEvents,
)
app.get(
  '/api/v1/wedding/invites',
  authenticateToken,
  getInvites,
)

app.get(
  '/api/v1/wedding/rsvps',
  authenticateToken,
  getRsvps,
)

app.post(
  '/api/v1/wedding/rsvp',
  authenticateToken,
  addRsvp,
)

// TODO: Add an endpoint to submit RSVP form responses.
// Should create an RSVP record in the DB for each guest invite.

Deno.serve(app.fetch)
