import {
	// createAsyncThunk,
	createSlice,
} from '@reduxjs/toolkit'
// import { loadState } from './storage'
// import axios from 'axios'

type Coords = [number, number]

export interface MapState {
	title: string
	description: string
	score: number
	date: number
	coords: Coords
}

const initialState: MapState[] = []

// export const getlogin = createAsyncThunk(
// 	'auth/login',
// 	async (params: { login: string; password: string }) => {
// 		const { data } = await axios.post<LoginResponse>(`${PREFIX}auth/login`, {
// 			login: params.login,
// 			password: params.password,
// 		})
// 		return data
// 	},
// )

export const mapSlice = createSlice({
	name: 'map',
	initialState,
	reducers: {
		setFishing: (state, action) => {
			state.push(action.payload)
		},
	},

	// extraReducers: (builder) => {
	// 	builder.addCase(getlogin.fulfilled, (state, actions) => {
	// 		state.jwt = actions.payload.access_token
	// 		state.login = actions.payload.login
	// 	})

	// 	builder.addCase(getlogin.rejected, (state, action) => {
	// 		state.loginErrorMass = action.error.message
	// 	})

	// 	// builder.addCase(register.fulfilled, (state, actions) => {
	// 	// 	state.login = actions.payload.login
	// 	// })

	// 	// builder.addCase(register.rejected, (state, action) => {
	// 	// 	state.registerErrorMass = action.error.message
	// 	// })
	// },
})

export default mapSlice.reducer
export const mapActions = mapSlice.actions
