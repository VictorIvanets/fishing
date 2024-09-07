import { FormEvent, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginForm } from './login.types'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispath, RootState } from '../../../store/store'
import { getlogin, userActions } from '../../../store/login.slice'

function Login() {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispath>()
	const { login, jwt, loginErrorMass } = useSelector((s: RootState) => s.user)

	useEffect(() => {
		if (jwt) {
			navigate(`/main/${login}`)
		}
	}, [jwt, navigate, login])

	const submit = async (e: FormEvent) => {
		e.preventDefault()
		dispatch(userActions.clearLoginError())
		const target = e.target as typeof e.target & LoginForm
		const { login, password } = target
		await sendLogin(login.value, password.value)
	}

	const sendLogin = async (login: string, password: string) => {
		dispatch(getlogin({ login, password }))
	}

	return (
		<div className="loginpage">
			<h2 className="roboto-thin colorLight"> вхід </h2>
			<form onSubmit={submit}>
				<input name="login" id="login" placeholder="login" type="text" />
				<input
					name="password"
					type="password"
					id="password"
					placeholder="password"
				/>
				{loginErrorMass ? (
					<p className="margin1 active roboto-bold">
						невірний логін або пароль
					</p>
				) : (
					''
				)}
				<button>Вхід</button>
			</form>
			<Link className="light roboto-regular" to="/register">
				зареєструйтеся
			</Link>
		</div>
	)
}

export default Login
