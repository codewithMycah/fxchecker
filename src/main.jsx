import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './components/ThemeProvider.jsx'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './index.css'
import App from './App.jsx'

const isDarkTheme = false
const darkThemeStyles = {
  baseColor: '#374151',
  highlightColor: '#151c2b',
}
const lightThemeStyles = {
  baseColor: '#171719',
  highlightColor: '#454547',
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SkeletonTheme
      baseColor={
        isDarkTheme
          ? darkThemeStyles.baseColor
          : lightThemeStyles.baseColor
      }
      highlightColor={
        isDarkTheme
          ? darkThemeStyles.highlightColor
          : lightThemeStyles.highlightColor
      }
      duration={2}
    >
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </SkeletonTheme>
  </StrictMode>,
)
