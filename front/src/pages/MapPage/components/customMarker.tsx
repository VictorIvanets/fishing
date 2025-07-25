import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Marker, Popup } from "react-leaflet"
import marker from "/markeradd.svg"
import Flex from "src/components/Flex/Flex"
import { useNavigate } from "react-router-dom"

interface CustomMarkerProps {
  userId: string | undefined
  position: L.LatLngLiteral
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ position }) => {
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
            navigate("/addpage", {
              state: {
                position,
              },
            })
          }
          column
          center
          className="popupmy"
        >
          <h4>Додати місце</h4>
        </Flex>
      </Popup>
    </Marker>
  )
}

export default CustomMarker
