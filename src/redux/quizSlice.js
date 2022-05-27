import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchGet, fetchPost} from './../server/server'
import axios from "axios";


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
  async (id) => {
     try{
        const response = await fetchGet({
             link: `${process.env.REACT_APP_API_URL}/api/profile/get-main-data?user_id=${id}`,
             Origin: `${process.env.REACT_APP_BASE_URL}`,
          }
        )
        return response
     }catch (e) {
        console.log(e)
     }
  }
)

export const fetchUserAnswersMany = createAsyncThunk(
  'answersUserMany',
  async (checkedValues) => {
     try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user-response/set-responses`,
          {"userResponses": checkedValues}, {
             headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
             }
          })
        return response.data
     }catch (e) {
        console.log(e)
     }
  }
)
export const fetchUserAnswerOne = createAsyncThunk(
  'answersUserOne',
  async (checkedValues) => {
     try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user-response/set-response`,
          checkedValues[0], {
             headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
             }
          })
        return response.data
     }catch (e) {
        console.log(e)
     }
  }
)
export const fetchGetAnswers = createAsyncThunk(
  'answers',
  async (question_id) => {
     const resp = await fetchGet({
          link: `${process.env.REACT_APP_API_URL}/api/answer/get-answers?question_id=${question_id}`,
          Origin: `${process.env.REACT_APP_BASE_URL}`,
       }
     )
     return resp
  }
)
// export const fetchGetQuestion = createAsyncThunk(
//   'questions',
//   async (uuid) => {
//      const resp = await fetchGet({
//           link: `${process.env.REACT_APP_API_URL}/api/question/get-questions?uuid=${uuid}`,
//           Origin: `${process.env.REACT_APP_BASE_URL}`,
//        }
//      )
//      return resp
//   }
// )
export const fetchResultTest = createAsyncThunk(
  'result',
  async (uuid) => {
     const resp = await fetchGet({
          link: `${process.env.REACT_APP_API_URL}/api/user-questionnaire/questionnaire-completed?user_questionnaire_uuid=${uuid}`,
          Origin: `${process.env.REACT_APP_BASE_URL}`,
       }
     )
     return resp

  }
)

export const quizSlice = createSlice({
   name: 'quiz',
   initialState,
   reducers: {
      setQuestionnairesList: (state, action) => {
         state.dataQuestionnairesOfUser = action.payload
         state.passedTests = action.payload.filter(item=>item.status === 2)
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

// export const selectQuestions = (state) => state.quiz.questions;
export const selectAnswer = (state) => state.quiz.answer;
export const selectQuestionnairesOfUser = (state) => state.quiz.dataQuestionnairesOfUser;
export const selectResult = (state) => state.quiz.result;
export const selectIsLoading = (state) => state.quiz.isLoading;
export const selectedTest = (state) => state.quiz.selectedTest;
export const selectPassedTests = (state) => state.quiz.passedTests;
export const selectUserInfo = (state) => state.quiz.userInfo;


export default quizSlice.reducer;

