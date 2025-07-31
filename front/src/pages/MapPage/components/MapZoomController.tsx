import type { LatLngTuple } from "leaflet"
import { useEffect } from "react"
import { useMap } from "react-leaflet"

interface MapZoomControllerProps {
  coords: LatLngTuple
  zoom: number
}

const MapZoomController = ({ coords, zoom }: MapZoomControllerProps) => {
  const map = useMap()

  useEffect(() => {
    map.flyTo(coords, zoom)
  }, [coords, zoom])

  return null
}

export default MapZoomController
