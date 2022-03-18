import React from 'react'
import {HeaderQuiz} from "../../components/features/quiz/HeaderQuiz"
import {MyTestsQuiz} from "../../components/features/quiz/MyTestsQuiz"
import {useSelector} from "react-redux";
import {selectQuestionnairesOfUser} from "../../redux/quizSlice";

export const QuizPage = () => {

   const allTests = useSelector(selectQuestionnairesOfUser)

   return (
     <>
        <HeaderQuiz header={true}/>
        <MyTestsQuiz listTests={allTests}/>
     </>
   )
}