import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  answersSelector,
  fetchGetAnswers,
  fetchUserAnswerOne,
  fetchUserAnswersMany,
  questionsSelector,
  selectedTest,
  setAnswers,
  setCompleteTest,
} from "@redux/quizSlice";

import { apiRequest } from "@api/request";

import questionIcon from "assets/images/question.png";

import { GetOptionTask } from "./GetOptionTask";
import { HeaderQuiz } from "./HeaderQuiz";
import { Progressbar } from "./ProgressbarQuiz";
import "./quiz.scss";

export const TaskQuiz = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const answers = useSelector(answersSelector);
  const questions = useSelector(questionsSelector);

  const dataTest = useSelector(selectedTest);
  const [index, setIndex] = useState(0);
  const [checkedValues, setCheckedValues] = useState([]);
  //const [stripValue, setStripValue] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const id = localStorage.getItem("id");

  useEffect(() => {
    // fetch('https://itguild.info/api/user-questionnaire/questionnaires-list?user_id=110').then(response => response.json())
    // .then(json => console.log(json))
    apiRequest(`/question/get-questions?uuid=${dataTest.uuid}`).then(
      (response) => {
        console.log(response);
        dispatch(fetchGetAnswers(response[0].id));
        setStripValue(((+index + 1) * 100) / response.length);
      }
    );
  }, [dispatch]);

  const nextQuestion = async (e) => {
    e.preventDefault();
    //Проверка на валидацию ответов
    if (!(checkedValues.length || inputValue)) {
      alert("Вы не ответили на вопрос");
      return;
    }

    //отправка ответов на сервер
    if (questions[index].question_type_id != 3) {
      //dispatch(fetchUserAnswerOne(checkedValues));
    } else {
      console.log(checkedValues);
      // dispatch(fetchUserAnswersMany(checkedValues));
    }

    //Проверка на окончание теста
    if (!(index < questions.length - 1)) {
      dispatch(setCompleteTest());
      return;
    }

    dispatch(fetchGetAnswers(questions[index + 1].id));
    setIndex((prev) => prev + 1);
    setCheckedValues([]);
    setInputValue("");
  };

  const handleChange = (e) => {
    const checked = e.target.checked;

    if (questions[index].question_type_id != 3) {
      setCheckedValues([
        {
          user_id: id,
          user_questionnaire_uuid: dataTest.uuid,
          question_id: questions[index].id,
          response_body: e.target.value,
        },
      ]);
      return;
    }

    checked
      ? setCheckedValues((prev) => [
          ...prev,
          {
            user_id: id,
            user_questionnaire_uuid: dataTest.uuid,
            question_id: questions[index].id,
            response_body: e.target.value,
          },
        ])
      : setCheckedValues((prev) => [
          ...prev.filter((item) => item.response_body !== e.target.value),
        ]);
  };

  console.log("render task");

  return (
    <div className="task">
      {
        <div className="task__container">
          <div className="task__header">
            <img src={questionIcon} alt="" />
            <h3 className="task__title quiz-title_h3">
              {questions[index].question_body}
            </h3>
          </div>

          <div className="task__body">
            <form className="task__form form-task" onSubmit={nextQuestion}>
              {answers.map((answer) => (
                <GetOptionTask
                  key={answer.id}
                  type={questions[index].question_type_id}
                  handleChange={handleChange}
                  answer={answer}
                />
              ))}
              <div className="form-task__buttons">
                {/* {
                  index != 0 && <button type='submit' className='form-task__btn quiz-btn quiz-btn_back'
                    onClick={prevQuestion}>Назад</button>
                } */}
                {index != questions.length && (
                  <button
                    onClick={nextQuestion}
                    className="form-task__btn quiz-btn"
                  >
                    Далее
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  );
};
