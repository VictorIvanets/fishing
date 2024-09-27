import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	JWT_PER_STATE,
	LOG_PER_STATE,
	LoginResponse,
	UserPerSate,
	UserState,
} from './login.slice.types'
import { loadState } from './storage'
import axios from 'axios'
import { PREFIX } from '../app/prefix'

const initialState: UserState = {
	jwt: loadState<UserPerSate>(JWT_PER_STATE)?.jwt ?? null,
	login: loadState<UserPerSate>(LOG_PER_STATE)?.login ?? null,
	isLoading: false,
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
		isLoadingFalse: (state, action) => {
			state.isLoading = action.payload
		},
	},

	extraReducers: (builder) => {
		builder.addCase(getlogin.pending, (state) => {
			state.loginErrorMass = undefined
			state.isLoading = true
		})

		builder.addCase(getlogin.fulfilled, (state, actions) => {
			state.jwt = actions.payload.access_token
			state.login = actions.payload.login
			state.isLoading = false
		})

		builder.addCase(getlogin.rejected, (state, action) => {
			state.loginErrorMass = action.error.message
			state.isLoading = false
		})
	},
})

export default userSlice.reducer
export const userActions = userSlice.actions
