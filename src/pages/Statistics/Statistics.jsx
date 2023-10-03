import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setToggleTab } from "@redux/projectsTrackerSlice";

import { Navigation } from "@components/Navigation/Navigation";
import { ProfileBreadcrumbs } from "@components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { ProfileHeader } from "@components/ProfileHeader/ProfileHeader";

import arrow from "assets/icons/arrows/arrowCalendar.png";
import emailImg from "assets/icons/emailStatistics.svg";
import link from "assets/icons/link.svg";
import project from "assets/icons/trackerProject.svg";
import tasks from "assets/icons/trackerTasks.svg";
import archive from "assets/images/archiveIcon.png";
import mockAvatar from "assets/images/mock/AvatarTest .png";

import "./statistics.scss";

const Statistics = () => {
  const dispatch = useDispatch();

  const teams = [
    {
      avatar: mockAvatar,
      name: "Дмитрий Рогов",
      email: "dmitryi.zavadskyi@yandex.ru",
      role: "Программист",
      status: true,
    },
    {
      avatar: mockAvatar,
      name: "Марина Орехова",
      email: "dmitryi.zavadskyi@yandex.ru",
      role: "Менеджер",
      status: true,
    },
    {
      avatar: mockAvatar,
      name: "Тамара Доценко",
      email: "dmitryi.zavadskyi@yandex.ru51515188151",
      role: "Тестировщик",
      status: false,
    },
    {
      avatar: mockAvatar,
      name: "Кек Лолов",
      email: "dm4124gmail.com",
      role: "PM",
      status: false,
    },
  ];

  const toggleTabs = (index) => {
    dispatch(setToggleTab(index));
  };
  return (
    <div className="statistics">
      <ProfileHeader />
      <Navigation />
      <div className="container">
        <div className="tracker__content">
          <ProfileBreadcrumbs
            links={[
              { name: "Главная", link: "/profile" },
              { name: "Трекер", link: "/profile/tracker" },
            ]}
          />
          <h2 className="tracker__title">Управление проектами с трекером</h2>
        </div>
      </div>
      <div className="tracker__tabs">
        <div className="tracker__tabs__head">
          <Link
            to="/profile/tracker"
            className="tab active-tab projectsTab"
            onClick={() => toggleTabs(1)}
          >
            <img src={project} alt="img" />
            <p>Проекты </p>
          </Link>
          <Link
            to="/profile/tracker"
            className="tab tasksTab"
            onClick={() => toggleTabs(2)}
          >
            <img src={tasks} alt="img" />
            <p>Все мои задачи</p>
          </Link>
          <Link
            to="/profile/tracker"
            className="tab archiveTab"
            onClick={() => toggleTabs(3)}
          >
            <img src={archive} alt="img" />
            <p>Архив</p>
          </Link>
        </div>
        <div className="tracker__tabs__content">
          <div className="tracker__tabs__content__wrapper statistics-body">
            <div className="statistics-header">
              <div className="statistics-header__menu">
                <h1>Статистика проекта</h1>
                <img src={link} alt="#" />
                <span className="return-text">ссылка на проект</span>
              </div>

              <div className="statistics-header__return">
                <img src={arrow} alt="#" />

                <Link to={`/profile/tracker`} className="return-text">
                  вернуться на все проекты
                </Link>
              </div>
            </div>
            <div className="statistics-info">
              <div className="statistics-info__head">
                <p>Проект: </p>
                <h1>{"Разработка трекера"}</h1>
              </div>
              <div className="statistics-info__team">
                <div className="project-info">
                  <div className="project-info__creator">
                    <span className="return-text">Создатель проекта:</span>
                    <div>
                      <p>{"Василий Тарасов"}</p>{" "}
                      <img src={mockAvatar} alt="#" />
                    </div>
                  </div>
                  <div className="project-info__tasks">
                    <div className="task-quantity">
                      <p>Открытые задачи</p>
                      <span className="task-quantity_open">{4}</span>
                    </div>
                    <div className="task-quantity">
                      <p>Задач в работе</p>
                      <span className="task-quantity_work">{5}</span>
                    </div>
                    <div className="task-quantity">
                      <p>Закрыто задач</p>
                      <span className="task-quantity_closed">{434}</span>
                    </div>
                  </div>
                </div>
                <div className="list-team">
                  <div className="list-team__title">
                    <span className="return-text">Участники проекта:</span>
                  </div>
                  <div className="list-team__head">
                    <p>Имя</p>
                    <p>Почта</p>
                    <p>Роль</p>
                    <p>Статус</p>
                  </div>
                  <div className="list-team__body">
                    {teams.map((item) => {
                      return (
                        <>
                          <div className="list-team__item">
                            <div className="person-name">
                              <img src={item.avatar} alt="#" />
                              <p>{item.name}</p>
                            </div>
                            <div className="person-email">
                              <img src={emailImg} alt="#" />
                              <p>{item.email}</p>
                            </div>

                            <p className="person-type">{item.role}</p>
                            {/* <span className="status status-active"> */}

                            <span
                              className={
                                item.status
                                  ? "status status-active"
                                  : "status status-none"
                              }
                            >
                              {item.status ? "Активно" : "Не активно"}
                            </span>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="add-person">
                  <span className="add-person__button">+</span>
                  <p>Добавить участников</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
