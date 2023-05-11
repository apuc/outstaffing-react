import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dateSelected: "",
  reportDate: "",
  requestDates: "",
  sendRequest: "",
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    dateSelected: (state, action) => {
      state.dateSelected = action.payload;
    },
    setReportDate: (state, action) => {
      state.reportDate = action.payload;
    },
    setRequestDate: (state, action) => {
      state.requestDates = action.payload;
    },
    setSendRequest: (state, action) => {
      state.sendRequest = action.payload;
    },
  },
});

export const { dateSelected, setReportDate, setRequestDate, setSendRequest } =
  reportSlice.actions;

export const selectDate = (state) => state.report.dateSelected;

export const getReportDate = (state) => state.report.reportDate;

export const getRequestDates = (state) => state.report.requestDates;

export const getSendRequest = (state) => state.report.sendRequest;

export default reportSlice.reducer;
