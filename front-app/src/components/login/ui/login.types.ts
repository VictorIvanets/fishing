export type LoginForm = {
	login: {
		value: string
	}
	password: {
		value: string
	}
}

export type RegisterForm = {
	login: {
		value: string
	}
	password: {
		value: string
	}
	name: {
		value: string
	}
	subname: {
		value: string
	}
	age: {
		value: number
	}
	sex: {
		value: string
	}
	country: {
		value: string
	}
	city: {
		value: string
	}
	img: {
		value: string
	}
}

// login: params.login
// password: params.password
// name: params.name
// subname: params.subname
// age: +params.age
// sex: params.sex
// country: params.country
// city: params.city
// img: params.img

// login.value.length &&
// 	password.value.length &&
// 	name.value.length &&
// 	subname.value.length &&
// 	age.value.length &&
// 	sex.value.length &&
// 	country.value.length &&
// 	city.value.length &&
// 	img.value.length
