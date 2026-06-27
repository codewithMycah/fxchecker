import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './components/ThemeProvider.jsx'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './index.css'
import App from './App.jsx'

const savedTheme = localStorage.getItem("theme")
const isDarkTheme = savedTheme !== "light"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <SkeletonTheme
        baseColor={isDarkTheme ? "#0A0A0A" : "#E8E8E8"}
        highlightColor={isDarkTheme ? "#575759" : "#575759"}
        duration={2}
      >
        <App />
      </SkeletonTheme>
    </ThemeProvider>
  </StrictMode>,
)