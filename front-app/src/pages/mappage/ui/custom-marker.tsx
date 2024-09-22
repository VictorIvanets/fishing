import { FormEvent, useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Marker, Popup } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispath, RootState } from '../../../store/store'
import { fishingResultForm } from './map.types'
import { mapActions, setSets } from '../../../store/map.slice'
import marker from '/markeradd.svg'

interface CustomMarkerProps {
	position: L.LatLngLiteral
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ position }) => {
	const dispatch = useDispatch<AppDispath>()
	const [viewMarker, setViewMarker] = useState(true)
	const { login } = useSelector((s: RootState) => s.user)

	const markerIconConst = L.icon({
		iconUrl: marker,
		iconRetinaUrl: marker,
		iconAnchor: [5, 55],
		popupAnchor: [10, -44],
		iconSize: [30, 60],
	})

	function onSubmit(e: FormEvent, lat: number, lng: number) {
		e.preventDefault()
		const target = e.target as typeof e.target & fishingResultForm
		const { title, description, score, date } = target
		if (title.value.length) {
			dispatch(
				setSets({
					title: title.value,
					description: description.value,
					score: score.value,
					date: date.value,
					coords: [lat, lng],
					login: login,
					setID: +(Math.random() * 100000).toFixed(),
				}),
			)
			setViewMarker(false)
			dispatch(mapActions.clearState())
		}
	}

	useEffect(() => {
		setViewMarker(true)
	}, [position])

	return (
		<Marker position={position} icon={markerIconConst}>
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
								<button>Додати</button>
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
