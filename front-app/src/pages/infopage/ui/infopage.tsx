import { Link, useParams } from 'react-router-dom'
import { AppDispath, RootState } from '../../../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { setSets } from '../../../store/set.slise'
import { useEffect } from 'react'
import { allSetSets } from '../../../store/allset.slice'

function InfoPage() {
	const { login } = useParams()
	const dispatch = useDispatch<AppDispath>()
	const { data } = useSelector((s: RootState) => s.set)
	const { alldata } = useSelector((s: RootState) => s.allset)

	useEffect(() => {
		if (login) {
			dispatch(setSets(login))
			dispatch(allSetSets())
		}
	}, [dispatch, login])

	return (
		<div className="infopage">
			<h3>
				Загальна кількисть <br />
				рибалок в базі: <br /> {alldata?.length}{' '}
			</h3>
			<br />
			<h2>
				Кількисть моїх рибалок: <br />
				{data?.length}
			</h2>
			<br />
			<div className="infopage__itembox">
				{data.map((i) => (
					<div className="infopage__itembox__item" key={i.setID}>
						<Link to={`/main/${login}/sets/${i.setID}`}>
							<h3>{i.title}</h3>
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}

export default InfoPage
