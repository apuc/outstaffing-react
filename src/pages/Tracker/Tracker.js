import React, {useEffect, useState} from "react";

import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import { ProfileBreadcrumbs } from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { Footer } from "../../components/Footer/Footer";
import {apiRequest} from "../../api/request";
import { Navigation } from "../../components/Navigation/Navigation";

import { useDispatch, useSelector } from "react-redux";
import { setAllProjects, getProjects, setToggleTab, getToggleTab } from "../../redux/projectsTrackerSlice";

import ModalCreate from "../../components/UI/ModalCreate/ModalCreate";
import ProjectTiket from "../../components/ProjectTiket/ProjectTiket";
import { urlForLocal } from '../../helper'
import { getCorrectDate} from "../../components/Calendar/calendarHelper";
import { Loader } from "../../components/Loader/Loader";

import project from "../../images/trackerProject.svg";
import tasks from "../../images/trackerTasks.svg";
import archive from "../../images/archiveTracker.svg";
import avatarTest from "../../images/AvatarTest .png";
import search from "../../images/serchIcon.png";
import noProjects from "../../images/noProjects.png";

import "./tracker.scss";

export const Tracker = () => {
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const tab = useSelector(getToggleTab)
  const [allTasks, setAllTasks] = useState([])
  const [filteredAllTasks, setFilteredAllTasks] = useState([]);
  const [loader, setLoader] = useState(false)

  const [archiveProjects] = useState([
    {
      name: "Будущее России",
      date: "7 марта 2023 г",
    },
    {
      name: "Будущее России",
      date: "7 марта 2023 г",
    }
  ]);

  const [completeTasks] = useState([
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России",
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России",
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России",
    }
  ]);

  const [filterCompleteTasks, setFilterCompleteTasks] = useState(completeTasks);

  // Modal State
  const [modalCreateProject, setModalCreateProject] = useState(false);

  useEffect(() => {
    setLoader(true)
    apiRequest(`/project/project-list?user_id=${localStorage.getItem('id')}&expand=columns`).then((el) => {
      dispatch(setAllProjects(el.projects))
      setLoader(false)
    })
    apiRequest(`/task/get-user-tasks?user_id=${localStorage.getItem('id')}`).then((el) => {
      setAllTasks(el)
      setFilteredAllTasks(el)
    })
  }, [])

  const toggleTabs = (index) => {
    dispatch(setToggleTab(index))
  };

  function filterAllTask(e) {
    setFilteredAllTasks(
        allTasks.filter((item) => {
          if (!e.target.value) {
            return item;
          }
          if (
              item.title.toLowerCase().startsWith(e.target.value.toLowerCase()) ||
              item.description
                  .toLowerCase()
                  .startsWith(e.target.value.toLowerCase())
          ) {
            return item;
          }
        })
    );
  }

  function filterArchiveTasks(e) {
    setFilterCompleteTasks(
      completeTasks.filter((item) => {
        if (!e.target.value) {
          return item;
        }
        if (
          item.name.toLowerCase().startsWith(e.target.value.toLowerCase()) ||
          item.description
            .toLowerCase()
            .startsWith(e.target.value.toLowerCase())
        ) {
          return item;
        }
      })
    );
  }

  return (
    <div className="tracker">
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
          <div
            className={tab === 1 ? "tab active-tab" : "tab"}
            onClick={() => toggleTabs(1)}
          >
            <img src={project} alt="img" />
            <p>Проекты </p>
          </div>
          <div
            className={tab === 2 ? "tab active-tab" : "tab"}
            onClick={() => toggleTabs(2)}
          >
            <img src={tasks} alt="img" />
            <p>Все мои задачи</p>
          </div>
          <div
            className={tab === 3 ? "tab active-tab" : "tab"}
            onClick={() => toggleTabs(3)}
          >
            <img src={archive} alt="img" />
            <p>Архив</p>
          </div>
        </div>
        <div className="tracker__tabs__content">
          <div
            className={
              tab === 1
                ? "tracker__tabs__content__projects active__content tracker__tabs__content__wrapper"
                : "tracker__tabs__content__projects tracker__tabs__content__wrapper"
            }
          >
            <ModalCreate
              active={modalCreateProject}
              setActive={setModalCreateProject}
              title={"Укажите название проекта:"}
            />

            {loader &&
              <Loader style='green'/>
            }

            {Boolean(projects.length) && !loader &&
              projects.map((project, index) => {
                return (
                    project.status !== 10 ?
                      <ProjectTiket
                        key={index}
                        project={project}
                      ></ProjectTiket>
                        : ''
                );
              })}
            {(!Boolean(projects.length) || !Boolean(projects.filter((project) => project.status !== 10).length)) && !loader && (
              <div className="no-projects">
                <div className="no-projects__createNew">
                  <div>
                    <img src={noProjects} alt="noProjectImg" />
                    <p>Создайте свой первый проект</p>
                  </div>
                  <button
                    className="createProjectBtn"
                    onClick={() => setModalCreateProject(true)}
                  >
                    <span>+</span>Создать проект
                  </button>
                </div>
                <p className="no-projects__info">
                  Ставьте задачи, следите за прогрессом, ведите учёт рабочего
                  времени
                </p>
              </div>
            )}
            {Boolean(projects.length) && !loader && (
              <div className="create-newProject">
                <button
                  className="createProjectBtn"
                  onClick={() => setModalCreateProject(true)}
                >
                  <span>+</span>Создать проект
                </button>
                <p>
                  Ставьте задачи, следите за прогрессом, ведите учёт рабочего
                  времени
                </p>
              </div>
            )}
          </div>
          <div
            className={
              tab === 2
                ? "tracker__tabs__content__allTasks taskList tasks active__content"
                : "tracker__tabs__content__projects"
            }
          >
            <div className="taskList__head">
              <h3>Список всех задач</h3>
              <div className="taskList__head__search">
                <img src={search} alt="search" />
                <input
                  type="text"
                  placeholder="Найти задачу"
                  onChange={(event) => filterAllTask(event)}
                />
              </div>
            </div>
            {loader &&
              <Loader style='green' />
            }
            {!loader &&
              <div className="taskList__wrapper">
                {Boolean(filteredAllTasks.length) && filteredAllTasks.map((task) => {
                  return (
                    <div className="task" key={task.id}>
                      <div className="task__info">
                        <h5>{task.title}</h5>
                        <p>{task.description}</p>
                      </div>
                      <div className="task__person">
                        <img src={urlForLocal(task.user.avatar)} alt="avatar" />
                        <div className="task__project">
                          <p>{task.user.fio}</p>
                          <span>{getCorrectDate(task.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            }
          </div>
          <div
            className={
              tab === 3
                ? "tracker__tabs__content__archive active__content"
                : "tracker__tabs__content__projects"
            }
          >
            <div className="archive__tasks">
              <div className="archive__title">
                <h3>Архив задач:</h3>
                <p>{filterCompleteTasks.length} задач(а)</p>
                <div className="archive__tasks__search">
                  <img src={search} alt="search" />
                  <input
                    type="text"
                    placeholder="Найти задачу"
                    onChange={(event) => filterArchiveTasks(event)}
                  />
                </div>
              </div>
              <div className="archive__tasksWrapper">
                {Boolean(filterCompleteTasks.length) ? (
                  filterCompleteTasks.map((task, index) => {
                    return (
                      <div className="archive__completeTask" key={index}>
                        <div className="archive__completeTask__description">
                          <p>{task.description}</p>
                          <p className="date">{task.dateComplete}</p>
                        </div>
                        <div className="archive__completeTask__info">
                          <img src={task.avatarDo} alt="avatar" />
                          <div className="archive__completeTask__info__project">
                            <span>Проект</span>
                            <p>{task.project}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="archive__noItem">
                    <p>В архиве задач нет</p>
                  </div>
                )}
              </div>
            </div>
            <div className="archive__projects">
              <div className="archive__title">
                <h3>Архив проектов:</h3>
                <p>{archiveProjects.length} проект(ов)</p>
              </div>
              <div className="archive__tasksWrapper">
                {Boolean(archiveProjects) ? (
                  archiveProjects.map((project, index) => {
                    return (
                      <div className="archive__completeTask" key={index}>
                        <div className="archive__completeTask__description">
                          <p>{project.name}</p>
                          <p className="date">{project.date}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="archive__noItem">
                    <p>В архиве проектов нет</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
