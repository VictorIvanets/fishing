import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { MapResponse } from './map.slice.types'
import { PREFIX } from '../app/prefix'

export interface InitState {
	alldata: MapResponse[]
	errorMassege: string | undefined
}

const initialState: InitState = {
	alldata: [],
	errorMassege: '',
}

export const allSetSets = createAsyncThunk('allset/sets', async () => {
	const { data } = await axios.get<MapResponse[]>(
		`${PREFIX}fishsets/all/database`,
	)
	return data
})

export const allsetSlice = createSlice({
	name: 'allset',
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder.addCase(allSetSets.fulfilled, (state, actions) => {
			state.alldata = actions.payload
		})

		builder.addCase(allSetSets.rejected, (state, action) => {
			state.errorMassege = action.error.message
		})
	},
})

export default allsetSlice.reducer
export const setActions = allsetSlice.actions
