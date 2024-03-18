import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})