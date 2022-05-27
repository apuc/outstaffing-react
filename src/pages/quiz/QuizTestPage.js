import {Link, Redirect} from 'react-router-dom'
import {HeaderPageTestsQuiz} from '../../components/features/quiz/HeaderPageTests'
import {Progressbar} from '../../components/features/quiz/ProgressbarQuiz'
import {TaskQuiz} from '../../components/features/quiz/Task'
import {useSelector} from "react-redux";
import {selectedTest} from "../../redux/quizSlice";
import React from "react";

export const QuizTestPage = () => {

   const test = useSelector(selectedTest)

   if (!test) {
      return <Redirect to={'/quiz'}/>
   }
   return (
     <>
        <HeaderPageTestsQuiz isVisibilityButton={false}/>
        <TaskQuiz/>
     </>
   )
}