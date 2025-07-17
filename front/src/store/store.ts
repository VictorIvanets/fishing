import { configureStore } from "@reduxjs/toolkit"
import { saveState } from "./storage"
import { STORAGE_KEYS_ACCESS_TOKEN } from "src/api/PREFIX"
import authSlice from "./auth.slice"
import MapSlice from "./map.slice"
import registerSlice from "./register.slice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    map: MapSlice,
    register: registerSlice,
  },
})

store.subscribe(() => {
  saveState({ ...store.getState().auth.authinfo }, STORAGE_KEYS_ACCESS_TOKEN)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
