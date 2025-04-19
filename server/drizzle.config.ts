import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './db/migrations',
  schema: './db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: Deno.env.get('DATABASE_URL')!,
  },
})
