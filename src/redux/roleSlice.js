import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null,
};

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setRole } = roleSlice.actions;

export const getRole = (state) => state.role.role;

export default roleSlice.reducer;
