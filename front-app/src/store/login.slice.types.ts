export const JWT_PER_STATE = 'userData'
export const LOG_PER_STATE = 'userName'

export interface UserState {
	jwt: string | null
	loginErrorMass?: string
	login?: string | null
	registerErrorMass?: string
	errorMassege?: string | null
}

export interface UserRegisterState {
	login: string | null
	password: string | null
	name: string | null
	subname: string | null
	age: number | null
	sex: string | null
	country: string | null
	city: string | null
	img: string | null
	loginErrorMass?: string
	registerErrorMass?: string
	errorMassege?: string | null
}

export interface UserPerSate {
	jwt: string | null
	login: string | null
}

export interface Profile {
	id: number
	email: string
	name: string
	phone: string
	address: string
}

export interface LoginResponse {
	access_token: string
	login?: string
	message?: string
}

export interface RegisterResponse {
	login: string
	password: string
	name: string
	subname: string
	age: number
	sex: string
	country: string
	city: string
	img: string
}

export const PREFIX = 'http://localhost:5550/api/'
export const PREFIX_STATIC = 'http://localhost:5550/'
