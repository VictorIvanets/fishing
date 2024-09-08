import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Marker, Popup } from 'react-leaflet'

interface CustomMarkerProps {
	position: L.LatLngLiteral
	name: string
}

const ResultMarker: React.FC<CustomMarkerProps> = ({ position, name }) => {
	return (
		<Marker position={position}>
			<Popup className="popup">
				<h2>{name}</h2>
			</Popup>
		</Marker>
	)
}

export default ResultMarker
