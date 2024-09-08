import { FormEvent } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Marker, Popup } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { fishingResultForm } from './map.types'

interface CustomMarkerProps {
	position: L.LatLngLiteral
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ position }) => {
	const navigate = useNavigate()
	const { login } = useSelector((s: RootState) => s.user)

	function onSubmit(e: FormEvent, lat: number, lng: number) {
		e.preventDefault()
		const target = e.target as typeof e.target & fishingResultForm
		const { title, description, score, date } = target
		console.log(title.value)
		console.log(description.value)
		console.log(score.value)
		console.log(date.value)
		console.log(lat, lng)
		if (title.value.length) {
			navigate(`/main/${login}/sets`)
		}
	}

	return (
		<Marker position={position}>
			<Popup className="popup">
				{position ? (
					<>
						<p className="tacenter colorLight">
							lat: {position.lat} <br /> lng; {position.lng}
						</p>

						<form onSubmit={(e) => onSubmit(e, position.lat, position.lng)}>
							<input name="date" type="date" />
							<input placeholder="назва" name="title" type="text" />
							<input placeholder="опис" name="description" type="text" />
							<div>
								<label className="labelpopup" htmlFor="score">
									Оцінка:
								</label>
								<input
									className="inputpopupscore"
									type="number"
									id="score"
									name="score"
									min="1"
									max="10"
								/>
							</div>
							<button>submit</button>
						</form>
					</>
				) : (
					''
				)}
			</Popup>
		</Marker>
	)
}

export default CustomMarker
