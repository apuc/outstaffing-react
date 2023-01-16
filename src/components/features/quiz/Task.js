import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'

import {useRequest} from "../../../hooks/useRequest";
import {Progressbar} from './ProgressbarQuiz'
import {GetOptionTask} from './GetOptionTask'

import {
  fetchUserAnswersMany, fetchUserAnswerOne, fetchGetAnswers, selectAnswer, selectedTest
} from './../../../redux/quizSlice'

import './quiz.scss'

export const TaskQuiz = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listAnswers = useSelector(selectAnswer);
  const dataTest = useSelector(selectedTest);

  const [index, setIndex] = useState(0);
  const [checkedValues, setCheckedValues] = useState([]);
  const [stripValue, setStripValue] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [questions, setQuestions] = useState([]);

  const {apiRequest} = useRequest();

  const id = localStorage.getItem('id');

  useEffect(() => {
    apiRequest(`/question/get-questions?uuid=${dataTest.uuid}`)
        .then((response) => {
          console.log(response)
          setQuestions(response);
          dispatch(fetchGetAnswers(response[0].id));
          setStripValue((+index + 1) * 100 / response.length)
        })
  }, [dispatch]);

  const nextQuestion = async (e) => {
    e.preventDefault();

    //Проверка на валидацию ответов
    if (checkedValues.length || inputValue) {
      switch (questions[index].question_type_id) {
        case '3':
          dispatch(fetchUserAnswersMany(checkedValues));
          break;
        case '2':
        case '1':
        case '4':
          dispatch(fetchUserAnswerOne(checkedValues));
          break;
        default:
          break;
      }

      //Проверка на существование следующего запроса
      if (index < questions.length - 1) {
        await dispatch(fetchGetAnswers(questions[index + 1].id));
        setIndex(prev => prev >= questions.length - 1 ? prev : prev + 1);
        setStripValue((prev => prev + (100 / questions.length)));
        setCheckedValues([]);
        setInputValue('')
      } else {
        navigate(`/quiz/result`);
        alert("Тест пройден!")
      }

    } else {
      alert("Вы не ответили на вопрос")
    }
  };

  const handleChange = (e) => {
    const checked = e.target.checked;
    switch (questions[index].question_type_id) {
      case '3':
        checked ? setCheckedValues(prev => [...prev, {
              user_id: id,
              user_questionnaire_uuid: dataTest.uuid,
              question_id: questions[index].id,
              response_body: e.target.value
            }]) :
            setCheckedValues(prev => [...prev.filter(item => item.response_body !== e.target.value)]);
        break;
      case '1':
      case '2':
      case '4':
        setCheckedValues([{
          user_id: id,
          user_questionnaire_uuid: dataTest.uuid,
          question_id: questions[index].id,
          response_body: e.target.value
        }])
    }
  };


  return (
      <React.StrictMode>
        <Progressbar indexQuestion={index + 1} width={stripValue}/>
        <div className="task">
          {!questions.length || !stripValue || !listAnswers.length ?
              <h1 className={'_container'} style={{display: "block"}}>Loading....</h1>
              :
              <div className="task__container">
                <div className="task__code code">
                  {/* <CodeSnippetlighter /> */}
                </div>
                <h3 className="task__title quiz-title_h3">{questions[index].question_body}</h3>
                <div className="task__body">
                  <form className='task__form form-task'>
                    {
                      questions[index].question_type_id === 1 ?
                          <GetOptionTask
                              type={1}
                              inputValue={checkedValues.length ? checkedValues[0].response_body : ''}
                              handleChange={handleChange}
                          />
                          :
                          listAnswers.map((answer) => (
                              <GetOptionTask
                                  key={answer.id}
                                  type={questions[index].question_type_id}
                                  handleChange={handleChange}
                                  answer={answer}
                              />
                          ))
                    }
                    <div className="form-task__buttons">
                      {questions.length !== index + 1 &&
                      <button type='submit' className='quiz-btn'
                              onClick={(e) => nextQuestion(e)}>Далее</button>}
                      {questions.length === index + 1 &&
                      <button onClick={(e) => nextQuestion(e)}
                              className='quiz-btn quiz-btn_dark-green'>Завершить</button>}
                    </div>
                  </form>
                </div>
              </div>
          }
        </div>
      </React.StrictMode>
  )
};
