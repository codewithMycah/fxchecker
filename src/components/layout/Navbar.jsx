import ThemeToggle from "../ThemeToggle"
import Logo from "../../assets/logo.svg"
import LogoDark from "../../assets/logo_dark.svg"
import LiveMarket from "../LiveMarket"
import { useTheme } from "../ThemeProvider"

const Navbar = () => {
  const { theme } = useTheme()

  return (
    <>
      <nav className="w-full p-4 flex flex-row items-center justify-between"> 
        {theme === "dark" ? <img src={Logo} alt="logo" /> : <img src={LogoDark} alt="logo" />}
        <div className="flex flex-row items-center gap-2">
          <span className="text-neutral-200 text-preset-6 md:text-preset-4 uppercase">57 CURRENCIES · EOD · ECB DATA</span>
          <ThemeToggle />
        </div>
      </nav>
      <LiveMarket />
    </>
  )
}

export default Navbar