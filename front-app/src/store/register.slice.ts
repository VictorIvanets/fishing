import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	PREFIX,
	RegisterResponse,
	UserRegisterState,
} from './login.slice.types'
import axios from 'axios'

const initialState: UserRegisterState = {
	login: null,
	password: null,
	name: null,
	subname: null,
	age: null,
	sex: null,
	country: null,
	city: null,
	img: null,
}

export const register = createAsyncThunk(
	'auth/register',
	async (params: {
		login: string
		password: string
		name: string
		subname: string
		age: number
		sex: string
		country: string
		city: string
		img: string
	}) => {
		const { data } = await axios.post<RegisterResponse>(
			`${PREFIX}auth/register`,
			{
				login: params.login,
				password: params.password,
				name: params.name,
				subname: params.subname,
				age: +params.age,
				sex: params.sex,
				country: params.country,
				city: params.city,
				img: params.img,
			},
		)
		return data
	},
)

export const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {
		clearLoginError: (state) => {
			state.loginErrorMass = undefined
		},
		clearState: (state) => {
			state.login = null
		},
		clearRegisterError: (state) => {
			state.registerErrorMass = undefined
		},
	},

	extraReducers: (builder) => {
		builder.addCase(register.fulfilled, (state, actions) => {
			state.name = actions.payload.name
			state.password = actions.payload.password
			state.login = actions.payload.login
		})

		builder.addCase(register.rejected, (state, action) => {
			state.registerErrorMass = action.error.message
		})
	},
})

export default registerSlice.reducer
export const userActions = registerSlice.actions
