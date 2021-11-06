import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../interfaces/commons';
import { CommonState } from '../interfaces/states';

const initialState: CommonState = {
  isLoading: false,
  user: null,
};

const slice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    reset: (state) => {
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { setLoading, setUser, reset } = slice.actions;
export default slice.reducer;
