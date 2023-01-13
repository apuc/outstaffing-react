import React from "react";
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux";

import {HeaderPageTestsQuiz} from "../../components/features/quiz/HeaderPageTests"
import {MyTestsQuiz} from "../../components/features/quiz/MyTestsQuiz"

import {selectedTest, selectPassedTests} from "../../redux/quizSlice";


export const InterjacentPage = () => {

  const test = useSelector(selectedTest);
  const passedTests = useSelector(selectPassedTests)
  let navigate = useNavigate();
  if (!test) {
     navigate('/quiz')
  }

  return (
      <>
        <HeaderPageTestsQuiz isVisibilityButton={true}/>
        <MyTestsQuiz listTests={passedTests}/>
      </>
  )
};