import {Link} from 'react-router-dom'
import './quiz.scss'
import {useSelector} from "react-redux";
import {selectedTest, selectUserInfo} from "../../../redux/quizSlice";


export const HeaderPageTestsQuiz = ({isVisibilityButton}) => {

   const test = useSelector(selectedTest)
   const userInfo = useSelector(selectUserInfo);

   return (
     <div className="header-quiz">
        <div className="header-quiz__container">
           <div className="header-quiz__body">
              <div className="header-quiz__avatar">
                 {userInfo.photo && <img src={userInfo.photo} alt={userInfo.photo}/>}
              </div>
              <div className="header-quiz__description">
                 <div className="header-quiz__title-test title">{test.questionnaire_title}</div>
                 <div className="header-quiz__subtitle subtitle">Тест на основе выступление
                    "{test.questionnaire_title}" {userInfo.fio}</div>
              </div>
           </div>
           {isVisibilityButton &&
           <Link to={'/quiz-instruction'} className='quiz-btn quiz-btn_restriction'>Пройти</Link>}
        </div>
     </div>
   )
}