import { useDispatch } from 'react-redux'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { AppDispath } from '../../../store/store'
import { userActions } from '../../../store/login.slice'
import {
	JWT_PER_STATE,
	LOG_PER_STATE,
	PREFIX,
} from '../../../store/login.slice.types'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { UserData } from './data.types'

function MainPage() {
	const { login } = useParams()
	const dispatch = useDispatch<AppDispath>()
	const navigate = useNavigate()
	const [data, setData] = useState<UserData>()
	const [link, setLink] = useState(false)

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
			<div className="mainpage__fon">
				<img className="mainpage__fon__img" src="../fon.jpg" alt="" />
			</div>
			<div className="mainpage__outlet">
				{link ? (
					<Outlet />
				) : (
					<Link
						onClick={() => setLink(true)}
						className="light tacenter roboto-bold"
						to={`/main/${login}/map`}
					>
						<h1>Вітаю!</h1>
						<h2>Тисни щоб продовжити!</h2>
					</Link>
				)}
			</div>
			<div className="mainpage__navbar">
				<div className="mainpage__navbar__left">
					<Link
						onClick={() => setLink(true)}
						className="mainpage__navbar__left__link tacenter"
						to={`/main/${login}/map`}
					>
						карта
					</Link>
					<Link
						onClick={() => setLink(true)}
						className="mainpage__navbar__left__link tacenter"
						to={`/main/${login}/map`}
					>
						про сайт
					</Link>
				</div>

				<div className="mainpage__navbar__right">
					<div className="mainpage__userinfo">
						<h3 className="colorLight roboto-medium">
							{data?.name} {data?.subname}
						</h3>
						<h3 className="colorLight roboto-medium">{data?.age} років</h3>
						<h3 className="colorLight roboto-medium">
							{data?.city} {data?.country}
						</h3>
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
