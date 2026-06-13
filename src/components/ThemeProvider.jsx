import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme)
      document.documentElement.classList.toggle(
        "dark",
        savedTheme === "dark"
      )
    } else {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches

      setTheme(systemDark ? "dark" : "light")
      document.documentElement.classList.toggle("dark", systemDark)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"

    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark"
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider")
  }

  return context
}