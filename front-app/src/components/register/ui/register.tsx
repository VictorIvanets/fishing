import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterForm } from '../../login/ui/login.types'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispath, RootState } from '../../../store/store'
import { register, registerSlice } from '../../../store/register.slice'

function Register() {
	const dispatch = useDispatch<AppDispath>()
	const { name, login } = useSelector((s: RootState) => s.register)
	const navigate = useNavigate()
	const [valid, setValid] = useState('')

	useEffect(() => {
		if (login) {
			navigate(`/login`)
			dispatch(registerSlice.actions.clearState())
		}
		console.log(name, login)
	}, [name, login, navigate, dispatch])

	const submit = async (e: FormEvent) => {
		e.preventDefault()
		const target = e.target as typeof e.target & RegisterForm
		const { login, password, name, subname, country, city } = target
		if (
			login.value.length &&
			password.value.length &&
			name.value.length &&
			subname.value.length &&
			country.value.length &&
			city.value.length
		) {
			setValid('')
			await sendLogin(
				login.value,
				password.value,
				name.value,
				subname.value,
				country.value,
				city.value,
			)
		} else {
			setValid('не всі поля заповнені')
		}
	}
	const sendLogin = async (
		login: string,
		password: string,
		name: string,
		subname: string,
		country: string,
		city: string,
	) => {
		dispatch(
			register({
				login,
				password,
				name,
				subname,
				country,
				city,
			}),
		)
	}

	return (
		<div className="registerpage">
			<h2 className="roboto-thin colorLight"> реєстрація </h2>
			<p>заповніть форму</p>
			<form onSubmit={submit}>
				<input placeholder="login" name="login" type="text" />
				<input placeholder="password" name="password" type="text" />
				<input placeholder="name" name="name" type="text" />
				<input placeholder="subname" name="subname" type="text" />
				<input placeholder="country" name="country" type="text" />
				<input placeholder="city" name="city" type="text" />
				{valid ? <p className="margin1 active roboto-bold">{valid}</p> : ''}
				<button>зареєструвати</button>
			</form>
			<Link className="light" to="/login">
				Вхід
			</Link>
		</div>
	)
}

export default Register
