import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { loadState } from "./storage"
import { STORAGE_KEYS_ACCESS_TOKEN } from "src/api/PREFIX"
import { loginServices } from "src/services/Login.services"
import type { LoginAuthState, UserState } from "src/types/auth.types"

const initialState: UserState = {
  authinfo: loadState<LoginAuthState>(STORAGE_KEYS_ACCESS_TOKEN) ?? undefined,
  isLoading: false,
  errorMassege: undefined,
  userInfo: null,
}

export const authThunk = createAsyncThunk(
  "auth/login",
  async (params: { login: string; password: string }) => {
    return await loginServices.login({
      login: params.login,
      password: params.password,
    })
  }
)
export const userThunk = createAsyncThunk("auth/user", async () => {
  return await loginServices.userInfo()
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.authinfo = undefined
      state.userInfo = null
    },
    clearLoginError: (state) => {
      state.errorMassege = undefined
    },
    isLoadingFalse: (state, action) => {
      state.isLoading = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(authThunk.pending, (state) => {
      state.errorMassege = undefined
      state.isLoading = true
    })

    builder.addCase(authThunk.fulfilled, (state, actions) => {
      state.authinfo = actions.payload
      state.isLoading = false
    })

    builder.addCase(authThunk.rejected, (state, action) => {
      state.errorMassege = action.error.message
      state.isLoading = false
    })
    builder.addCase(userThunk.pending, (state) => {
      state.errorMassege = undefined
      state.isLoading = true
    })

    builder.addCase(userThunk.fulfilled, (state, actions) => {
      state.userInfo = actions.payload
      state.isLoading = false
    })

    builder.addCase(userThunk.rejected, (state, action) => {
      state.errorMassege = action.error.message
      state.isLoading = false
    })
  },
})

export default authSlice.reducer
export const userActions = authSlice.actions
