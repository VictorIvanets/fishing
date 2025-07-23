import { useDispatch, useSelector } from "react-redux"
import "./mappage.sass"
import type { AppDispatch, RootState } from "src/store/store"
import { memo, useEffect, useState } from "react"
import FadeIn from "src/components/FadeIn/FadeIn"
import Flex from "src/components/Flex/Flex"
import MaterialIcon from "src/shared/icons/Materialicons"
import { useNavigate } from "react-router-dom"
import { Preloader } from "src/components/preloaders/PreloaderBall"
import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { LatLngExpression, LatLngTuple } from "leaflet"
import { userThunk } from "src/store/auth.slice"
import { coordsThunk } from "src/store/map.slice"
import LocationMarker from "./components/LocationMarker"

const MapPage = memo(() => {
  const coords = useSelector((s: RootState) => s.map.coords)
  const userId = useSelector((s: RootState) => s.auth.authinfo?._id)
  const navigator = useNavigate()
  const [newCoords, setNewCoords] = useState<LatLngTuple>()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    !userId && dispatch(userThunk())
    !coords && dispatch(coordsThunk())
  }, [userId, coords])

  useEffect(() => {
    if (coords && coords?.latitude && coords?.longitude) {
      const normalCords: LatLngExpression | undefined = [
        coords?.latitude,
        coords?.longitude,
      ]
      setNewCoords(normalCords)
    }
  }, [coords])

  return (
    <FadeIn className="mappage">
      {newCoords && userId ? (
        <MapContainer
          center={newCoords}
          zoom={13}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker userId={userId} />
        </MapContainer>
      ) : (
        <Preloader />
      )}

      <Flex
        onClick={() => navigator(-1)}
        gap={7}
        centerV
        className="mappage__link"
      >
        <h1>
          <MaterialIcon name="MdArrowBackIos" />
        </h1>
      </Flex>
    </FadeIn>
  )
})

export default MapPage
