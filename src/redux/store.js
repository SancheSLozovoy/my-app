import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})