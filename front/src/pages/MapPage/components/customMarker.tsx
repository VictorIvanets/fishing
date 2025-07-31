import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Marker, Popup } from "react-leaflet"
import marker from "/markeradd.svg"
import Flex from "src/components/Flex/Flex"
import { useNavigate } from "react-router-dom"
import type { ResponseForMapT } from "src/types/fishing"

interface CustomMarkerProps {
  userId?: string | undefined
  position: L.LatLngLiteral
  oneFishing?: ResponseForMapT
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
  position,
  oneFishing,
}) => {
  const navigate = useNavigate()
  const markerIconConst = L.icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [30, 60],
  })

  return (
    <Marker position={position} icon={markerIconConst}>
      <Popup>
        <Flex
          onClick={() =>
            oneFishing
              ? navigate(`/details/${oneFishing._id}`)
              : navigate("/addpage", {
                  state: {
                    position,
                  },
                })
          }
          column
          center
          className="popupmy"
        >
          {oneFishing ? (
            <h3>
              {oneFishing.title} Rating:{oneFishing.score}
            </h3>
          ) : (
            <h4>Додати місце</h4>
          )}
        </Flex>
      </Popup>
    </Marker>
  )
}

export default CustomMarker
