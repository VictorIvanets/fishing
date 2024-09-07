import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	JWT_PER_STATE,
	LOG_PER_STATE,
	LoginResponse,
	PREFIX,
	UserPerSate,
	UserState,
} from './login.slice.types'
import { loadState } from './storage'
import axios from 'axios'

const initialState: UserState = {
	jwt: loadState<UserPerSate>(JWT_PER_STATE)?.jwt ?? null,
	login: loadState<UserPerSate>(LOG_PER_STATE)?.login ?? null,
}

export const getlogin = createAsyncThunk(
	'auth/login',
	async (params: { login: string; password: string }) => {
		const { data } = await axios.post<LoginResponse>(`${PREFIX}auth/login`, {
			login: params.login,
			password: params.password,
		})
		return data
	},
)

// export const register = createAsyncThunk(
// 	'auth/register',
// 	async (params: {
// 		login: string
// 		password: string
// 		name: string
// 		subname: string
// 		age: number
// 		sex: string
// 		country: string
// 		city: string
// 		img: string
// 	}) => {
// 		const { data } = await axios.post<RegisterResponse>(
// 			`${PREFIX}/auth/register`,
// 			{
// 				login: params.login,
// 				password: params.password,
// 				name: params.name,
// 				subname: params.subname,
// 				age: +params.age,
// 				sex: params.sex,
// 				country: params.country,
// 				city: params.city,
// 				img: params.img,
// 			},
// 		)
// 		return data
// 	},
// )

// export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
// 	'user/getProfile',
// 	async (_, thunkApi) => {
// 		const jwt = thunkApi.getState().user.jwt
// 		const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
// 			headers: {
// 				Authorization: `Bearer ${jwt}`,
// 			},
// 		})
// 		return data
// 	},
// )

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null
			state.login = null
		},
		clearLoginError: (state) => {
			state.loginErrorMass = undefined
		},
		clearRegisterError: (state) => {
			state.registerErrorMass = undefined
		},
	},

	extraReducers: (builder) => {
		builder.addCase(getlogin.fulfilled, (state, actions) => {
			state.jwt = actions.payload.access_token
			state.login = actions.payload.login
		})

		builder.addCase(getlogin.rejected, (state, action) => {
			state.loginErrorMass = action.error.message
		})

		// builder.addCase(register.fulfilled, (state, actions) => {
		// 	state.login = actions.payload.login
		// })

		// builder.addCase(register.rejected, (state, action) => {
		// 	state.registerErrorMass = action.error.message
		// })
	},
})

export default userSlice.reducer
export const userActions = userSlice.actions
