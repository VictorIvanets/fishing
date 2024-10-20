import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { MapResponse } from './map.slice.types'
import { PREFIX } from '../app/prefix'

export interface InitState {
	data: MapResponse[]
	errorMassege: string | undefined
}

const initialState: InitState = {
	data: [],
	errorMassege: '',
}

export const setSets = createAsyncThunk('set/sets', async (login: string) => {
	const { data } = await axios.get<MapResponse[]>(`${PREFIX}fishsets/${login}`)
	return data
})

export const setSlice = createSlice({
	name: 'set',
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder.addCase(setSets.fulfilled, (state, actions) => {
			state.data = actions.payload
		})

		builder.addCase(setSets.rejected, (state, action) => {
			state.errorMassege = action.error.message
		})
	},
})

export default setSlice.reducer
export const setActions = setSlice.actions
