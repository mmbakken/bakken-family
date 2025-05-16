import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Route as LoginRoute } from '@/routes/wedding/login'
import { useTitle } from '@/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const baseUrl =
  import.meta.env.VITE_ENV === 'production'
    ? `${window.location.origin}/api/v1`
    : `${window.location.protocol}//${window.location.hostname}:8000/api/v1`

const Login = () => {
  useTitle('Wedding - Login')
  const navigate = useNavigate()
  const { redirect } = LoginRoute.useSearch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const allowSubmit = username && username.length && password && password.length

  //==================================================
  // Event handlers
  //==================================================

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value)
    setError(null)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
    setError(null)
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

      const json = await response.json()

      if (!response.ok) {
        console.log('json:')
        console.dir(json)
        throw new Error(json.message)
      }

      setError(null)

      // Save the token to local storage and include with all future requests.
      localStorage.setItem('token', json.accessToken)

      // Redirect to where the user was trying to go before being sent here.
      navigate({ to: redirect })
    } catch (error) {
      console.log('POST /login error:')
      console.error(error)

      setError(error.message)
    }
  }

  return (
    <div className="flex h-dvh w-screen flex-col items-center justify-center gap-8 overflow-hidden px-6 py-4">
      <div className="flex max-w-md flex-col gap-12">
        <header className="flex flex-col gap-2">
          <h1 className="flex flex-col">
            <span className="font-birthstone text-center text-2xl text-neutral-500">
              You are cordially invited to the wedding of
            </span>
            <span className="font-birthstone text-primary text-center text-6xl leading-20">
              Hilary Lohman
            </span>
            <span className="font-birthstone text-center text-2xl leading-4 text-neutral-500">
              and
            </span>
            <span className="font-birthstone text-primary -mt-px text-center text-6xl leading-20">
              Matthew Bakken
            </span>
          </h1>
        </header>

        <div className="flex flex-col items-center gap-8">
          <div className="flex w-full flex-col gap-4">
            <div>
              <h2 className="text-lg">Please log in to continue.</h2>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="input-name">Username:</label>
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
              <label htmlFor="input-password">Password:</label>
              <Input
                className="border-app-blush-900 bg-app-offwhite text-md text-app-blush-900 border"
                id="input-password"
                type="password"
                onChange={handlePasswordChange}
                value={password}
              />
            </div>

            <div className="h-4">
              {error != null && <span className="text-red-700">{error}</span>}
            </div>
          </div>

          <Button
            size="lg"
            className="disabled:cursor-disabled w-36 cursor-pointer border"
            onKeyDown={handleKeyDown}
            onClick={handleLoginSubmit}
            disabled={!allowSubmit}
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
