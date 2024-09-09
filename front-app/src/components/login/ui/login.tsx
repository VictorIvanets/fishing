import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginForm } from './login.types'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispath, RootState } from '../../../store/store'
import { getlogin, userActions } from '../../../store/login.slice'

function Login() {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispath>()
	const { login, jwt, loginErrorMass } = useSelector((s: RootState) => s.user)
	const [inputValue, setInputValue] = useState(false)
	const [errorValue, setErrorValue] = useState('')

	useEffect(() => {
		if (loginErrorMass === 'Request failed with status code 401') {
			setErrorValue('невірний логін або пароль')
		}
		if (loginErrorMass === 'Network Error') {
			setErrorValue('сервер не відповідає')
		}

		console.log(loginErrorMass)
		if (jwt) {
			navigate(`/main/${login}`)
		}
	}, [jwt, navigate, login, loginErrorMass])

	const submit = async (e: FormEvent) => {
		e.preventDefault()
		dispatch(userActions.clearLoginError())
		const target = e.target as typeof e.target & LoginForm
		const { login, password } = target
		if (login.value.length > 2 && password.value.length > 2) {
			setInputValue(false)
			await sendLogin(login.value, password.value)
		} else {
			setInputValue(true)
		}
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
					<p className="margin1 active roboto-bold">{errorValue}</p>
				) : (
					''
				)}
				{inputValue ? (
					<p className="margin1 active roboto-bold">заповніть всі поля</p>
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
