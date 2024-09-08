import { FormEvent, useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Marker, Popup } from 'react-leaflet'
// import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispath } from '../../../store/store'
import { fishingResultForm } from './map.types'
import { mapActions } from '../../../store/map.slice'

interface CustomMarkerProps {
	position: L.LatLngLiteral
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ position }) => {
	// const navigate = useNavigate()
	const dispatch = useDispatch<AppDispath>()
	const [viewMarker, setViewMarker] = useState(true)

	function onSubmit(e: FormEvent, lat: number, lng: number) {
		e.preventDefault()
		const target = e.target as typeof e.target & fishingResultForm
		const { title, description, score, date } = target
		if (title.value.length) {
			// navigate(`/main/${login}/sets`)
			dispatch(
				mapActions.setFishing({
					title: title.value,
					description: description.value,
					score: score.value,
					date: date.value,
					coords: [lat, lng],
				}),
			)
			setViewMarker(false)
		}
	}

	useEffect(() => {
		setViewMarker(true)
	}, [position])

	return (
		<Marker position={position}>
			{viewMarker ? (
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
			) : (
				<h2>ok</h2>
			)}
		</Marker>
	)
}

export default CustomMarker
