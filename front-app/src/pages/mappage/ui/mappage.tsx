import { MapContainer, TileLayer } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { PreLoader } from '../../../widgets/PreLoader'
import { LocationMarker, ResultMarkers } from './helpers/locationMarkers'
import { LatLngExpression, LatLngTuple } from 'leaflet'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

function MapPage() {
	const [coords, setCoords] = useState<GeolocationPosition>()
	const [viewResult, setViewResult] = useState(false)
	const [nameResult, setNameResult] = useState('')

	const [newCoords, setNewCoords] = useState<LatLngTuple>()
	const state = useSelector((s: RootState) => s.map)

	useEffect(() => {
		if (coords) {
			const normalCords: LatLngExpression | undefined = [
				coords?.coords.latitude,
				coords?.coords.longitude,
			]
			setNewCoords(normalCords)
		}
	}, [coords])

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setCoords(position)
			},
			(error) => {
				console.error('Error getting user location:', error)
			},
		)
	}, [state])

	function getCoords(e: any) {
		setViewResult(true)
		setNewCoords(undefined)
		const coor = e.target.textContent.split(' | ')
		setTimeout(() => {
			setNewCoords([+coor[0], +coor[1]])
			setNameResult(coor[2])
		}, 200)
	}
	return (
		<div className="mappage">
			<div className="mappage__map">
				{newCoords ? (
					<MapContainer center={newCoords} zoom={13} scrollWheelZoom={false}>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						{viewResult ? (
							<ResultMarkers
								lat={newCoords[0]}
								lng={newCoords[1]}
								name={nameResult}
							>
								<h1>nameResult</h1>
							</ResultMarkers>
						) : (
							<LocationMarker />
						)}
					</MapContainer>
				) : (
					<PreLoader />
				)}
			</div>
			<div className="mappage__result">
				<button
					onClick={() => {
						setViewResult(false)
					}}
					className="resultbtn"
				>
					повернутися до карти
				</button>
				<div className="mappage__result__itembox">
					{state
						? state.map((i) => (
								<div key={i.title} className="mappage__result__item">
									<h2>Місце: {i.title}</h2>
									<p>Дата: {i.date}</p>
									<p>Що ловилося: {i.description}</p>
									<p>Оцінка: {i.score}</p>
									<button
										onClick={(e) => {
											getCoords(e)
										}}
										className="resultbtn"
									>
										<p className="resultbtn__info">
											{i.coords[0]} | {i.coords[1]} <br />| {i.title}
										</p>
									</button>
								</div>
						  ))
						: ''}
				</div>
			</div>
		</div>
	)
}

export default MapPage
