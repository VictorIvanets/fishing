import { Link, NavLink, useParams } from 'react-router-dom'
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
			<div className="infopage__infobox">
				<h3>
					Загальна кількисть <br />
					рибалок в базі: {alldata?.length}
				</h3>
				<br />
				<h3>Кількисть моїх рибалок: {data?.length}</h3>
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

			<NavLink className="infopage__linkbox" to={`/main/${login}/map`}>
				<h1 className="tacenter">Get Started</h1>
				<div className="infopage__linkbox__circle"></div>
			</NavLink>
		</div>
	)
}

export default InfoPage
