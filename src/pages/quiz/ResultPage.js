import {Redirect} from "react-router-dom"
import {HeaderPageTestsQuiz} from "../../components/features/quiz/HeaderPageTests"
import {Results} from "../../components/features/quiz/Results";
import {useSelector} from "react-redux";
import {selectedTest} from "../../redux/quizSlice";
import React from "react";


export const ResultPage = () => {

   const test = useSelector(selectedTest)

   if (!test) {
      return <Redirect to={'/quiz'}/>
   }

   return (
     <>
        <HeaderPageTestsQuiz isVisibilityButton={false}/>
        <Results/>
     </>
   )
};