import { createFileRoute } from '@tanstack/react-router'
import { Login } from '@/features/wedding/auth'

export const Route = createFileRoute('/wedding/login')({
  component: Login,
})
