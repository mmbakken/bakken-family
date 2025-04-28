import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

const Login = () => {
  const navigate = useNavigate()
  const [apiResponse, setApiResponse] = useState('')
  const [usersResponse, setUsersResponse] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/wedding`

    fetch(url)
      .then((data) => {
        data.json().then((res) => {
          setApiResponse(res)
        })
      })
      .catch((err) => {
        console.dir(err)
      })
  }, [])

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/wedding/users`

    const options = {
      headers: {
        Authorization: localStorage.getItem('token') ?? '',
      },
    }

    fetch(url, options)
      .then((data) => {
        data.json().then((res) => {
          setUsersResponse(res)
        })
      })
      .catch((err) => {
        console.dir(err)
      })
  }, [])

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

  const login = async () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/wedding/login`

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

      // Just always redirect to the wedding home page. I'm too tired to figure
      // out how to use the redirect search param.
      navigate({ to: '/wedding' })
    } catch (error) {
      console.log('POST /login error:')
      console.error(error)
    }
  }

  return (
    <>
      <h1>Login</h1>

      <div>
        <label>
          Names:
          <input
            type="text"
            placeholder="e.g. Mark & Nancy"
            onChange={handleUsernameChange}
            value={username}
          />
          <p>Enter this as it appears on your invitation.</p>
        </label>

        <label>
          Password
          <input
            type="password"
            onChange={handlePasswordChange}
            value={password}
          />
        </label>

        <button onKeyDown={handleKeyDown} onClick={handleLoginSubmit}>
          Submit
        </button>
      </div>

      <h2>API Response: {JSON.stringify(apiResponse, null, 2)}</h2>
      <h2>Users: {JSON.stringify(usersResponse, null, 2)}</h2>
    </>
  )
}

export default Login
