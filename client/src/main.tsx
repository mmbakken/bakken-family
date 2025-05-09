import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { store } from '@/store'
import { Provider as StoreProvider } from 'react-redux'

// Import the generated route tree.
import { routeTree } from './routeTree.gen'

// Create a new router instance.
const router = createRouter({ routeTree })

// Register the router instance for type safety.
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app. Routes will render their applicable features.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider store={store}>
      <App>
        <RouterProvider router={router} />
      </App>
    </StoreProvider>
  </StrictMode>,
)
