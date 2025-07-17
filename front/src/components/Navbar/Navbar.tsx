import { memo } from "react"
import "./navbar.sass"
import { NavLink } from "react-router-dom"
import MaterialIcon from "src/shared/icons/Materialicons"
import Flex from "../Flex/Flex"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "src/store/store"
import { userActions } from "src/store/auth.slice"
interface NavbarProps {}
const Navbar = memo(({}: NavbarProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((s: RootState) => s.auth.authinfo?.login)

  return (
    <>
      <Flex center gap={10} className="navbar">
        <NavLink to={"/home"}>
          <Flex centerV gap={5}>
            <h4>
              <MaterialIcon name="MdHome" />
            </h4>
            <p>ГОЛОВНА</p>
          </Flex>
        </NavLink>
        {!data ? (
          <NavLink to={"/login"}>
            <Flex centerV gap={5}>
              <h4>
                <MaterialIcon name="MdLogin" />
              </h4>
              <p>ВХІД</p>
            </Flex>
          </NavLink>
        ) : (
          <NavLink onClick={() => dispatch(userActions.logout())} to={"/login"}>
            <Flex centerV gap={5}>
              <h4>
                <MaterialIcon name="MdLogin" />
              </h4>
              <p>ВИХІД</p>
            </Flex>
          </NavLink>
        )}
        {data && (
          <NavLink to={"/mypage"}>
            <Flex centerV gap={5}>
              <h4>
                <MaterialIcon name="MdAccountBox" />
              </h4>
              <p>МІЙ КАБІНЕТ</p>
            </Flex>
          </NavLink>
        )}
      </Flex>
    </>
  )
})

export default Navbar
