import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectedTest } from "@redux/quizSlice";

import { Footer } from "@components/Common/Footer/Footer";
import { ProfileBreadcrumbs } from "@components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { ProfileHeader } from "@components/ProfileHeader/ProfileHeader";
import { HeadBottom } from "@components/features/Candidate-lk/HeadBottom";
import { AlertResult } from "@components/features/quiz/AlertResult";
import { QuizReport } from "@components/features/quiz/QuizReport";

export const QuizReportPage = () => {
  const test = useSelector(selectedTest);

  let navigate = useNavigate();
  if (!test) {
    navigate("/quiz");
  }

  return (
    <div className="quiz-report-page">
      <ProfileHeader />
      <HeadBottom />
      <div className="quiz-report-page__container">
        <ProfileBreadcrumbs
          links={[
            { name: "Главная", link: "/profile-candidate" },
            { name: "Тестирование", link: "/quiz" },
            { name: "Отчет по тестированию", link: "/quiz/report" },
          ]}
        />
        <div className="quiz-report-page__title main-title">
          Отчет по тестированию позиции Junior разработчик
        </div>
        <div className="quiz-report-page__report-quiz">
          <QuizReport />
        </div>
        <AlertResult />
      </div>
      <Footer />
    </div>
  );
};
