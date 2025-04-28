import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
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

  const handleLoginSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/wedding/login`

    console.log('username: ' + username)
    console.log('password: ' + password)

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
      console.log('POST /login response:')
      console.dir(json)

      // Save the token to local storage and include with all future requests.
      localStorage.setItem('token', json.accessToken)
    } catch (error) {
      console.log('POST /login error:')
      console.error(error)
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>
      <h2>API Response: {JSON.stringify(apiResponse, null, 2)}</h2>
      <h2>Users: {JSON.stringify(usersResponse, null, 2)}</h2>

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

        <button onClick={handleLoginSubmit}>Submit</button>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
