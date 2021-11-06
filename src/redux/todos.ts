import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TodoItem } from '../interfaces/todos';
import { TodoState } from '../interfaces/states';

const initialState: TodoState = {
  items: [],
};

const slice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<TodoItem[]>) => {
      state.items = action.payload;
    },
    reset: (state) => {
      state.items = [];
    },
  },
});

export const { setTodos, reset } = slice.actions;
export default slice.reducer;
