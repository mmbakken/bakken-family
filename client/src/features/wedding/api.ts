import type { GuestT, RsvpT } from '@/features/wedding/types'

const baseUrl = import.meta.env.VITE_ENV === 'production'
  ? `${window.location.origin}/api/v1`
  : `http://localhost:8000/api/v1`

const weddingAPI = {
  getAdmin: async () => {
    const url = `${baseUrl}/wedding/admin`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? '',
      },
    })

    if (!response.ok) {
      throw new Error('Error fetching admin data.')
    }

    return await response.json()
  },

  getAllUsers: async () => {
    const url = `${baseUrl}/wedding/users`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? '',
      },
    })

    if (!response.ok) {
      throw new Error('Error fetching all users.')
    }

    return await response.json()
  },

  getUser: async () => {
    const url = `${baseUrl}/wedding/user`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? '',
      },
    })

    if (!response.ok) {
      throw new Error('Error fetching user.')
    }

    return await response.json()
  },

  refreshUserToken: async () => {
    const url = `${baseUrl}/wedding/refreshToken`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? '',
      },
    })

    if (!response.ok) {
      throw new Error('Error refreshing user token.')
    }

    return await response.json()
  },

  getGuests: async () => {
    const url = `${baseUrl}/wedding/guests`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? '',
      },
    })

    if (!response.ok) {
      throw new Error('Error fetching guests.')
    }

    return await response.json()
  },

  updateGuest: async (guest: Partial<GuestT>) => {
    const url = `${baseUrl}/wedding/guest`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? '',
      },
      body: JSON.stringify(guest),
    })

    if (!response.ok) {
      throw new Error('Error updating guest.')
    }

    return await response.json()
  },

  getEvents: async () => {
    const url = `${baseUrl}/wedding/events`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? '',
      },
    })

    if (!response.ok) {
      throw new Error('Error fetching events.')
    }

    return await response.json()
  },

  getInvites: async () => {
    const url = `${baseUrl}/wedding/invites`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? '',
      },
    })

    if (!response.ok) {
      throw new Error('Error fetching invites.')
    }

    return await response.json()
  },

  getRsvps: async () => {
    const url = `${baseUrl}/wedding/rsvps`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? '',
      },
    })

    if (!response.ok) {
      throw new Error('Error fetching rsvps.')
    }

    return await response.json()
  },

  upsertRsvp: async (rsvp: Partial<RsvpT>) => {
    const url = `${baseUrl}/wedding/rsvp`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? '',
      },
      body: JSON.stringify(rsvp),
    })

    if (!response.ok) {
      throw new Error('Error upserting RSVP.')
    }

    return await response.json()
  },

  declineAll: async () => {
    const url = `${baseUrl}/wedding/rsvp/declineAll`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? '',
      },
    })

    if (!response.ok) {
      throw new Error('Error declining all RSVPs.')
    }

    return await response.json()
  },

  submit: async () => {
    const url = `${baseUrl}/wedding/rsvp/submit`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? '',
      },
    })

    if (!response.ok) {
      throw new Error('Error submitting RSVPs.')
    }

    return await response.json()
  },

  resetUserRsvps: async (userId: string) => {
    const url = `${baseUrl}/wedding/admin/users/${userId}/rsvps/reset`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ?? '',
      },
    })

    if (!response.ok) {
      throw new Error('Error resetting user RSVPs.')
    }

    return await response.json()
  },
}

export default weddingAPI
