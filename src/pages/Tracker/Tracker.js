import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getProjects,
  getToggleTab,
  modalToggle,
  setAllProjects,
  setToggleTab,
} from "@redux/projectsTrackerSlice";

import { urlForLocal } from "@utils/helper";

import { apiRequest } from "@api/request";

import { getCorrectDate } from "@components/Calendar/calendarHelper";
import BaseButton from "@components/Common/BaseButton/BaseButton";
import { Footer } from "@components/Common/Footer/Footer";
import { Loader } from "@components/Common/Loader/Loader";
import TrackerModal from "@components/Modal/Tracker/TrackerModal/TrackerModal";
import { Navigation } from "@components/Navigation/Navigation";
import { ProfileBreadcrumbs } from "@components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { ProfileHeader } from "@components/ProfileHeader/ProfileHeader";
import ProjectTiket from "@components/ProjectTiket/ProjectTiket";

import archive from "assets/icons/archiveTracker.svg";
import search from "assets/icons/serchIcon.png";
import project from "assets/icons/trackerProject.svg";
import tasks from "assets/icons/trackerTasks.svg";
import noProjects from "assets/images/noProjects.png";

import "./tracker.scss";
import avatarMok from "assets/images/avatarMok.png";

export const Tracker = () => {
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const tab = useSelector(getToggleTab);

  const [allTasks, setAllTasks] = useState([]);
  const [filteredAllTasks, setFilteredAllTasks] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filterCompleteTasks, setFilterCompleteTasks] = useState([]);
  const [allCompletedTasks, setAllCompletedTasks] = useState([]);

  const [modalCreateProject, setModalCreateProject] = useState(false);

  useEffect(() => {
    setLoader(true);
    apiRequest(
      `/project/project-list?user_id=${localStorage.getItem(
        "id"
      )}&expand=columns`
    ).then((el) => {
      dispatch(setAllProjects(el.projects));
      setLoader(false);
      // setAllCompletedTasks(el.projects.filter((project) => {
      //   if (project.status === 10 && project.columns.length) {
      //     return project
      //   }
      // }).map((project) => { return project.columns}).reduce((acu, curr) => {
      //   curr.forEach((item) => {
      //     acu.push(...item.tasks)
      //   })
      //   return acu
      // }, []))
    });
    apiRequest(
      `/task/get-user-tasks?user_id=${localStorage.getItem("id")}`
    ).then((el) => {
      const allTasks = el.filter((item) => item.status !== 0);
      const completedTasks = el.filter((item) => item.status === 0);
      setAllTasks(allTasks);
      setFilteredAllTasks(allTasks);
      setAllCompletedTasks(completedTasks);
      setFilterCompleteTasks(completedTasks);
    });
  }, []);

  const toggleTabs = (index) => {
    dispatch(setToggleTab(index));
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
      allCompletedTasks.filter((item) => {
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
            <TrackerModal
              active={modalCreateProject}
              setActive={setModalCreateProject}
              titleProject={"Укажите название проекта:"}
            ></TrackerModal>

            {loader && <Loader style="green" />}

            {Boolean(projects.length) &&
              !loader &&
              projects.map((project, index) => {
                return project.status !== 10 ? (
                  <ProjectTiket key={index} project={project}></ProjectTiket>
                ) : (
                  ""
                );
              })}
            {(!Boolean(projects.length) ||
              !Boolean(
                projects.filter((project) => project.status !== 10).length
              )) &&
              !loader && (
                <div className="no-projects">
                  <div className="no-projects__createNew">
                    <div>
                      <img src={noProjects} alt="noProjectImg" />
                      <p>Создайте свой первый проект</p>
                    </div>

                    <BaseButton
                      styles={"createProjectBtn"}
                      onClick={() => {
                        dispatch(modalToggle("createProject"));
                        setModalCreateProject(true);
                      }}
                    >
                      <span>+</span>Создать проект
                    </BaseButton>
                  </div>
                  <p className="no-projects__info">
                    Ставьте задачи, следите за прогрессом, ведите учёт рабочего
                    времени
                  </p>
                </div>
              )}
            {Boolean(projects.length) && !loader && (
              <div className="create-newProject">
                <BaseButton
                  styles="createProjectBtn"
                  onClick={() => {
                    dispatch(modalToggle("createProject"));
                    setModalCreateProject(true);
                  }}
                >
                  <span>+</span>Создать проект
                </BaseButton>
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
            {loader && <Loader style="green" />}
            {!loader && (
              <div className="taskList__wrapper">
                {Boolean(filteredAllTasks.length) &&
                  filteredAllTasks.map((task) => {
                    return (
                      <div className="task" key={task.id}>
                        <div className="task__info">
                          <h5>{task.title}</h5>
                          <p dangerouslySetInnerHTML={{ __html: task.description }} />
                        </div>
                        <div className="task__person">
                          <img
                            src={
                              task.user?.avatar ? urlForLocal(task.user.avatar) : avatarMok
                            }
                            alt="avatar"
                          />
                          <div className="task__project">
                            <p>{task.user.fio}</p>
                            <span>{getCorrectDate(task.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
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
                {loader && <Loader style="green" />}
                {!loader && (
                  <>
                    {Boolean(filterCompleteTasks.length) ? (
                      filterCompleteTasks.map((task, index) => {
                        return (
                          <div className="archive__completeTask" key={index}>
                            <div className="archive__completeTask__description">
                              <p>{task.title}</p>
                              <p className="date" dangerouslySetInnerHTML={{ __html: task.description }} />
                            </div>
                            <div className="archive__completeTask__info">
                              <img
                                src={
                                  task.user?.avatar ? urlForLocal(task.user.avatar) : avatarMok
                                }
                                alt="avatar"
                              />
                              <div className="archive__completeTask__info__project">
                                {/*<span>Проект</span>*/}
                                <p>{getCorrectDate(task.updated_at)}</p>
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
                  </>
                )}
              </div>
            </div>
            <div className="archive__projects">
              <div className="archive__title">
                <h3>Архив проектов:</h3>
                <p>
                  {projects.filter((project) => project.status === 10).length}{" "}
                  проект(ов)
                </p>
              </div>
              <div className="archive__tasksWrapper">
                {Boolean(
                  projects.filter((project) => project.status === 10).length
                ) ? (
                  projects.map((project, index) => {
                    return project.status === 10 ? (
                      <div className="archive__completeTask" key={index}>
                        <div className="archive__completeTask__description">
                          <p>{project.name}</p>
                          <p className="date">{project.date}</p>
                        </div>
                      </div>
                    ) : (
                      ""
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
