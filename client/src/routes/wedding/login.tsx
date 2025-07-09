import { createFileRoute } from '@tanstack/react-router'
import { Login } from '@/features/wedding/auth'

export const Route = createFileRoute('/wedding/login')({
  validateSearch: (s) => s as { redirect?: string },
  component: Login,
})
