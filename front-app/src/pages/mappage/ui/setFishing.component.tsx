import { useState } from 'react'
import { MapResponse } from '../../../store/map.slice.types'

export interface setFishProps {
	i: MapResponse
	getCoords: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	delSet: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export function SetFishing({ i, getCoords, delSet }: setFishProps) {
	const [viewDel, setViewDel] = useState(false)

	return (
		<>
			<div key={i.setID} className="mappage__result__item">
				<h2>Місце: {i.title}</h2>
				<p>Дата: {i.date}</p>
				<p>Що ловилося: {i.description}</p>
				<p>Оцінка: {i.score}</p>
				<div className="resultbtn__btnbox">
					<button
						onClick={(e) => {
							getCoords(e)
						}}
						className="resultbtn"
						data-setid={i.setID}
						data-name={i.title}
						data-lat={i.coords[0]}
						data-lng={i.coords[1]}
					>
						показати на карті
					</button>
					{!viewDel ? (
						<button
							onClick={() => setViewDel(true)}
							className="resultbtndel"
							data-setid={i.setID}
						>
							<p className="resultbtn__info">видалити</p>
						</button>
					) : (
						<div className="resultbtndel__confirm">
							<button
								onClick={(e) => {
									delSet(e)
									setViewDel(false)
								}}
								className="resultbtndel"
								data-setid={i.setID}
							>
								видалити
							</button>
							<button
								onClick={() => setViewDel(false)}
								className="resultbtndel"
								data-setid={i.setID}
							>
								відмінити
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default SetFishing
