import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Marker, Popup } from 'react-leaflet'

interface CustomMarkerProps {
	position: L.LatLngLiteral
}

const ResultMarker: React.FC<CustomMarkerProps> = ({ position }) => {
	return (
		<Marker position={position}>
			<Popup className="popup">
				<h1>resul</h1>
				<h1>resul</h1>
			</Popup>
		</Marker>
	)
}

export default ResultMarker
