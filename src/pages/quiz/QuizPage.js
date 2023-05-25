import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  questionnairesSelector,
  setQuestionnaires,
} from "../../redux/quizSlice";
import { apiRequest } from "../../api/request";

import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import { HeadBottom } from "../../components/features/Candidate-lk/HeadBottom";
import { ProfileBreadcrumbs } from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { SelectedCategory } from "../../components/features/quiz/SelectedCategory";
import { Footer } from "../../components/Footer/Footer";
import { CardAvailableTest } from "../../components/features/quiz/CardAviableTest";
import CategoriesItem from "../../components/CategoriesItem/CategoriesItem";

import BackEndImg from "../../assets/images/partnerProfile/personalBackEnd.svg";
import FrontendImg from "../../assets/images/partnerProfile/PersonalFrontend.svg";
import ArchitectureImg from "../../assets/images/partnerProfile/PersonalArchitecture.svg";
import DesignImg from "../../assets/images/partnerProfile/PersonalDesign.svg";
import TestImg from "../../assets/images/partnerProfile/PersonalTesters.svg";
import AdminImg from "../../assets/images/partnerProfile/PersonalAdmin.svg";
import ManageImg from "../../assets/images/partnerProfile/PersonalMng.svg";
import CopyImg from "../../assets/images/partnerProfile/PersonalCopy.svg";
import SmmImg from "../../assets/images/partnerProfile/PersonalSMM.svg";

import "./quiz-page.scss";

export const QuizPage = () => {
  const questionnaires = useSelector(questionnairesSelector);
  const dispatch = useDispatch();
  const [personalInfoItems] = useState([
    {
      title: "Backend разработчики",
      link: "/registration-candidate",
      description:
        "Java PHP Python C# React Vue.js NodeJs Golang Ruby JavaScript",
      available: true,
      img: BackEndImg,
    },
    {
      title: "Frontend разработчики",
      link: "/registration-candidate",
      description:
        "Java PHP Python C# React Vue.js NodeJs Golang Ruby JavaScript",
      available: true,
      img: FrontendImg,
    },
    {
      title: "Архитектура проектов",
      link: "/registration-candidate",
      description: "Потоки данных ER ERP CRM CQRS UML BPMN",
      available: true,
      img: ArchitectureImg,
    },
    {
      title: "Дизайн проектов",
      link: "/registration-candidate",
      description:
        "Java PHP Python C# React Vue.js NodeJs Golang Ruby JavaScript",
      available: true,
      img: DesignImg,
    },
    {
      title: "Тестирование проектов",
      link: "/registration-candidate",
      description: "SQL Postman TestRail Kibana Ручное тестирование",
      available: false,
      img: TestImg,
    },
    {
      title: "Администрирование проектов",
      link: "/registration-candidate",
      description: "DevOps ELK Kubernetes Docker Bash Apache Oracle Git",
      available: false,
      img: AdminImg,
    },
    {
      title: "Управление проектом",
      link: "/registration-candidate",
      description: "Scrum Kanban Agile Miro CustDev",
      available: false,
      img: ManageImg,
    },
    {
      title: "Копирайтинг проектов",
      link: "/registration-candidate",
      description: "Теги Заголовок H1 Дескриптор Абзац Сценарий",
      available: false,
      img: CopyImg,
    },
    {
      title: "Реклама и SMM",
      link: "/registration-candidate",
      description:
        "Java PHP Python C# React Vue.js NodeJs Golang Ruby JavaScript",
      available: false,
      img: SmmImg,
    },
  ]);
  const userId = localStorage.getItem("id");
  const [selectedCategory, setsetSelectedCategory] = useState(false);

  useEffect(() => {
    apiRequest(
      `/user-questionnaire/questionnaires-list?user_id=${userId}`
    ).then((res) => dispatch(setQuestionnaires(res)));
  }, []);

  return (
    <div className="quiz-page">
      <ProfileHeader />
      <HeadBottom />
      <div className="quiz-page__container">
        <ProfileBreadcrumbs
          links={[
            { name: "Главная", link: "/profile-candidate" },
            { name: "Тестирование", link: "/quiz" },
          ]}
        />
        <div className="quiz-page__title main-title">
          {!selectedCategory ? "Тестирование" : "Замена специализации"}
        </div>
        {!selectedCategory && (
          <>
            <div className="quiz-page__specialization">
              <SelectedCategory setSelectedCategory={setsetSelectedCategory} />
            </div>
            <div className="quiz-page__block">Доступные тесты</div>
            <div className="quiz-page__cards-test">
              {questionnaires.length ? (
                questionnaires.map((item, index) => (
                  <CardAvailableTest
                    description={
                      "Вы новичок с реальным опытом работы до 1 года, или без опыта"
                    }
                    path={"quiz/test"}
                    status={item.status}
                    title={item.questionnaire_title}
                    passedTest={item.passedTest}
                    key={index}
                  />
                ))
              ) : (
                <h1>Анкет нет</h1>
              )}
            </div>
            <div className="block-text">
              ИЛИ <Link to={""}>выполните тестове задание</Link> , без
              прохождения тестов
            </div>
          </>
        )}

        {selectedCategory && (
          <div className="quiz-page__categories-items">
            {personalInfoItems.map((item, index) => {
              return (
                <CategoriesItem
                  link={item.link}
                  key={index}
                  title={item.title}
                  img={item.img}
                  skills={item.description}
                  available={item.available}
                />
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
