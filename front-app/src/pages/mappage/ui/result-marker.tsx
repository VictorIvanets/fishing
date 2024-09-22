import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Marker, Popup } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../../store/store'
import marker from '/marker.svg'

interface CustomMarkerProps {
	position: L.LatLngLiteral
	name: string
	setId: string
}

const ResultMarker: React.FC<CustomMarkerProps> = ({
	position,
	name,
	setId,
}) => {
	const login = useSelector((s: RootState) => s.user.login)
	const markerIconConst = L.icon({
		iconUrl: marker,
		iconRetinaUrl: marker,
		iconAnchor: [5, 55],
		popupAnchor: [10, -44],
		iconSize: [30, 60],
	})

	return (
		<Marker icon={markerIconConst} position={position}>
			<Popup>
				<Link className="popupbox" to={`/main/${login}/sets/${setId}`}>
					<h2 className="colorLight">{name}</h2>
					<h3>перегляд</h3>
				</Link>
			</Popup>
		</Marker>
	)
}

export default ResultMarker
