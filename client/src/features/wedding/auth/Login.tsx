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
    <div className="flex min-h-screen w-screen flex-col justify-center gap-8 overflow-hidden px-6 py-4">
      <div className="flex max-w-md flex-col gap-8">
        <header className="flex flex-col gap-8">
          <div className="flex flex-col">
            <div className="text-center text-sm text-neutral-700">
              <p>You're invited to the wedding of</p>
            </div>
            <h1 className="text-primary text-center text-5xl leading-16">
              Hilary & Matt
            </h1>
            <div className="text-md flex flex-col gap-0.5 text-center leading-5">
              <p>Steamboat Springs, CO</p>
              <p>Saturday, October 11, 2025</p>
            </div>
          </div>

          <h2 className="">
            Please enter the login info included on your invitation.
          </h2>
        </header>

        <div className="flex flex-col items-center gap-8">
          <div className="flex w-full flex-col gap-2">
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
            className="disabled:cursor-disabled w-40 cursor-pointer border"
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
