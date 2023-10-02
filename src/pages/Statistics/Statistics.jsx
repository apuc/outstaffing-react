import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setToggleTab } from "@redux/projectsTrackerSlice";

import { Navigation } from "@components/Navigation/Navigation";
import { ProfileBreadcrumbs } from "@components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { ProfileHeader } from "@components/ProfileHeader/ProfileHeader";

import arrow from "assets/icons/arrows/arrowCalendar.png";
import link from "assets/icons/link.svg";
import project from "assets/icons/trackerProject.svg";
import tasks from "assets/icons/trackerTasks.svg";
import archive from "assets/images/archiveIcon.png";

import "./statistics.scss";

const Statistics = () => {
  const dispatch = useDispatch();

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
                <span>ссылка на проект</span>
              </div>

              <div className="statistics-header__return">
                <img src={arrow} alt="#" />
                <span>вернуться на все проекты</span>
              </div>
            </div>
            <div className="statistics-info"></div>
            <div className="statistics-team"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
