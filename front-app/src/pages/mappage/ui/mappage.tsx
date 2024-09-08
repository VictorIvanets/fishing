import { MapContainer, TileLayer } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { PreLoader } from '../../../widgets/PreLoader'
import { LocationMarker, ResultMarkers } from './helpers/locationMarkers'
import { LatLngExpression, LatLngTuple } from 'leaflet'

function MapPage() {
	const [coords, setCoords] = useState<GeolocationPosition>()
	const [viewResult, setViewResult] = useState(false)
	const [newCoords, setNewCoords] = useState<LatLngTuple>()

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
	}, [])

	function getCoords(e: any) {
		setViewResult(!viewResult)
		setNewCoords(undefined)
		const coor = e.target.textContent.split(' | ')
		setTimeout(() => {
			setNewCoords([+coor[0], +coor[1]])
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
							<ResultMarkers lat={newCoords[0]} lng={newCoords[1]} />
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
					onClick={(e) => {
						getCoords(e)
					}}
					className="resultbtn"
				>
					50.22520736604394 | 28.58642542192887
				</button>
			</div>
		</div>
	)
}

export default MapPage
