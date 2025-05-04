import { useEffect, useState } from 'react'
import { useTitle } from '@/hooks'

const baseUrl =
  import.meta.env.VITE_ENV === 'production'
    ? `${window.location.origin}/api/v1`
    : `http://localhost:8000/api/v1`

const Rsvp = () => {
  useTitle('Wedding - RSVP')

  // TODO: Install RTK Query for managing API state
  // Fetch the guests for this user
  // Fetch the invites for this user
  // Fetch the RSVPs for this user

  const [guests, setGuests] = useState('')
  const [rsvps, setRsvps] = useState('')
  const [invites, setInvites] = useState('')

  useEffect(() => {
    const url = `${baseUrl}/wedding/guests`

    const options = {
      headers: {
        Authorization: localStorage.getItem('token') ?? '',
      },
    }

    fetch(url, options)
      .then((data) => {
        data.json().then((res) => {
          setGuests(res.guests)
        })
      })
      .catch((err) => {
        console.dir(err)
      })
  }, [])

  useEffect(() => {
    const url = `${baseUrl}/wedding/rsvps`

    const options = {
      headers: {
        Authorization: localStorage.getItem('token') ?? '',
      },
    }

    fetch(url, options)
      .then((data) => {
        data.json().then((res) => {
          setRsvps(res.rsvps)
        })
      })
      .catch((err) => {
        console.dir(err)
      })
  }, [])

  useEffect(() => {
    const url = `${baseUrl}/wedding/invites`

    const options = {
      headers: {
        Authorization: localStorage.getItem('token') ?? '',
      },
    }

    fetch(url, options)
      .then((data) => {
        data.json().then((res) => {
          setInvites(res.invites)
        })
      })
      .catch((err) => {
        console.dir(err)
      })
  }, [])

  return (
    <div>
      <header>
        <h1 className="text-app-blush-900 text-3xl">Wedding RSVP Page</h1>
        <p>TODO: Add the RSVP form</p>
      </header>

      <section className="flex flex-col gap-4">
        <pre>{JSON.stringify(guests, null, 2)}</pre>
        <pre>{JSON.stringify(rsvps, null, 2)}</pre>
        <pre>{JSON.stringify(invites, null, 2)}</pre>
      </section>
    </div>
  )
}

export default Rsvp
