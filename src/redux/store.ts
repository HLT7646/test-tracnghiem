import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/userSlice';

export const store = () => configureStore({
  reducer: {
      user: userReducer,
  }
})

export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

