import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dateSelected: '',
};

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    dateSelected: (state, action) => {
      state.dateSelected = action.payload;
    },
  },
});

export const { dateSelected, } = reportSlice.actions;

export const selectDate = (state) => state.report.dateSelected;

export default reportSlice.reducer;
