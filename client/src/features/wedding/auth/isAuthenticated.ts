// Returns true if the user is logged in already.
const isAuthenticated = () => {
  const token = localStorage.getItem('token')

  return token != null && token !== ''
}

export default isAuthenticated
