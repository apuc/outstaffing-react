import {useNavigate} from 'react-router-dom'
import {HeaderPageTestsQuiz} from '../../components/features/quiz/HeaderPageTests'
import {TaskQuiz} from '../../components/features/quiz/Task'
import {useSelector} from "react-redux";
import {selectedTest} from "../../redux/quizSlice";
import React from "react";

export const QuizTestPage = () => {
  let navigate = useNavigate()
  const test = useSelector(selectedTest)

  if (!test) {
     navigate('/quiz')
  }
  return (
      <>
        <HeaderPageTestsQuiz isVisibilityButton={false}/>
        <TaskQuiz/>
      </>
  )
};