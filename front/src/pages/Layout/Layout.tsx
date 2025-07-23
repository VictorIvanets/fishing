import { Outlet } from "react-router-dom"
import "./layout.sass"
import Navbar from "src/components/Navbar/Navbar"
import Flex from "src/components/Flex/Flex"
import MaterialIcon from "src/shared/icons/Materialicons"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "src/store/store"
import { coordsThunk } from "src/store/map.slice"

interface LayoutProps {}
const Layout = ({}: LayoutProps) => {
  const [nemu, setManu] = useState(true)
  const dispatch = useDispatch<AppDispatch>()
  const coords = useSelector((s: RootState) => s.map.coords)

  useEffect(() => {
    coords ?? dispatch(coordsThunk())
  }, [coords])

  return (
    <>
      <Flex column className="layout">
        <Flex onClick={() => setManu(!nemu)} className="layout__hiddnavbar">
          <h1>
            <MaterialIcon name="MdMenu" />
          </h1>
        </Flex>
        <Flex
          center
          className={`layout__navbar ${nemu ? " visiblenavbar" : ""}`}
        >
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
