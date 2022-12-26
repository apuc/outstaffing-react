import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dateSelected: '',
    reportDate: ''
};

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    dateSelected: (state, action) => {
      state.dateSelected = action.payload;
    },
    setReportDate: (state, action) => {
      state.reportDate = action.payload;
    },
  },
});

export const { dateSelected, setReportDate} = reportSlice.actions;

export const selectDate = (state) => state.report.dateSelected;

export const getReportDate = (state) => state.report.reportDate;

export default reportSlice.reducer;
