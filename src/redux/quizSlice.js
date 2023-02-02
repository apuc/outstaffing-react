import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {apiRequest} from "../api/request";


const initialState = {
  // questions: [],
  answer: [],
  result: null,
  isLoading: false,
  dataQuestionnairesOfUser: [],
  passedTests: [],
  selectedTest: null,
  userInfo: null
};
export const setUserInfo = createAsyncThunk(
    'userInfo',
    (id) =>
        apiRequest(`/profile/get-main-data?user_id=${id}`)
);

export const fetchUserAnswersMany = createAsyncThunk(
    'answersUserMany',
    (checkedValues) =>
        apiRequest('/user-response/set-responses', {method: 'POST', data: {"userResponses": checkedValues}})
);

export const fetchUserAnswerOne = createAsyncThunk(
    'answersUserOne',
    (checkedValues) =>
        apiRequest('/user-response/set-response', {method: 'POST', data: checkedValues[0]})
);

export const fetchGetAnswers = createAsyncThunk(
    'answers',
    (question_id) =>
        apiRequest(`/answer/get-answers?question_id=${question_id}`)
);

export const fetchResultTest = createAsyncThunk(
    'result',
    (uuid) =>
        apiRequest(`/user-questionnaire/questionnaire-completed?user_questionnaire_uuid=${uuid}`)
);

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestionnairesList: (state, action) => {
      state.dataQuestionnairesOfUser = action.payload;
      state.passedTests = action.payload.filter(item => item.status === 2)
    },
    setSelectedTest: (state, action) => {
      state.selectedTest = action.payload
    },
  },
  extraReducers: {
    [setUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
    },
    [fetchGetAnswers.fulfilled]: (state, action) => {
      state.answer = action.payload;
    },
    [fetchResultTest.fulfilled]: (state, action) => {
      state.result = action.payload;
    },
  },
});

export const {setQuestionnairesList, setSelectedTest} = quizSlice.actions;


export const selectAnswer = (state) => state.quiz.answer;
export const selectQuestionnairesOfUser = (state) => state.quiz.dataQuestionnairesOfUser;
export const selectResult = (state) => state.quiz.result;
export const selectedTest = (state) => state.quiz.selectedTest;
export const selectPassedTests = (state) => state.quiz.passedTests;
export const selectUserInfo = (state) => state.quiz.userInfo;


export default quizSlice.reducer;

