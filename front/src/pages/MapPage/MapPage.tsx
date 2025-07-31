import { useDispatch, useSelector } from "react-redux"
import "./mappage.sass"
import type { AppDispatch, RootState } from "src/store/store"
import { memo, useEffect, useState } from "react"
import FadeIn from "src/components/FadeIn/FadeIn"
import Flex from "src/components/Flex/Flex"
import MaterialIcon from "src/shared/icons/Materialicons"
import { useLocation, useNavigate } from "react-router-dom"
import { Preloader } from "src/components/preloaders/PreloaderBall"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { type LatLngExpression, type LatLngTuple } from "leaflet"
import { userThunk } from "src/store/auth.slice"
import { coordsThunk } from "src/store/map.slice"
import LocationMarker from "./components/LocationMarker"
import type { OneFishingT, ResponseForMapT } from "src/types/fishing"
import CustomMarker from "./components/customMarker"
import useGetAllforMap from "src/hooks/useGetAllforMap"
import { GiDoubleFish } from "react-icons/gi"
import MapZoomController from "./components/MapZoomController"
import Filter from "./components/Filter/Filter"

type MapRoutingState = {
  oneFishing?: OneFishingT
}

const MapPage = memo(() => {
  const coords = useSelector((s: RootState) => s.map.coords)
  const userId = useSelector((s: RootState) => s.auth.authinfo?._id)
  const navigator = useNavigate()
  const [newCoords, setNewCoords] = useState<LatLngTuple>()
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()
  const { data: allFishins } = useGetAllforMap()
  const [viewAll, setViewAll] = useState(false)
  const [filterAll, setFilterAll] = useState<ResponseForMapT[]>([])
  const routingState = location.state as MapRoutingState

  useEffect(() => {
    allFishins && setFilterAll(allFishins)
  }, [allFishins])

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
          center={
            routingState && routingState.oneFishing
              ? {
                  lat: routingState.oneFishing.coords[0],
                  lng: routingState.oneFishing.coords[1],
                }
              : newCoords
          }
          zoom={13}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={newCoords}>
            <Popup>
              <h1>Ви тут</h1>
            </Popup>
          </Marker>
          {!viewAll && !routingState && <LocationMarker userId={userId} />}
          {!viewAll && routingState && routingState.oneFishing && (
            <CustomMarker
              oneFishing={routingState.oneFishing}
              position={{
                lat: routingState.oneFishing.coords[0],
                lng: routingState.oneFishing.coords[1],
              }}
            />
          )}
          {viewAll &&
            filterAll.map((item) => (
              <CustomMarker
                key={item._id}
                oneFishing={item}
                position={{
                  lat: item.coords[0],
                  lng: item.coords[1],
                }}
              />
            ))}
          {viewAll && newCoords && (
            <MapZoomController coords={newCoords} zoom={11} />
          )}
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
      <Flex
        onClick={() => setViewAll(!viewAll)}
        gap={3}
        center
        className="mappage__viewall"
      >
        <p className="tacenter hovertext">
          всі <br /> місця
        </p>
        <h1>
          <GiDoubleFish />
        </h1>
      </Flex>
      {viewAll && allFishins && (
        <Filter setFilterAll={setFilterAll} allFishins={allFishins} />
      )}
    </FadeIn>
  )
})

export default MapPage
