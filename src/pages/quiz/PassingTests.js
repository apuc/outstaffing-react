import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { completedTestSelector, selectedTest } from "@redux/quizSlice";

import { Footer } from "@components/Common/Footer/Footer";
import { ProfileBreadcrumbs } from "@components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { ProfileHeader } from "@components/ProfileHeader/ProfileHeader";
import { HeadBottom } from "@components/features/Candidate-lk/HeadBottom";
import { BlockCompletedTest } from "@components/features/quiz/BlockCompletedTest";
import { CardIntroduction } from "@components/features/quiz/Card-introduction";
import { QuizPassingInformation } from "@components/features/quiz/Quiz-passing-information";
import { TaskQuiz } from "@components/features/quiz/Task";

export const PassingTests = () => {
  //const selectedTest = useSelector(selectedTest)

  if ("") {
  }

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); //600 - кол-во секунд для прохождения теста

  const [startTest, setStartTest] = useState(false);
  const completedTest = useSelector(completedTestSelector);

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
          Тестирование в позиции Junior разработчик{" "}
        </div>
        <div className="passing-tests-page__passing-information">
          <QuizPassingInformation
            expiryTimestamp={time}
            setStartTest={setStartTest}
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
              <TaskQuiz />
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
    </div>
  );
};
