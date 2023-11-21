import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setQuestions } from "@redux/quizSlice";

import { apiRequest } from "@api/request";

import { useNotification } from "@hooks/useNotification";

import StarRating from "@components/StarRating/StarRating";

import accempt from "assets/images/quiz/accempt.png";
import iconTomer from "assets/images/quiz/timer.png";

export const QuizPassingInformation = ({ setStartTest, uuid, timer }) => {
  const { restart, pause, hours, minutes, seconds, isRunning } = timer;
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const dispatch = useDispatch();

  const startTesting = () => {
    apiRequest(`/question/get-questions?uuid=${uuid}`)
      .then((res) => {
        if (res.status === 400) {
          dispatch(setQuestions(null));
          showNotification({
            show: true,
            text: res?.message || "",
            type: "error",
          });
          return;
        }
        dispatch(setQuestions(res));
        setStartTest(true);
        restart(
          moment()
            .add(res[0]?.time_limit.split(":")[0], "hours")
            .add(res[0]?.time_limit.split(":")[1], "minutes")
            .add(res[0]?.time_limit.split(":")[2], "seconds"),
          true
        );
      })
      .catch((e) => {
        dispatch(setQuestions(null));
      });
  };

  const checkTest = () =>
    apiRequest(
      `user-questionnaire/questionnaire-completed?user_questionnaire_uuid=${uuid}`
    );

  const completeTest = () =>
    apiRequest("/user-questionnaire/questionnaire-completed", {
      method: "POST",
    });

  const finishQuiz = async () => {
    Promise.all([checkTest, completeTest])
      .then(function () {
        pause();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="quiz-passing-information">
      <div className="quiz-passing-information__container">
        <div className="quiz-passing-information__main">
          <div className="quiz-passing-information__specialization">
            <StarRating
              color={"#52B709"}
              countStars={1}
              countActiveStars={0.5}
              size={61}
            />
            <div className="quiz-passing-information__specialization-title">
              Junior <br />
              разработчик
            </div>
          </div>
          {isRunning && (
            <div className="quiz-passing-information__timer timer-quiz">
              <div className="quiz-passing-information__icon">
                <img src={iconTomer} alt="" />
              </div>
              <div className="quiz-passing-information__text">
                Время на прохождение теста:
                <br />
                <span>
                  {hours.toString().padStart(2, "0") +
                    ":" +
                    minutes.toString().padStart(2, "0") +
                    ":" +
                    seconds.toString().padStart(2, "0")}
                  секунд
                </span>
              </div>
            </div>
          )}
          {!isRunning && (
            <div className="quiz-passing-information__attempt">
              <div className="quiz-passing-information__icon">
                <img src={accempt} alt="" />
              </div>
              <div className="quiz-passing-information__text">
                Попыток прохождения: <br />
                <span>1 попытка</span>
              </div>
            </div>
          )}
          <div>
            {!isRunning && (
              <button
                className="quiz-passing-information__button btn-green"
                onClick={startTesting}
              >
                Начать
              </button>
            )}
          </div>
          {isRunning && (
            <button
              className="quiz-passing-information__button quiz-btn"
              onClick={finishQuiz}
            >
              Завершить
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
