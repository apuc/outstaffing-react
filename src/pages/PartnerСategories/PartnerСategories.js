import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import { ProfileBreadcrumbs } from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { Footer } from "../../components/Footer/Footer";

import { setPartnerEmployees } from "../../redux/outstaffingSlice";

import BackEndImg from "./images/personalBackEnd.png";
import FrontendImg from "./images/PersonalFrontend.png";
import ArchitectureImg from "./images/PersonalArchitecture.png";
import DesignImg from "./images/PersonalDesign.png";
import TestImg from "./images/PersonalTesters.png";
import AdminImg from "./images/PersonalAdmin.png";
import ManageImg from "./images/PersonalMng.png";
import CopyImg from "./images/PersonalCopy.png";
import SmmImg from "./images/PersonalSMM.png";
import rightArrow from "../../images/arrowRight.svg";
import avatarImg from "../PartnerEmployees/avatarMok.png";

import "./partnerСategories.scss";
import { Navigation } from "../../components/Navigation/Navigation";

export const PartnerCategories = () => {
  const dispatch = useDispatch();
  if (localStorage.getItem("role_status") !== "18") {
    return <Navigate to="/profile" replace />;
  }

  const [personalInfoItems] = useState([
    {
      title: "Backend разработчики",
      link: "/profile/categories/employees",
      description:
        "Java PHP Python C# React Vue.js NodeJs Golang Ruby JavaScript",
      available: true,
      img: BackEndImg,
    },
    {
      title: "Frontend разработчики",
      link: "/profile/categories/employees",
      description:
        "Java PHP Python C# React Vue.js NodeJs Golang Ruby JavaScript",
      available: true,
      img: FrontendImg,
    },
    {
      title: "Архитектура проектов",
      link: "/profile/categories/employees",
      description: "Потоки данных ER ERP CRM CQRS UML BPMN",
      available: true,
      img: ArchitectureImg,
    },
    {
      title: "Дизайн проектов",
      link: "/profile/categories/employees",
      description:
        "Java PHP Python C# React Vue.js NodeJs Golang Ruby JavaScript",
      available: true,
      img: DesignImg,
    },
    {
      title: "Тестирование проектов",
      link: "/profile/add-request",
      description: "SQL Postman TestRail Kibana Ручное тестирование",
      available: false,
      img: TestImg,
    },
    {
      title: "Администрирование проектов",
      link: "/profile/add-request",
      description: "DevOps ELK Kubernetes Docker Bash Apache Oracle Git",
      available: false,
      img: AdminImg,
    },
    {
      title: "Управление проектом",
      link: "/profile/add-request",
      description: "Scrum Kanban Agile Miro CustDev",
      available: false,
      img: ManageImg,
    },
    {
      title: "Копирайтинг проектов",
      link: "/profile/add-request",
      description: "Теги Заголовок H1 Дескриптор Абзац Сценарий",
      available: false,
      img: CopyImg,
    },
    {
      title: "Реклама и SMM",
      link: "/profile/add-request",
      description:
        "Java PHP Python C# React Vue.js NodeJs Golang Ruby JavaScript",
      available: false,
      img: SmmImg,
    },
  ]);

  const [mokPersons] = useState([
    {
      personAvatar: avatarImg,
      name: "Макаренко Дмитрий",
      qualification: "PHP Backend - разработчик",
      level: "Middle",
      project: "Админка НВД Консалтинг",
      tasks_in_progress: 5,
      month_hours: 140,
      id: 1,
    },
    {
      personAvatar: avatarImg,
      name: "Макаренко Дмитрий",
      qualification: "PHP Backend - разработчик",
      level: "Middle",
      project: "Админка НВД Консалтинг",
      tasks_in_progress: 5,
      month_hours: 140,
      id: 2,
    },
    {
      personAvatar: avatarImg,
      name: "Макаренко Дмитрий",
      qualification: "PHP Backend - разработчик",
      level: "Middle",
      project: "Админка НВД Консалтинг",
      tasks_in_progress: 5,
      month_hours: 140,
      id: 3,
    },
  ]);
  return (
    <div className="partnerCategories">
      <ProfileHeader />
      <Navigation />
      <div className="container">
        <ProfileBreadcrumbs
          links={[
            { name: "Главная", link: "/profile" },
            { name: "Данные моего персонала", link: "/profile/categories" },
          ]}
        />
        <h2 className="partnerCategories__title">Данные персонала</h2>
        <div className="partnerCategories__items">
          {personalInfoItems.map((item, index) => {
            return (
              <Link
                to={item.link}
                key={index}
                className={
                  item.available
                    ? "partnerCategories__item item"
                    : "partnerCategories__item item item__disable"
                }
                onClick={() => {
                  dispatch(setPartnerEmployees(mokPersons));
                }}
              >
                <div className="item__title">
                  <img src={item.img} alt={item.title} />
                  <h4>{item.title}</h4>
                </div>
                <div className="item__info">
                  <p>{item.description}</p>
                  <div className="more">
                    <img src={rightArrow} alt="arrow" />
                  </div>
                </div>
                {!item.available && (
                  <div className="item__disableHover">
                    <p>У вас нет персонала из категории</p>
                    <button>Подобрать</button>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};
