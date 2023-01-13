import {useNavigate} from "react-router-dom"
import {HeaderPageTestsQuiz} from "../../components/features/quiz/HeaderPageTests"
import {Instruction} from "../../components/features/quiz/Instructions"
import React from "react";
import {useSelector} from "react-redux";
import {selectedTest} from "../../redux/quizSlice";


export const InstructionPage = () => {

  const test = useSelector(selectedTest)

  let navigate = useNavigate();
  if (!test) {
    navigate('/quiz')
  }

  return (
      <>
        <HeaderPageTestsQuiz isVisibilityButton={false}/>
        <Instruction/>
      </>
  )
};