import Actions from "./actions"
import Logo from "./logo"
import Navigations from "./navigations"

const Navbar = () => {
  return (
    <nav className="sticky top-0 inset-x-0 flex justify-between items-center h-20">
      <Logo />
      <Navigations />
      <Actions />
    </nav>
  )
}

export default Navbar
