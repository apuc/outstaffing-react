import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiRequest } from "../api/request";

const initialState = {
  answers: [
    {
      id: "12",
      question_id: "7",
      answer_body:
        "Нsdf sfd fds sdf sf sfsdf sdfеск вsdffsdfsdf sf sdf sdfsdfsdfsdfdsjknsdkf dssdjf sdfbsdhf sd hjdsfv sdhjvар1 отв1 истина",
    },
    {
      id: "23",
      question_id: "7",
      answer_body: "Неск вар1 отв1 истина",
    },
    {
      id: "233",
      question_id: "7",
      answer_body: "lorem sdfdsf dfs sdf ",
    },
  ],
  questionnaires: [],
  questions: [
    {
      id: "4",
      question_type_id: "3",
      question_body:
        "Для чего в Python используется встроенная функция enumerate()?",
      question_priority: null,
      next_question: null,
      time_limit: "00:22:00",
    },
    {
      id: "24",
      question_type_id: "3",
      question_body: "Для чего в Python dfsf троенная функция enumerate()?",
      question_priority: null,
      next_question: null,
      time_limit: "00:22:00",
    },
    {
      id: "41",
      question_type_id: "3",
      question_body: "Для чегоsdfsdfя функция enumerate()?",
      question_priority: null,
      next_question: null,
      time_limit: "00:22:00",
    },
    {
      id: "5",
      question_type_id: "2",
      question_body: "Один ответ2",
      question_priority: null,
      next_question: null,
      time_limit: "00:22:00",
    },
  ],
  selectedTest: {
    user_id: 1,
    uuid: "d222f858-60fd-47fb-8731-dc9d5fc384c5",
    score: 11,
    status: 2,
    percent_correct_answers: 0.25,
    testing_date: "2022-03-17 11:14:22",
    questionnaire_title: "Кат1 Анкета 1 активна",
  },
  selectedAnswers: {},
  completedTest: false,
  result: null,
  isLoading: false,
  dataQuestionnairesOfUser: [],
  passedTests: [],

  userInfo: null,
};
export const setUserInfo = createAsyncThunk("userInfo", (id) =>
  apiRequest(`/profile/get-main-data?user_id=${id}`)
);

export const fetchUserAnswersMany = createAsyncThunk(
  "answersUserMany",
  (checkedValues) =>
    apiRequest("/user-response/set-responses", {
      method: "POST",
      data: { userResponses: checkedValues },
    })
);

export const fetchUserAnswerOne = createAsyncThunk(
  "answersUserOne",
  (checkedValues) =>
    apiRequest("/user-response/set-response", {
      method: "POST",
      data: checkedValues[0],
    })
);

export const fetchGetAnswers = createAsyncThunk("answers", (question_id) =>
  apiRequest(`/answer/get-answers?question_id=${question_id}`)
);

export const fetchResultTest = createAsyncThunk("result", (uuid) =>
  apiRequest(
    `/user-questionnaire/questionnaire-completed?user_questionnaire_uuid=${uuid}`
  )
);

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuestionnaires: (state, action) => {
      state.questionnaires = action.payload;
    },
    setSelectedTest: (state, action) => {
      state.selectedTest = action.payload;
    },
    setCompleteTest: (state, action) => {
      state.completedTest = true;
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

export const { setQuestionnaires, setSelectedTest, setCompleteTest } =
  quizSlice.actions;

export const answersSelector = (state) => state.quiz.answers;
export const questionnairesSelector = (state) => state.quiz.questionnaires;
export const selectedAnswersSelector = (state) => state.quiz.selectedAnswers;
export const questionsSelector = (state) => state.quiz.questions;
export const completedTestSelector = (state) => state.quiz.completedTest;

export const selectResult = (state) => state.quiz.result;
export const selectedTest = (state) => state.quiz.selectedTest;
export const selectPassedTests = (state) => state.quiz.passedTests;
export const selectUserInfo = (state) => state.quiz.userInfo;

export default quizSlice.reducer;
