import {Link} from 'react-router-dom'
import {CodeSnippetlighter} from '../../../pages/CodeSnippetPage'
import comment from './../../../images/comment.jpg'
import './quiz.scss'
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectedTest} from "../../../redux/quizSlice";
import {fetchGet} from "../../../server/server";

export const Instruction = () => {

   const [countQuestions, setCountQuestions] = useState(null)
   const test = useSelector(selectedTest)

   useEffect(async () => {

      const response = await fetchGet({
           link: `${process.env.REACT_APP_API_URL}/api/user-questionnaire/get-question-number?user_questionnaire_uuid=${test.uuid}`,
           Origin: `${process.env.REACT_APP_BASE_URL}`,
        }
      )
      setCountQuestions(response.question_number)

   }, [])

   return (
     <div className="instruction">
        <div className="instruction__container">
           {!countQuestions ? <h2>Loading...</h2> :
             <>
                <h3 className="instruction__title quiz-title_h3">Инструкция к тесту</h3>
                <div className="instruction__text">
                   Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempoLorem ipsum dolor sit
                   amet,Lo
                   rem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo consectetur adipisicing
                   e
                   lit, sed do eiusmod tempo
                </div>
                <Link to="/quiz-test" className='instruction__btn quiz-btn quiz-btn_restriction'>Далее</Link>
                <div className="instruction__info">
                   <div className="instruction__icon">
                      <img src={comment} alt=""/>
                   </div>
                   <div className="instruction__text instruction__text_info">Количество вопросов в
                      тесте: <span>{countQuestions}</span></div>
                </div>
             </>
           }
        </div>
     </div>
   )
}

