import { useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import ResultMarker from '../result-marker'
import CustomMarker from '../custom-marker'

export function LocationMarker() {
	const [position, setPosition] = useState(null)
	const map = useMapEvents({
		click(e: any) {
			setPosition(e.latlng)
			map.flyTo(e.latlng, map.getZoom())
		},
	})

	return position === null ? null : <CustomMarker position={position} />
}

export function ResultMarkers({ lat, lng, name }: any) {
	const position = { lat, lng }
	const map = useMapEvents({
		click() {
			map.flyTo(position, map.getZoom())
		},
	})
	return position === null ? null : (
		<ResultMarker position={position} name={name} />
	)
}
