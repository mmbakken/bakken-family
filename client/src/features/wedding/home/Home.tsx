import { useTitle } from '../../../hooks'

const Home = () => {
  useTitle('Wedding')

  return (
    <div>
      <header>
        <h1 className="text-xl text-amber-300">Wedding Home Page</h1>
        <p>Hey, we're logged in!</p>
      </header>
    </div>
  )
}

export default Home
