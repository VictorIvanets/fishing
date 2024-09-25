import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { RootState } from '../../../store/store'

function AuthLayout() {
	const [viewLogin, setViewLogin] = useState(false)
	const { login, jwt } = useSelector((s: RootState) => s.user)

	return (
		<div className="startpage">
			<div className="startpage__info">
				<div className="startpage__info__logo">
					<img src="../fishapp/logo.png" alt="" />
				</div>
				<h1 className="cyrillicextrabold colorLight">MY FISHING</h1>
				<Link className="light tacenter roboto-light" to={`/rules`}>
					<p>правила користування</p>
				</Link>
			</div>

			<div className="startpage__auth">
				{!viewLogin ? (
					!jwt ? (
						<Link
							onClick={() => setViewLogin(true)}
							className="light tacenter roboto-regular"
							to={`/login`}
						>
							Щоб продовжити, <br /> увійдіть у свій кабінет <br /> <br /> Вхід
						</Link>
					) : (
						<Link
							onClick={() => setViewLogin(true)}
							className="light tacenter roboto-bold"
							to={`/main/${login}`}
						>
							мій кабінет
						</Link>
					)
				) : (
					<Outlet />
				)}
			</div>
		</div>
	)
}

export default AuthLayout
