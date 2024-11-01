import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { RootState } from '../../../store/store'
import { useCheckOut } from '../../chat/ui/glq_hooks/chatUser.hook'

function AuthLayout() {
	const [viewLogin, setViewLogin] = useState(false)
	const { login, jwt, userId } = useSelector((s: RootState) => s.user)
	const { userOutByUserId } = useCheckOut()

	useEffect(() => {
		return () => {
			userOutByUserId(userId ? userId : '')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className={`startpage ${viewLogin ? 'hiddenlogo authrow' : ''}`}>
			<div className="startpage__info">
				<div className="startpage__info__logo">
					<img src="../fishapp/logoMf-01.svg" alt="" />
				</div>
				<Link className="light tacenter roboto-light" to={`/rules`}>
					правила користування
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
