import { useEffect, useState } from 'react'
import { useTitle } from '@/hooks'

const baseUrl =
  import.meta.env.VITE_ENV === 'production'
    ? `${window.location.origin}/api/v1`
    : `http://localhost:8000/api/v1`

const Home = () => {
  useTitle('Wedding')
  const [apiResponse, setApiResponse] = useState('')
  const [usersResponse, setUsersResponse] = useState('')

  useEffect(() => {
    const url = `${baseUrl}/wedding`

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
    const url = `${baseUrl}/wedding/users`

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

  return (
    <div>
      <header>
        <h1 className="text-xl text-amber-300">Wedding Home Page</h1>
        <p>Hey, we're logged in!</p>
      </header>

      <h2>API Response: {JSON.stringify(apiResponse, null, 2)}</h2>
      <h2>Users: {JSON.stringify(usersResponse, null, 2)}</h2>
    </div>
  )
}

export default Home
