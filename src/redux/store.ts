import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/userSlice';

export const store = () => configureStore({
  reducer: {
      user: userReducer,
  }
})
export default store;
export type AppStore = ReturnType<typeof store>