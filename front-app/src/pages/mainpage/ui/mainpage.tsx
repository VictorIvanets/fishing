import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AppDispath, RootState } from '../../../store/store'
import { userActions } from '../../../store/login.slice'
import {
	JWT_PER_STATE,
	LOG_PER_STATE,
	USERID_PER_STATE,
} from '../../../store/login.slice.types'
import { memo, useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { UserData } from './data.types'
import { PREFIX } from '../../../app/prefix'
import { useCheckIn, useCheckOut } from '../../chat/ui/glq_hooks/chatUser.hook'

const MainPage = memo(() => {
	const dispatch = useDispatch<AppDispath>()
	const navigate = useNavigate()
	const [data, setData] = useState<UserData>()
	const { userInByUserName } = useCheckIn()
	const { login, userId } = useSelector((s: RootState) => s.user)
	const { userOutByUserId } = useCheckOut()

	useEffect(() => {
		;(async function load(): Promise<void> {
			const { data } = await axios.get<UserData>(`${PREFIX}auth/${login}`)
			setData(data)
		})()
	}, [login])

	const logOut = useCallback(() => {
		dispatch(userActions.logout())
		localStorage.removeItem(JWT_PER_STATE)
		localStorage.removeItem(LOG_PER_STATE)
		localStorage.removeItem(USERID_PER_STATE)
		if (userId) userOutByUserId(userId)
		navigate('/')
	}, [dispatch, navigate, userId, userOutByUserId])

	useEffect(() => {
		userOutByUserId(userId ? userId : '')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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
						className="mainpage__navbar__left__link tacenter"
						to={`/main/${login}/galery`}
					>
						галерея
					</Link>
					{login && userId ? (
						<Link
							onClick={() => userInByUserName(login, userId)}
							className="mainpage__navbar__left__link tacenter"
							to={`/chat`}
						>
							чат
						</Link>
					) : (
						''
					)}
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
})

export default MainPage
