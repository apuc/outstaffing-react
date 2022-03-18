import {Redirect} from "react-router-dom"
import {HeaderPageTestsQuiz} from "../../components/features/quiz/HeaderPageTests"
import {MyTestsQuiz} from "../../components/features/quiz/MyTestsQuiz"
import {useSelector} from "react-redux";
import {selectedTest, selectPassedTests} from "../../redux/quizSlice";
import React from "react";


export const InterjacentPage = () => {

   const test = useSelector(selectedTest)
   const passedTests = useSelector(selectPassedTests)

   if (!test) {
      return <Redirect to={'/quiz'}/>
   }

   return (
     <>
        <HeaderPageTestsQuiz isVisibilityButton={true}/>
        <MyTestsQuiz listTests={passedTests}/>
     </>
   )
}