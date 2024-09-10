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
		const data = await axios.post<LoginResponse>(`${PREFIX}auth/login`, {
			login: params.login,
			password: params.password,
		})
		return data.data
	},
)

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
	},

	extraReducers: (builder) => {
		builder.addCase(getlogin.fulfilled, (state, actions) => {
			state.jwt = actions.payload.access_token
			state.login = actions.payload.login
		})

		builder.addCase(getlogin.rejected, (state, action) => {
			state.loginErrorMass = action.error.message
		})
	},
})

export default userSlice.reducer
export const userActions = userSlice.actions
