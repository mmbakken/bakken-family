import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { login } from './auth/login.ts'
import { authenticateToken } from './auth/authenticateToken.ts'
import { getUsers } from './routes/users.ts'

const app = new Hono()

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

app.get('/api/v1/wedding/users', authenticateToken, getUsers)

Deno.serve(app.fetch)
