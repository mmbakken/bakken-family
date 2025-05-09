// Tailwind CSS entry point.
import './index.css'

interface AppProps {
  children: React.ReactNode
}

const App = ({ children }: AppProps) => {
  return <div className="">{children}</div>
}

export default App
