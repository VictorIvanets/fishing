import { Outlet } from "react-router-dom"
import "./layout.sass"
import Navbar from "src/components/Navbar/Navbar"
import Flex from "src/components/Flex/Flex"
interface LayoutProps {}
const Layout = ({}: LayoutProps) => {
  return (
    <>
      <Flex column className="layout">
        <Flex center className="layout__navbar">
          <Navbar />
        </Flex>
        <Flex className="layout__main">
          <Outlet />
        </Flex>
      </Flex>
    </>
  )
}

export default Layout
