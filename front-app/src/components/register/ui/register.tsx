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
		const { login, password, name, subname, age, sex, country, city, img } =
			target
		if (
			login.value.length &&
			password.value.length &&
			name.value.length &&
			subname.value.length &&
			age.value > 10 &&
			sex.value.length &&
			country.value.length &&
			city.value.length &&
			img.value.length
		) {
			setValid('')
			await sendLogin(
				login.value,
				password.value,
				name.value,
				subname.value,
				age.value,
				sex.value,
				country.value,
				city.value,
				img.value,
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
		age: number,
		sex: string,
		country: string,
		city: string,
		img: string,
	) => {
		dispatch(
			register({
				login,
				password,
				name,
				subname,
				age,
				sex,
				country,
				city,
				img,
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
				<input placeholder="age" name="age" type="text" />
				<input placeholder="sex" name="sex" type="text" />
				<input placeholder="country" name="country" type="text" />
				<input placeholder="city" name="city" type="text" />
				<input placeholder="img" name="img" type="text" />
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
