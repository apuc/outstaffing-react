import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    loading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { loading } = loaderSlice.actions;

export const selectIsLoading = (state) => state.loader.isLoading;

export default loaderSlice.reducer;
