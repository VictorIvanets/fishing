import { useState } from "react"
import { useMapEvents } from "react-leaflet"
import CustomMarker from "./customMarker"

const LocationMarker = (props: { userId: string }) => {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click(e: any) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, 15)
    },
  })

  return position === null ? null : (
    <CustomMarker userId={props.userId} position={position} />
  )
}

export default LocationMarker
