import { useDispatch } from 'react-redux'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { AppDispath } from '../../../store/store'
import { userActions } from '../../../store/login.slice'
import { JWT_PER_STATE, LOG_PER_STATE } from '../../../store/login.slice.types'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { UserData } from './data.types'
import { PREFIX } from '../../../app/prefix'

function MainPage() {
	const { login } = useParams()
	const dispatch = useDispatch<AppDispath>()
	const navigate = useNavigate()
	const [data, setData] = useState<UserData>()

	useEffect(() => {
		;(async function load(): Promise<void> {
			const { data } = await axios.get<UserData>(`${PREFIX}auth/${login}`)
			setData(data)
		})()
	}, [login])

	const logOut = () => {
		dispatch(userActions.logout())
		localStorage.removeItem(JWT_PER_STATE)
		localStorage.removeItem(LOG_PER_STATE)
		navigate('/')
	}

	return (
		<div className="mainpage">
			<div className="mainpage__outlet">
				<Outlet />
			</div>
			<div className="mainpage__navbar">
				<div className="mainpage__navbar__left">
					<Link
						className="mainpage__navbar__left__link tacenter"
						to={`/main/${login}/map`}
					>
						до карти
					</Link>
					<Link
						className="mainpage__navbar__left__link tacenter"
						to={`/main/${login}/about`}
					>
						про сайт
					</Link>
					<Link
						// onClick={() => navigate(-1)}
						className="mainpage__navbar__left__link tacenter"
						to={`/main/${login}/galery`}
					>
						галерея
					</Link>
					<div
						onClick={() => navigate(-1)}
						className="mainpage__navbar__left__link tacenter"
					>
						<p className="">назад</p>
					</div>
				</div>

				<div className="mainpage__navbar__right">
					<div className="mainpage__userinfo">
						<h3 className="colorLight roboto-medium">
							{data?.name} {data?.subname}
						</h3>
						<h3 className="colorLight roboto-medium">{data?.city}</h3>
						<h3 className="colorLight roboto-medium">{data?.country}</h3>
					</div>
					<button
						className="mainpage__navbar__left__link tacenter"
						onClick={logOut}
					>
						Вийти
					</button>
				</div>
			</div>
		</div>
	)
}

export default MainPage
