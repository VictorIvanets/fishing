import { useState } from 'react'
import { MapResponse } from '../../../store/map.slice.types'
import { Link } from 'react-router-dom'
import iconfishpage_del from '/iconfishpage_del.svg'
import iconfishpage_cancel from '/iconfishpage_cancel.svg'
import iconfishpage_ok from '/iconfishpage_ok.svg'

export interface setFishProps {
	i: MapResponse
	getCoords: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	delSet: (setID: number) => void
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
				<Link to={`/main/${i.login}/sets/${i.setID}`}>
					<h2 className="marginbottom1 white">Місце: {i.title}</h2>
					<p>Дата: {i.date}</p>
					<p>Що ловилося: {i.description}</p>
					<p>Оцінка: {i.score}</p>
				</Link>

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
						<div
							onClick={() => setViewDel(true)}
							className="resultbtndel"
							data-setid={i.setID}
						>
							<div className="delsvgbox">
								<img
									title="ВИДАЛИТИ"
									src={iconfishpage_del}
									className="delsvgitem"
									alt="ВИДАЛИТИ"
								/>
							</div>
						</div>
					) : (
						<div className="resultbtndel__confirm">
							<h2 className="tacenter">Ви дійсно хочете видалити?</h2>
							<div className="resultbtndel__confirm__btn">
								<button
									onClick={() => {
										delSet(i.setID)
										setViewDel(false)
									}}
									className="resultbtndelconfirm"
									data-setid={i.setID}
								>
									<div onClick={() => console.log('DIV')} className="delsvgbox">
										<img
											title="ВИДАЛИТИ"
											src={iconfishpage_ok}
											className="delsvgitem"
											alt="ВИДАЛИТИ"
										/>
									</div>
								</button>
								<button
									onClick={() => setViewDel(false)}
									className="resultbtndelconfirm"
									data-setid={i.setID}
								>
									<div className="delsvgbox">
										<img
											title="ВІДМІНИТИ"
											src={iconfishpage_cancel}
											className="delsvgitem"
											alt="ВІДМІНИТИ"
										/>
									</div>
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
