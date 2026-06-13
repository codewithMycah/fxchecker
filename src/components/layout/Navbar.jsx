import ThemeToggle from "../ThemeToggle"
import Logo from "../../assets/logo.svg"

const Navbar = () => {


  return (
    <nav className="p-4 flex flex-row items-center justify-between"> 
      <img src={Logo} alt="" />
      <div className="flex flex-row items-center gap-2">
        <span className="text-neutral-200 dark:text-neutral-900 text-preset-6 md:text-preset-4 uppercase">55 CURRENCIES · EOD · ECB DATA</span>
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navbar