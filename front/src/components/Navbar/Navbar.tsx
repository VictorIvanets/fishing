import { memo } from "react"
import "./navbar.sass"
import { NavLink } from "react-router-dom"
import MaterialIcon from "src/shared/icons/Materialicons"
import Flex from "../Flex/Flex"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "src/store/store"
import { userActions } from "src/store/auth.slice"
import { IoFish } from "react-icons/io5"
import { FaPowerOff } from "react-icons/fa6"

interface NavbarProps {}
const Navbar = memo(({}: NavbarProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((s: RootState) => s.auth.authinfo?.login)

  return (
    <>
      <Flex column gap={25} className="navbar">
        <NavLink to={"/home"}>
          <Flex className="navbar__item" gap={10}>
            <h1>
              <MaterialIcon name="MdHome" />
            </h1>
            <p>ГОЛОВНА</p>
          </Flex>
        </NavLink>
        {data && (
          <NavLink to={"/mypage"}>
            <Flex className="navbar__item" gap={10}>
              <h1>
                <IoFish />
              </h1>
              <p>РИБАЛКИ</p>
            </Flex>
          </NavLink>
        )}
        {data && (
          <NavLink to={"/mappage"}>
            <Flex gap={10} className="navbar__item">
              <h1>
                <MaterialIcon name="MdOutlineMap" />
              </h1>
              <p>МАПА</p>
            </Flex>
          </NavLink>
        )}
        {!data ? (
          <NavLink to={"/login"}>
            <Flex className="navbar__item" gap={10}>
              <h1>
                <MaterialIcon name="MdLogin" />
              </h1>
              <p>ВХІД</p>
            </Flex>
          </NavLink>
        ) : (
          <NavLink to={"/login"}>
            <Flex className="navbar__item" gap={10}>
              <h1>
                <MaterialIcon name="MdLogin" />
              </h1>
              <p>ВИХІД</p>
              <h1
                className="navbar__exit"
                onClick={() => dispatch(userActions.logout())}
              >
                <FaPowerOff />
              </h1>
            </Flex>
          </NavLink>
        )}
        <NavLink to={"/about"}>
          <Flex className="navbar__item" gap={10}>
            <h1>
              <MaterialIcon name="MdOutlineInfo" />
            </h1>
            <p>ПРАВИЛА</p>
          </Flex>
        </NavLink>
      </Flex>
    </>
  )
})

export default Navbar
