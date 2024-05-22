
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  email: string;
  image: string;
}

const initialState: UserState = {
  username: '',
  email: '',
  image: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
  },
});

export const { setUsername, setEmail, setImage } = userSlice.actions;

export default userSlice.reducer;