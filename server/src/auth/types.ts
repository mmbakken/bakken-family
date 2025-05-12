// The user data included in the JWT.
export interface UserPayloadJWT {
  id: string
  username: string
  role: number
  submittedOn: string
}
