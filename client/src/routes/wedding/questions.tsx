import { createFileRoute, redirect } from '@tanstack/react-router'
import { Questions } from '@/features/wedding/home'
import { isAuthenticated } from '@/features/wedding/auth'

export const Route = createFileRoute('/wedding/questions')({
  component: Questions,
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/wedding/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      })
    }
  },
})
