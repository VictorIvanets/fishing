import { useState } from 'react'
import { MapResponse } from '../../../store/map.slice.types'

export interface setFishProps {
	i: MapResponse
	getCoords: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	delSet: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	setViewAllstate: React.Dispatch<React.SetStateAction<boolean>>
}

export function SetFishing({
	i,
	getCoords,
	delSet,
	setViewAllstate,
}: setFishProps) {
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
							setViewAllstate(false)
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
							<h2>Ви дійсно хочете видалити?</h2>
							<div className="resultbtndel__confirm__btn">
								<button
									onClick={(e) => {
										delSet(e)
										setViewDel(false)
									}}
									className="resultbtndel"
									data-setid={i.setID}
								>
									так
								</button>
								<button
									onClick={() => setViewDel(false)}
									className="resultbtndel"
									data-setid={i.setID}
								>
									відміна
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default SetFishing
