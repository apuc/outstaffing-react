import React from "react";

import { ProfileBreadcrumbs } from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { Footer } from "../../components/Footer/Footer";
import { FrequentlyAskedQuestionsItem } from "../../components/FrequentlyAskedQuestionsItem/FrequentlyAskedQuestionsItem";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import SideBar from "../../components/SideBar/SideBar";

import arrow from "./../../assets/images/faq/arrow.svg";

import "./FrequentlyAskedQuestions.scss";

export const FrequentlyAskedQuestions = () => {
  const rubrics = [
    {
      title: "Общие вопросы ",
      questions: [
        {
          id: 1,
          title: "Это фриланс-платформа?",
        },
        {
          id: 2,
          title:
            "Чем вы отличаетесь от традиционного процесса выбора исполнителя?",
        },
        {
          id: 3,
          title: "Это фриланс-платформа?",
        },
        {
          id: 4,
          title:
            "Чем вы отличаетесь от традиционного процесса выбора исполнителя?",
        },
      ],
    },
    {
      title: "Поиск специалиста",
      questions: [
        {
          id: 11,
          title: "Это фриланс-платформа?",
        },
        {
          id: 22,
          title:
            "Чем вы отличаетесь от традиционного процесса выбора исполнителя?",
        },
        {
          id: 33,
          title: "Это фриланс-платформа?",
        },
        {
          id: 44,
          title:
            "Чем вы отличаетесь от традиционного процесса выбора исполнителя?",
        },
      ],
    },
    {
      title: "Бронирование специалиста",
      questions: [
        {
          id: 11,
          title: "Это фриланс-платформа?",
        },
      ],
    },
    {
      title: "Работа с выбранным специалистом",
      questions: [
        {
          id: 11,
          title:
            "Чем вы отличаетесь от традиционного процесса выбора исполнителя?",
        },
      ],
    },
  ];

  return (
    <div className="frequently-asked-questions">
      <AuthHeader />
      <SideBar />

      <div className="frequently-asked-questions__container container">
        <ProfileBreadcrumbs
          links={[
            { name: "Главная", link: "/auth" },
            {
              name: "FAQ (часто задаваемые вопросы)",
              link: "/frequently-asked-questions",
            },
          ]}
        />
        <div className="frequently-asked-questions__about">
          <div className="frequently-asked-questions__title">FAQ</div>
          <div className="frequently-asked-questions__arrow">
            <img src={arrow} alt="arrow" />
          </div>
          <div className="frequently-asked-questions__description">
            База знаний, которая дает ответы на популярные вопросы, тем самым
            помогая нашим клиентам разобраться в продукте, сервисе и вариантах
            сотрудничества с нашей компанией.
          </div>
        </div>
        <div className="frequently-asked-questions__items">
          {rubrics.map((rubric, index) => (
            <FrequentlyAskedQuestionsItem rubric={rubric} key={index} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
