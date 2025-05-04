import { createFileRoute, redirect } from '@tanstack/react-router'
import { Rsvp } from '@/features/wedding/rsvp'
import { isAuthenticated } from '@/features/wedding/auth'

export const Route = createFileRoute('/wedding/rsvp')({
  component: Rsvp,
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
