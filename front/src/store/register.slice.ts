import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { loginServices } from "src/services/Login.services"
import type { RegisterPayloadT, RegisterState } from "src/types/auth.types"

const initialState: RegisterState = {
  data: null,
  isLoading: false,
  errorMassege: undefined,
}

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (params: RegisterPayloadT) => {
    return await loginServices.register(params)
  }
)

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    clearRegister: (state) => {
      state.data = null
    },
  },

  extraReducers: (builder) => {
    builder.addCase(registerThunk.pending, (state) => {
      state.errorMassege = undefined
      state.isLoading = true
    })

    builder.addCase(registerThunk.fulfilled, (state, actions) => {
      state.data = actions.payload
      state.isLoading = false
    })

    builder.addCase(registerThunk.rejected, (state, action) => {
      state.errorMassege = action.error.message
      state.isLoading = false
    })
  },
})

export default registerSlice.reducer
export const userActions = registerSlice.actions
