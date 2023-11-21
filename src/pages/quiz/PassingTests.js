import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { completedTestSelector } from "@redux/quizSlice";
import { Footer } from "@components/Common/Footer/Footer";
import { ProfileBreadcrumbs } from "@components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { ProfileHeader } from "@components/ProfileHeader/ProfileHeader";
import { HeadBottom } from "@components/features/Candidate-lk/HeadBottom";
import { BlockCompletedTest } from "@components/features/quiz/BlockCompletedTest";
import { CardIntroduction } from "@components/features/quiz/Card-introduction";
import { QuizPassingInformation } from "@components/features/quiz/Quiz-passing-information";
import { TaskQuiz } from "@components/features/quiz/Task";
import { useTimer } from "react-timer-hook";
import moment from "moment";

export const PassingTests = () => {

  const [startTest, setStartTest] = useState(false);
  const navigate = useNavigate()
  const completedTest = useSelector(completedTestSelector);
  const { uuid } = useParams()

  const timer = useTimer({
    expiryTimestamp: moment(),
    autoStart: false,
    onExpire: () => {
     navigate("/quiz")
    }
  });

  const onCloseWindow = (e) => {
    e.preventDefault();
    if(startTest){
      let confirmationMessage = "\o/";
      (e || window.e).returnValue = confirmationMessage;
      return confirmationMessage;
    }
  }

  const introduction = [
    {
      title: "Зачем?",
      description:
        "Тесты itguild  предназначены для того, чтобы подтверждать навыки, которые вы указали у себя.",
    },
    {
      title: "Почему именно тестирование?",
      description:
        "Тесты itguild  заменяют первое техническое собеседование по любой вакансии.",
    },
    {
      title: "Какие тесты нужно проходить?",
      description:
        "Здесь все довольно просто — следует проходить тесты по инструментам и навыкам, которыми вы владеете.",
    },
  ];

  function onSwitchTab(e) {
    console.log(e,document.visibilityState);
    if (document.visibilityState === "hidden" && startTest) {
      alert("Убедительная просьба не покидать страницу и не переключаться. Рассчитывайте только на свои знания и умения!!!")
    }
  }

  useEffect(()=>{
    window.addEventListener("beforeunload", onCloseWindow);
    window.addEventListener("visibilitychange", onSwitchTab);
    window.onblur = onSwitchTab
    return () => {
      window.removeEventListener("beforeunload", onCloseWindow);
      window.removeEventListener("visibilitychange", onSwitchTab);
    }
  }, [startTest])

  return (
    <div className="passing-tests-page">
      <ProfileHeader />
      <HeadBottom />
      <div className="passing-tests-page__container">
        <ProfileBreadcrumbs
          links={[
            { name: "Главная", link: "/profile-candidate" },
            { name: "Тестирование", link: "/quiz" },
            { name: "Прохождение тестов", link: "/quiz/test" },
          ]}
        />
        <div className="passing-tests-page__title main-title">
          Тестирование в позиции Junior разработчик
        </div>
        <div className="passing-tests-page__passing-information">
          <QuizPassingInformation
            timer={timer}
            setStartTest={setStartTest}
            uuid={uuid}
          />
        </div>

        {!completedTest && (
          <>
            {startTest && (
              <div className="passing-tests-page__block-green">
                Тестирование началось
              </div>
            )}
            {startTest ? (
              <TaskQuiz timer={timer}/>
            ) : (
              <div className="passing-tests-page__introduction">
                {introduction.map((item, i) => (
                  <CardIntroduction
                    description={item.description}
                    title={item.title}
                    key={i}
                  />
                ))}
              </div>
            )}
            {!startTest && (
              <div className="passing-tests-page__block-text block-text">
                ИЛИ <Link to={""}>выполните тестове задание</Link> , без
                прохождения тестов
              </div>
            )}
          </>
        )}
        {completedTest && (
          <>
            <div className="passing-tests-page__block-green">
              Тестирование завершено
            </div>
            <BlockCompletedTest />
          </>
        )}
      </div>
      <Footer />
      {/*<Prompt*/}
      {/*  when={showPrompt}*/}
      {/*  message="Unsaved changes detected, continue?"*/}
      {/*  beforeUnload={true}*/}
      {/*/>*/}
    </div>
  );
};


