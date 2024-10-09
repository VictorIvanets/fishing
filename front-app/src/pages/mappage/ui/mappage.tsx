import { MapContainer, TileLayer } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { PreLoader } from '../../../widgets/PreLoader'
import { LocationMarker, ResultMarkers } from './helpers/locationMarkers'
import { LatLngExpression, LatLngTuple } from 'leaflet'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { fetchAllState, fetchDelState, fetchState } from './helpers/loadState'
import { MapResponse } from '../../../store/map.slice.types'
import SetFishing from './setFishing.component'
import { getWeatherApi } from './helpers/getWeather'
import Weather from '../../../widgets/wather/ui/weather'
import Filter from './filter/filter'

function MapPage() {
	const [coords, setCoords] = useState<GeolocationPosition>()
	const [viewResult, setViewResult] = useState(false)
	const [nameResult, setNameResult] = useState('')
	const [idResult, setIdResult] = useState('')
	const [loadState, setloadState] = useState<MapResponse[]>([])
	const [newCoords, setNewCoords] = useState<LatLngTuple>()
	const state = useSelector((s: RootState) => s.map.data)
	const login = useSelector((s: RootState) => s.user.login)
	const [deleteSet, setDeleteSet] = useState(false)
	const [loadAllState, setloadAllState] = useState<MapResponse[]>([])
	const [viewAllstate, setViewAllstate] = useState(false)
	const [viewResetAllset, setViewResetAllset] = useState(false)
	const [weather, setWeather] = useState<string | object[]>()
	const [filterByValue, setFilterByValue] = useState<string | null>(null)
	const [filterloadAllState, setfilterloadAllState] = useState<MapResponse[]>(
		[],
	)

	useEffect(() => {
		if (login) {
			const data = fetchState(login)
			data.then((sets) => {
				if (sets && typeof sets === 'object') {
					setloadState(sets.reverse())
				}
				if (sets && typeof sets === 'string') {
					console.log(sets)
				}
			})
		}
	}, [login, state, deleteSet])

	function viewAll() {
		setViewAllstate(true)
		setViewResult(false)
		setViewResetAllset(true)
	}
	function notViewAll() {
		setViewAllstate(false)
		setViewResult(false)
		setViewResetAllset(false)
	}

	useEffect(() => {
		const data = fetchAllState()
		data.then((allSets) => {
			if (allSets && typeof allSets === 'object') {
				setloadAllState(allSets)
			}
			if (allSets && typeof allSets === 'string') {
				console.log(allSets)
			}
		})
	}, [viewAllstate])

	useEffect(() => {
		if (coords) {
			const normalCords: LatLngExpression | undefined = [
				coords?.coords.latitude,
				coords?.coords.longitude,
			]
			setNewCoords(normalCords)
			const weather = getWeatherApi(normalCords[0], normalCords[1])
			weather.then((res) => setWeather(res))
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

	async function delSet(e: any) {
		const id = e.target.dataset.setid
		if (id) {
			const response = await fetchDelState(`${id}`)
			setDeleteSet(!deleteSet)
			console.log(response)
			setViewResult(false)
		}
	}

	function getCoords(e: any) {
		setViewResult(true)
		setNewCoords(undefined)
		const coor = [e.target.dataset.lat, e.target.dataset.lng]
		if (e.target.dataset.lat && e.target.dataset.lng) {
			setTimeout(() => {
				setNewCoords([+coor[0], +coor[1]])
				setNameResult(e.target.dataset.name)
				setIdResult(e.target.dataset.setid)
			}, 50)
		}
	}

	useEffect(() => {
		if (filterByValue) {
			const filterItems = loadAllState.filter((i) => {
				i.description.toLowerCase()
				if (i.description.toLowerCase().includes(filterByValue)) {
					return i
				}
			})
			setfilterloadAllState(filterItems)
		} else {
			setfilterloadAllState(loadAllState)
		}
	}, [filterByValue, loadAllState])

	return (
		<div className="mappage">
			<div className="mappage__map">
				{newCoords && !isNaN(newCoords[0]) ? (
					<MapContainer center={newCoords} zoom={12} scrollWheelZoom={true}>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						{viewResult ? (
							<ResultMarkers
								lat={newCoords[0]}
								lng={newCoords[1]}
								name={nameResult}
								setId={idResult}
							></ResultMarkers>
						) : viewAllstate ? (
							filterloadAllState.map((i) => (
								<ResultMarkers
									key={i.setID}
									lat={i.coords[0]}
									lng={i.coords[1]}
									name={i.title}
									setId={i.setID}
								></ResultMarkers>
							))
						) : (
							<LocationMarker />
						)}
					</MapContainer>
				) : (
					<PreLoader />
				)}
			</div>
			<div className="mappage__result">
				{viewResetAllset ? (
					<Filter notViewAll={notViewAll} setFilterByValue={setFilterByValue} />
				) : (
					<button
						onClick={() => {
							viewAll()
						}}
						className="resultbtn"
					>
						показати усі місця
					</button>
				)}
				<div className="mappage__result__itembox">
					{loadState
						? loadState.map((i) => (
								<SetFishing
									key={i.setID}
									i={i}
									getCoords={getCoords}
									delSet={delSet}
									setViewAllstate={setViewAllstate}
								/>
						  ))
						: ''}
				</div>
				{weather ? (
					<div className="weatherpopup">
						<Weather weather={weather} />
					</div>
				) : (
					''
				)}
			</div>
		</div>
	)
}

export default MapPage
