import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { PREFIX } from './login.slice.types'
import { Coords, InitState, MapResponse } from './map.slice.types'

const initialState: InitState = {
	data: [],
	errorMassege: '',
}

export const setSets = createAsyncThunk(
	'map/sets',
	async (params: {
		title: string
		description: string
		score: number
		date: number
		coords: Coords
		setID: number
		login: string | undefined | null
		weather: object[] | string
	}) => {
		const { data } = await axios.post<MapResponse>(`${PREFIX}fishsets/sets`, {
			login: params.login,
			description: params.description,
			title: params.title,
			score: params.score,
			date: params.date,
			coords: params.coords,
			setID: +params.setID,
			weather: params.weather,
		})
		return data
	},
)

export const mapSlice = createSlice({
	name: 'map',
	initialState,
	reducers: {
		clearState: (state) => {
			state.data = []
		},
	},

	extraReducers: (builder) => {
		builder.addCase(setSets.fulfilled, (state, actions) => {
			state.data.push(actions.payload)
		})

		builder.addCase(setSets.rejected, (state, action) => {
			state.errorMassege = action.error.message
		})
	},
})

export default mapSlice.reducer
export const mapActions = mapSlice.actions
