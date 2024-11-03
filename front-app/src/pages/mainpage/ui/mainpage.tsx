import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
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
import iconfishpage_back from '/iconfishpage_back.svg'
import iconfishpage_foto from '/iconfishpage_foto.svg'
import iconfishpage_map from '/iconfishpage_map.svg'
import iconfishpage_chat from '/iconfishpage_chat.svg'
import iconfishpage_info from '/iconfishpage_info.svg'
import exit from '/exit.svg'

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
					<NavLink
						title="КАРТА"
						className="mainpage__navbar__left__link tacenter"
						to={`/main/${login}/map`}
					>
						<div className="mainpage__svgbox">
							<img
								src={iconfishpage_map}
								className="mainpage__svgbox__svg"
								alt="КАРТА"
							/>
						</div>
					</NavLink>
					<NavLink
						title="ПРАВИЛА"
						className="mainpage__navbar__left__link tacenter"
						to={`/main/${login}/about`}
					>
						<div className="mainpage__svgbox">
							<img
								src={iconfishpage_info}
								className="mainpage__svgbox__svg"
								alt="ПРАВИЛА"
							/>
						</div>
					</NavLink>
					<NavLink
						title="ГАЛЕРЕЯ"
						className="mainpage__navbar__left__link tacenter"
						to={`/main/${login}/galery`}
					>
						<div className="mainpage__svgbox">
							<img
								src={iconfishpage_foto}
								className="mainpage__svgbox__svg"
								alt="ГАЛЕРЕЯ"
							/>
						</div>
					</NavLink>
					{login && userId ? (
						<NavLink
							title="ЧАТ"
							onClick={() => userInByUserName(login, userId)}
							className="mainpage__navbar__left__link tacenter chaticon"
							to={`/chat`}
						>
							<div className="mainpage__svgbox">
								<img
									src={iconfishpage_chat}
									className="mainpage__svgbox__svg chaticon"
									alt="ЧАТ"
								/>
							</div>
						</NavLink>
					) : (
						''
					)}
					<div
						title="НАЗАД"
						onClick={() => navigate(-1)}
						className="mainpage__navbar__left__link tacenter"
					>
						<div className="mainpage__svgbox">
							<img
								src={iconfishpage_back}
								className="mainpage__svgbox__svg"
								alt="НАЗАД"
							/>
						</div>
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
					<button title="ВИЙТИ" className="exiticon" onClick={logOut}>
						<div className="mainpage__svgbox">
							<img
								src={exit}
								className="mainpage__svgbox__svg exiticon"
								alt="ВИЙТИ"
							/>
						</div>
					</button>
				</div>
			</div>
		</div>
	)
})

export default MainPage
