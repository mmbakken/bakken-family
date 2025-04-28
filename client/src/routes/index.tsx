import { createFileRoute } from '@tanstack/react-router'

// TODO: Add some kind of UI for the non-wedding root of the site.
// Or, just redirect to the wedding site for now?
export const Route = createFileRoute('/')({
  component: () => {
    return (
      <div>
        <h1>Bakken Family website</h1>
        <p>TODO</p>
      </div>
    )
  },
})
