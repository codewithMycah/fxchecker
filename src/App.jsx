import { useRoutes } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Home from "./pages/Home"

function App() {
  const element = useRoutes([
    {
      path: '/',
      element: <Home />
    }
  ])

  return (
    <main>
      <Navbar />
      {element}
    </main>
  )
}

export default App
