import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";

import { apiRequest } from "@api/request";

const initialState = {
  questions: null,
  questionnaires: [],
  completedTest: false,
  selectedTest: {},
  result: null,
};

export const fetchResultTest = createAsyncThunk("result", (uuid) =>
  apiRequest(
    `/user-questionnaire/questionnaire-completed?user_questionnaire_uuid=${uuid}`
  )
);

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setCompleteTest: (state) => {
      state.completedTest = true;
    },
  },
  extraReducers: {
    [fetchResultTest.fulfilled]: (state, action) => {
      state.result = action.payload;
    },
  },
});

export const { setQuestions } = quizSlice.actions;

export const questionnairesSelector = (state) => state.quiz.questionnaires;
export const questionsSelector = (state) => state.quiz.questions;
export const completedTestSelector = (state) => state.quiz.completedTest;

export const selectResult = (state) => state.quiz.result;
export const selectedTest = (state) => state.quiz.selectedTest;

export default quizSlice.reducer;
