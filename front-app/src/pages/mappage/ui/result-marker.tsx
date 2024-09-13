import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Marker, Popup } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../../store/store'

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

	return (
		<Marker position={position}>
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
