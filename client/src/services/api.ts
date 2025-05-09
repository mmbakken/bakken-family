import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  EventT,
  GuestT,
  InviteT,
  RsvpT,
  UserT,
} from '@/features/wedding/types'

const baseUrl = import.meta.env.VITE_ENV === 'production'
  ? `${window.location.origin}/api/v1`
  : `http://localhost:8000/api/v1`

export const weddingAPI = createApi({
  reducerPath: 'weddingAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token') ?? ''
      headers.set('Authorization', token)
      return headers
    },
  }),
  tagTypes: ['Rsvp'],
  endpoints: (builder) => ({
    login: builder.mutation<boolean, { username: string; password: string }>({
      query(body) {
        return {
          url: `wedding/login`,
          method: 'POST',
          body,
        }
      },
    }),
    getUser: builder.query<UserT, void>({
      query: () => 'wedding/guests',
    }),
    getGuests: builder.query<GuestT[], void>({
      query: () => 'wedding/guests',
    }),
    getInvites: builder.query<InviteT[], void>({
      query: () => 'wedding/invites',
    }),
    getEvents: builder.query<EventT[], void>({
      query: () => 'wedding/events',
    }),

    // RSVPs are the only thing that's really updated during the lifecycle of
    // this app. No need for tags for the others.
    getRsvps: builder.query<RsvpT[], void>({
      query: () => 'wedding/rsvps',
      // Provides a list of `Rsvp` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Rsvp` element was added.
      providesTags: (result) =>
        // is result available?
        result
          // successful query
          ? [
            ...result.map(({ id }) => ({ type: 'Rsvp', id }) as const),
            { type: 'Rsvp', id: 'LIST' },
          ]
          // an error occurred, but we still want to refetch this query when `{ type: 'Rsvp', id: 'LIST' }` is invalidated
          : [{ type: 'Rsvp', id: 'LIST' }],
    }),
    getRsvp: builder.query<RsvpT, string>({
      query: (id) => `wedding/rsvp/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Rsvp', id }],
    }),

    addRsvp: builder.mutation<
      RsvpT,
      {
        guestId: string
        eventId: string
        accepted: boolean
      }
    >({
      query: (rsvp) => ({
        url: `wedding/rsvp`,
        method: 'POST',
        body: rsvp,
      }),
      // Invalidates all Rsvp-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created Rsvp could show up in any lists.
      invalidatesTags: [{ type: 'Rsvp', id: 'LIST' }],
      /* TODO: Remove?
      // Allows for optimistic updating.
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          weddingAPI.util.updateQueryData('getRsvp', id, (draft) => {
            Object.assign(draft, patch)
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      */
    }),
    /* TODO: Do we need this? Could just create a new RSVP any time someone
       clicks on an option, and the back end just deletes the old one.

    updateRsvp: builder.mutation<RsvpT, Partial<RsvpT> & Pick<RsvpT, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `rsvp/${id}`,
        method: 'POST',
        body: patch,
      }),
      invalidatesTags: ['Rsvp'],

      // Allows for optimistic updating.
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          weddingAPI.util.updateQueryData('getRsvp', id, (draft) => {
            Object.assign(draft, patch)
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
    */
  }),
})

export const {
  useGetUserQuery,
  useGetGuestsQuery,
  useGetEventsQuery,
  useGetInvitesQuery,
  useGetRsvpsQuery,
  useGetRsvpQuery,
  useAddRsvpMutation,
} = weddingAPI
