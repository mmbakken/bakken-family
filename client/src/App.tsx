// Tailwind CSS entry point.
import './index.css'

interface AppProps {
  children: React.ReactNode
}

const App = ({ children }: AppProps) => {
  return <div className="bg-app-blush-100 h-screen w-screen">{children}</div>
}

export default App
