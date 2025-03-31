import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// CORS should be called before the route
// app.use("/api/*", cors());
app.use(
  'api/*',
  cors({
    origin: [
      'https://www.bakken.family',
      'https://bakken.family',
      'http://localhost:5173',
    ],
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['POST', 'PUT', 'GET', 'OPTIONS', 'DELETE'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  }),
)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/wedding', (c) => {
  return c.text('Wedding API is loading.')
})

Deno.serve(app.fetch)
