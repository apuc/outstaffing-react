import React, { useState } from "react";

import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import { Footer } from "../../components/Footer/Footer";

import project from "../../images/trackerProject.svg";
import tasks from "../../images/trackerTasks.svg";
import archive from "../../images/archiveTracker.svg";

import "./tracker.scss";
import ModalTiket from "../../components/UI/ModalTiket/ModalTiket";

export const Tracker = () => {
  const [toggleTab, setToggleTab] = useState(1);
  const [projects] = useState([
    {
      name: "Разработка трекера",
      count: 4,
    },
    {
      name: "Кинотеатр",
      count: 4,
    },
    {
      name: "Проект страхование",
      count: 4,
    },
  ]);

  // TODO: тест на готовом элементе(потом перенести в другую вкладку(ЗАДАЧИ))
  const [modalActive, setModalActive] = useState(false);

  const toggleTabs = (index) => {
    setToggleTab(index);
  };
  return (
    <div className="tracker">
      <ProfileHeader />
      <div className="container">
        <div className="tracker__content">
          <h2 className="tracker__title">Трекер</h2>
          <div className="tracker__tabs">
            <div className="tracker__tabs__head">
              <div
                className={toggleTab === 1 ? "tab active-tab" : "tab"}
                onClick={() => toggleTabs(1)}
              >
                <img src={project} alt="img" />
                <p>Проекты </p>
              </div>
              <div
                className={toggleTab === 2 ? "tab active-tab" : "tab"}
                onClick={() => toggleTabs(2)}
              >
                <img src={tasks} alt="img" />
                <p>Задачи</p>
              </div>
              <div
                className={toggleTab === 3 ? "tab active-tab" : "tab"}
                onClick={() => toggleTabs(3)}
              >
                <img src={archive} alt="img" />
                <p>Архив</p>
              </div>
            </div>
            <div className="tracker__tabs__content">
              <div
                className={
                  toggleTab === 1
                    ? "tracker__tabs__content__projects active__content"
                    : "tracker__tabs__content__projects"
                }
              >
                {projects.map((project, index) => {
                  return (
                    <div className="project">
                      <h3>{project.name}</h3>
                      <div className="project__info">
                        <p>Открытые задачи</p>
                        <span className="count">{project.count}</span>
                        <span className="add">+</span>
                      </div>
                    </div>
                  );
                })}

                {/* TODO: убрать потом клик на кнопке и перенести модалку*/}
                <button onClick={() => setModalActive(true)}>
                  <span>+</span>Создать проект
                </button>
                <ModalTiket active={modalActive} setActive={setModalActive} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
