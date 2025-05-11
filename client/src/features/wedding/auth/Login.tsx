import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Route as LoginRoute } from '@/routes/wedding/login'
import { useTitle } from '@/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const baseUrl =
  import.meta.env.VITE_ENV === 'production'
    ? `${window.location.origin}/api/v1`
    : `http://localhost:8000/api/v1`

const Login = () => {
  useTitle('Wedding - Login')
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { redirect } = LoginRoute.useSearch()

  //==================================================
  // Event handlers
  //==================================================

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      await login()
    }
  }

  const handleLoginSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    await login()
  }

  //==================================================
  // API calls
  //==================================================

  // TODO: Move to API slice?
  const login = async () => {
    const url = `${baseUrl}/wedding/login`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })

      if (!response.ok) {
        throw new Error('Unauthorized.')
      }

      const json = await response.json()

      // Save the token to local storage and include with all future requests.
      localStorage.setItem('token', json.accessToken)

      // Redirect to where the user was trying to go before being sent here.
      navigate({ to: redirect })
    } catch (error) {
      console.log('POST /login error:')
      console.error(error)
    }
  }

  return (
    <div className="flex size-full flex-col items-center justify-center p-6 md:p-8">
      <div className="flex max-w-md flex-col gap-8">
        <div className="flex flex-col gap-6">
          <h2 className="text-md text-center text-neutral-900">Welcome to</h2>
          <h1 className="text-app-purple-500 text-center text-3xl">
            Hilary & Matt's Wedding
          </h1>
          <h2 className="text-md text-center text-neutral-900">
            Please enter the login info included on your invitation.
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="input-name">Names:</label>
              <Input
                className="border-app-blush-900 bg-app-offwhite text-md text-app-blush-900 border"
                id="input-name"
                type="text"
                placeholder="e.g. Hilary & Matt"
                onChange={handleUsernameChange}
                value={username}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="input-password">Password</label>
              <Input
                className="border-app-blush-900 bg-app-offwhite text-md text-app-blush-900 border"
                id="input-password"
                type="password"
                onChange={handlePasswordChange}
                value={password}
              />
            </div>
          </div>

          <Button
            className="disabled:cursor-disabled border-app-purple-500 bg-app-purple-500 w-40 cursor-pointer border"
            onKeyDown={handleKeyDown}
            onClick={handleLoginSubmit}
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
