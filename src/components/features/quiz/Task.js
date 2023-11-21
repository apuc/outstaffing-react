import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { questionsSelector } from "@redux/quizSlice";

import { apiRequest } from "@api/request";

import { useHandlerFieldTest } from "@hooks/useHandlerFieldTest";
import { useNotification } from "@hooks/useNotification";

import { Loader } from "@components/Common/Loader/Loader";

import questionIcon from "assets/images/question.png";

import { GetOptionTask } from "./GetOptionTask";
import "./quiz.scss";

export const TaskQuiz = ({ timer }) => {
  const { restart } = timer;
  const { uuid } = useParams();
  const questions = useSelector(questionsSelector);
  const [index, setIndex] = useState(0);
  const [isLoadingSendAnswers, setLoadingSendAnswers] = useState(false);
  const { showNotification } = useNotification();

  const { values, handleChange, setValues } = useHandlerFieldTest({
    uuid,
    questions,
    indexQuestion: index,
  });

  const nextQuestion = async (e) => {
    e.preventDefault();
    //Проверка на существование овтетов
    if (!values.length) {
      alert("Вы не ответили на вопрос");
      return;
    }

    //отправка ответов на сервер
    setLoadingSendAnswers(true);
    await apiRequest(`/user-response/set-responses`, {
      method: "POST",
      data: values,
    })
      .then((res) => {
        if (String(res?.status)[0] !== "2") {
          showNotification({
            show: true,
            text: res?.message || "",
            type: "error",
          });
          return;
        }

        if (index === questions.length - 1) return;

        //установка таймера на вопрос если он существует
        if (questions[index + 1]?.time_limit !== "00:00:00") setValueTimer();

        // очищение полей и переход на следующий вопрос
        setIndex((prev) => prev + 1);
        setValues([]);
      })
      .catch((e) => {
        showNotification({
          show: true,
          text: e?.message || "",
          type: "error",
        });
      })
      .finally(() => setLoadingSendAnswers(false));
  };

  const complete = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const setValueTimer = () => {
    const time_limit = questions[index + 1].time_limit.split(":");
    restart(
      moment()
        .add(time_limit[0], "hours")
        .add(time_limit[1], "minutes")
        .add(time_limit[2], "seconds")
    );
  };

  console.log(questions);
  return (
    <div className="task">
      {questions ? (
        <div className="task__container">
          <div className="task__header">
            <img src={questionIcon} alt="questionIcon" />
            <h3 className="task__title quiz-title_h3">
              {questions[index].question_body}
            </h3>
          </div>
          <div className="task__body">
            <form
              className="task__form form-task"
              onSubmit={
                index !== questions.length - 1 ? nextQuestion : complete
              }
            >
              {questions[index].question_type_id === 1 ? (
                <div className="form-task__group">
                  <textarea
                    className="form-task__field"
                    value={values[0]?.response_body}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                questions[index]?.answers?.map((answer) => (
                  <GetOptionTask
                    key={answer.id}
                    type={questions[index].question_type_id}
                    handleChange={handleChange}
                    answer={answer}
                  />
                ))
              )}
              <div className="form-task__buttons">
                <button
                  onClick={nextQuestion}
                  disabled={isLoadingSendAnswers}
                  className="form-task__btn quiz-btn"
                >
                  {isLoadingSendAnswers ? (
                    <Loader width={25} height={25} />
                  ) : index !== questions.length - 1 ? (
                    "Далее"
                  ) : (
                    "Завершить"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <h1>ОШибка</h1>
      )}
    </div>
  );
};
