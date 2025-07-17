import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { CoordsT, MapState } from "src/types/map.types"

const initialState: MapState = {
  coords: undefined,
  errorMassege: undefined,
  isLoading: false,
}

export const coordsThunk = createAsyncThunk<CoordsT>(
  "map/coords",
  async (_, { rejectWithValue }) => {
    try {
      const coords = await new Promise<CoordsT>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          },
          (error) => {
            reject(new Error("Error getting user location: " + error.message))
          }
        )
      })
      return coords
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const MapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(coordsThunk.pending, (state) => {
      state.errorMassege = undefined
      state.isLoading = true
    })

    builder.addCase(coordsThunk.fulfilled, (state, actions) => {
      state.coords = actions.payload
      state.isLoading = false
    })

    builder.addCase(coordsThunk.rejected, (state, action) => {
      state.errorMassege = action.error.message
      state.isLoading = false
    })
  },
})

export default MapSlice.reducer
export const userActions = MapSlice.actions
