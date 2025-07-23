import { useNavigate } from "react-router-dom"
import "./addpage.sass"
import Flex from "src/components/Flex/Flex"
import FadeIn from "src/components/FadeIn/FadeIn"
import { useLocation } from "react-router-dom"
import type { LatLngLiteral } from "leaflet"

type LocationState = {
  userId: string
  position: LatLngLiteral
}

const AddPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState

  return (
    <FadeIn>
      <Flex column centerV spredV className="about">
        <div>
          <p>{state.userId}</p>
          <p>{state.position.lat}</p>
          <p>{state.position.lng}</p>
        </div>
        <h4 className="about__back" onClick={() => navigate(-1)}>
          Назад
        </h4>
      </Flex>
    </FadeIn>
  )
}

export default AddPage
