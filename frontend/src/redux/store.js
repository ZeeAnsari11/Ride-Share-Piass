import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import RideSlice from './slices/RideSlice'
import messages from './slices/messages'

export const store = configureStore({
  reducer: {
    user: userSlice,
    ride: RideSlice,
    MessageRecieved: messages
  },
})