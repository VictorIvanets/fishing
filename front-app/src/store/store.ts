import { configureStore } from '@reduxjs/toolkit'
import { saveState } from './storage'
import userSlice from './login.slice'
import { JWT_PER_STATE, LOG_PER_STATE } from './login.slice.types'
import registerSlice from './register.slice'

export const store = configureStore({
	reducer: {
		user: userSlice,
		register: registerSlice,
	},
})

store.subscribe(() => {
	saveState({ jwt: store.getState().user.jwt }, JWT_PER_STATE)
	saveState({ login: store.getState().user.login }, LOG_PER_STATE)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispath = typeof store.dispatch
