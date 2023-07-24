import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import RideSlice from './slices/RideSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    ride: RideSlice,
  },
})