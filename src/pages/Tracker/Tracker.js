import React, { useState } from "react";

import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import {ProfileBreadcrumbs} from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { Footer } from "../../components/Footer/Footer";

import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../redux/projectsTrackerSlice";

import ModalTiket from "../../components/UI/ModalTiket/ModalTiket";
import ModalCreate from "../../components/UI/ModalCreate/ModalCreate";

import project from "../../images/trackerProject.svg";
import tasks from "../../images/trackerTasks.svg";
import archive from "../../images/archiveTracker.svg";
import avatarTest from "../../images/AvatarTest .png";
import selectArrow from "../../images/select.svg";
import commentsBoard from "../../images/commentsBoard.svg";
import filesBoard from "../../images/filesBoard.svg";
import search from "../../images/serchIcon.png";
import noProjects from "../../images/noProjects.png"
import arrow from '../../images/arrowCalendar.png'

import "./tracker.scss";

export const Tracker = () => {
  const [toggleTab, setToggleTab] = useState(1);
  const [tabTaskMok, setTabTaskMok] = useState([
    {
      name: "Открытые",
      open: false,
      tasks: [
        {
          task: "PR - 2245",
          description: "Сверстать часть таблицы. Сверстать часть таблицы",
          comments: 12,
          files: 0,
          avatarCreated: avatarTest,
          avatarDo: avatarTest,
          id: 1,
        },
        {
          task: "PR - 2245",
          description: "Сверстать часть таблицы. Сверстать часть таблицы",
          comments: 12,
          files: 0,
          avatarCreated: avatarTest,
          avatarDo: avatarTest,
          id: 2,
        },
      ],
    },
    {
      name: "В процессе",
      open: false,
      tasks: [
        {
          task: "PR - 2245",
          description: "Сверстать часть таблицы. Сверстать часть таблицы",
          comments: 12,
          files: 0,
          avatarCreated: avatarTest,
          avatarDo: avatarTest,
          id: 3,
        },
      ],
    },
    {
      name: "На проверке",
      open: false,
      tasks: [
        {
          task: "PR - 2245",
          description: "Сверстать часть таблицы. Сверстать часть таблицы",
          comments: 12,
          files: 0,
          avatarCreated: avatarTest,
          avatarDo: avatarTest,
          id: 4,
        },
        {
          task: "PR - 2245",
          description: "Сверстать часть таблицы. Сверстать часть таблицы",
          comments: 12,
          files: 0,
          avatarCreated: avatarTest,
          avatarDo: avatarTest,
          id: 5,
        },
        {
          task: "PR - 2245",
          description: "Сверстать часть таблицы. Сверстать часть таблицы",
          comments: 12,
          files: 0,
          avatarCreated: avatarTest,
          avatarDo: avatarTest,
          id: 6,
        },
        {
          task: "PR - 2245",
          description: "Сверстать часть таблицы. Сверстать часть таблицы",
          comments: 12,
          files: 0,
          avatarCreated: avatarTest,
          avatarDo: avatarTest,
          id: 9,
        },
      ],
    },
    {
      name: "Готово",
      open: false,
      tasks: [
        {
          task: "PR - 2245",
          description: "Сверстать часть таблицы. Сверстать часть таблицы",
          comments: 12,
          files: 0,
          avatarCreated: avatarTest,
          avatarDo: avatarTest,
          id: 7,
        },
        {
          task: "PR - 2245",
          description: "Сверстать часть таблицы. Сверстать часть таблицы",
          comments: 12,
          files: 0,
          avatarCreated: avatarTest,
          avatarDo: avatarTest,
          id: 8,
        },
      ],
    },
  ]);

  const [allTasks] = useState([
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
  ])

  const [archiveProjects] = useState([
      {
        name: "Будущее России",
        date: "7 марта 2023 г"
      },
      {
        name: "Будущее России",
        date: "7 марта 2023 г"
      },
      {
        name: "Будущее России",
        date: "7 марта 2023 г"
      },
      {
        name: "Будущее России",
        date: "7 марта 2023 г"
      },
      {
        name: "Будущее России",
        date: "7 марта 2023 г"
      },
      {
        name: "Будущее России",
        date: "7 марта 2023 г"
      },
      {
        name: "Будущее России",
        date: "7 марта 2023 г"
      },
      {
        name: "Будущее России",
        date: "7 марта 2023 г"
      },
      {
        name: "Будущее России",
        date: "7 марта 2023 г"
      },
    ]
  )

  const [completeTasks] = useState([
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России"
    },
  ]);

  const [filterCompleteTasks, setFilterCompleteTasks] = useState(completeTasks);

  // Modal State
  const [modalActiveTicket, setModalActiveTicket] = useState(false);
  const [modalCreateProject, setModalCreateProject] = useState(false);
  const [modalCreateColl, setModalCreateColl] = useState(false);
  const [modalCreateTiket, setModalCreateTiket] = useState(false);
  const [valueTiket, setValueTiket] = useState("");
  const [valueColl, setValueColl] = useState("");
  //

  const [projectTasksOpen, setProjectTasksOpen] = useState(false)

  const [selectedTab, setSelectedTab] = useState({
    name: "",
    indexTab: 0,
    task: [],
  });

  const [startWrapperIndex, setStartWrapperIndex] = useState(null);
  const [wrapperHover, setWrapperHover] = useState([
    false,
    false,
    false,
    false,
  ]);

  const projects = useSelector(getProjects);

  const toggleTabs = (index) => {
    if (projectTasksOpen) {
      setProjectTasksOpen(false)
    }
    setToggleTab(index);
  };

  function toggleMoreTasks(wrapperIndex) {
    setTabTaskMok((prevArray) =>
      prevArray.map((elem, index) => {
        if (wrapperIndex === index) {
          return { ...elem, open: !elem.open };
        } else {
          return elem;
        }
      })
    );
  }

  function dragStartHandler(e, task, wrapperIndex) {
    setStartWrapperIndex({ task: task, index: wrapperIndex });
    setTimeout(() => {
      e.target.classList.add("tasks__board__item__hide");
    }, 0);
  }

  function dragEndHandler(e) {
    setWrapperHover((prevArray) =>
      prevArray.map((elem) => {
        return false;
      })
    );
    e.target.classList.remove("tasks__board__item__hide");
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }

  function dragEnterHandler(wrapperIndex) {
    if (wrapperIndex === startWrapperIndex.index) {
      return;
    }
    setWrapperHover((prevArray) =>
      prevArray.map((elem, index) => {
        if (index === wrapperIndex) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  function dragDropHandler(e, wrapperIndex) {
    e.preventDefault();
    if (startWrapperIndex.index === wrapperIndex) {
      return;
    }
    setWrapperHover((prevArray) =>
      prevArray.map((elem) => {
        return false;
      })
    );
    setTabTaskMok((prevArray) =>
      prevArray.map((elem, index) => {
        if (index === wrapperIndex) {
          return { ...elem, tasks: [...elem.tasks, startWrapperIndex.task] };
        } else if (index === startWrapperIndex.index) {
          return {
            ...elem,
            tasks: elem.tasks.filter((item) => {
              return item.id !== startWrapperIndex.task.id;
            }),
          };
        } else {
          return elem;
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

  function selectedTabTask(e, wrapperIndex, name, tasks) {
    let tab = { name: name, indexTab: wrapperIndex, task: tasks };
    setSelectedTab(tab);
    setModalCreateTiket(true);
  }

  function createTiket() {
    tabTaskMok.filter((item) => {
      if (item.name == selectedTab.name) {
        let idItem = 0;

        item.tasks.forEach((item) => {
          idItem = item.id;
        });

        let newTiket = {
          task: valueTiket,
          description: "Сверстать часть таблицы. Сверстать часть таблицы",
          comments: 0,
          files: 0,
          avatarCreated: avatarTest,
          avatarDo: avatarTest,
          id: idItem + 1,
        };

        item.tasks.push(newTiket);
      }
    });
    setModalCreateTiket(false);
    setValueTiket("");
  }

  function createTab() {
    let newTab = {
      name: valueColl,
      open: false,
      tasks: [],
    };

    tabTaskMok.unshift(newTab);
    setValueColl("");
    setModalCreateColl(false);
  }

  return (
    <div className="tracker">
      <ProfileHeader />
      <div className="container">
        <div className="tracker__content">
          <ProfileBreadcrumbs links={[
            {name: 'Главная', link: '/profile'},
            {name: 'Трекер', link: '/profile/tracker'}
          ]}
          />
          <h2 className="tracker__title">Управление проектами с трекером</h2>
        </div>
      </div>
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
            <p>Все мои задачи</p>
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
                    ? "tracker__tabs__content__projects active__content tracker__tabs__content__wrapper"
                    : "tracker__tabs__content__projects tracker__tabs__content__wrapper"
              }
          >
            <ModalCreate
                active={modalCreateProject}
                setActive={setModalCreateProject}
                title={"Укажите название проекта:"}
            />
            {Boolean(projects.length) && !projectTasksOpen &&
              projects.map((project, index) => {
                return (
                    <div className="project" key={index} onClick={() => setProjectTasksOpen(true)}>
                      <h3>{project.name}</h3>
                      <div className="project__info">
                        <p>Открытые задачи</p>
                        <span className="count">{project.count}</span>
                        <span className="add">+</span>
                      </div>
                    </div>
                );
              })}
              {!Boolean(projects.length) && !projectTasksOpen &&
                <div className="no-projects">
                  <div className="no-projects__createNew">
                    <div>
                      <img src={noProjects} alt="noProjectImg" />
                      <p>Создайте свой первый проект</p>
                    </div>
                    <button className="createProjectBtn" onClick={() => setModalCreateProject(true)}>
                      <span>+</span>Создать проект
                    </button>
                  </div>
                  <p className="no-projects__info">Ставьте задачи, следите за прогрессом, ведите учёт рабочего времени</p>
                </div>
              }
            {Boolean(projects.length) && !projectTasksOpen &&
              <div className="create-newProject">
                <button className="createProjectBtn" onClick={() => setModalCreateProject(true)}>
                  <span>+</span>Создать проект
                </button>
                <p>Ставьте задачи, следите за прогрессом, ведите учёт рабочего времени</p>
              </div>
            }
          </div>
          <div
              className={
                toggleTab === 1 && projectTasksOpen
                    ? "tracker__tabs__content__tasks tasks active__content"
                    : "tracker__tabs__content__projects"
              }
          >
            <div className="tasks__head">
              <div className="tasks__head__wrapper">
                <h4>Проект : Разработка трекера</h4>
                <div
                    className={
                      modalCreateColl ? "modal-project active" : "modal-project"
                    }
                    onClick={() => setModalCreateColl(false)}
                >
                  <div
                      className="modal-project__content"
                      onClick={(e) => e.stopPropagation()}
                  >
                    <div className="title-project">
                      <h4>Введите название карточки</h4>
                      <div className="input-container">
                        <input
                            className="name-project"
                            value={valueColl}
                            onChange={(e) => setValueColl(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <button className="create-project" onClick={createTab}>
                      Создать
                    </button>
                  </div>
                </div>
                <div className="tasks__head__add">
                  <span
                      onClick={() => setModalCreateColl(true)}
                  >
                        +
                  </span>
                  <p>добавить задачу в проект</p>
                </div>
                <div className="tasks__head__persons">
                  <img src={avatarTest} alt="avatar" />
                  <img src={avatarTest} alt="avatar" />
                  <span className="countPersons">+9</span>
                  <span className="addPerson">+</span>
                  <p>добавить участника в проект</p>
                </div>
                <div className="tasks__head__select">
                  <span>Учавствую</span>
                  <img src={selectArrow} alt="arrow" />
                </div>
                <div className="tasks__head__select">
                  <span>Мои</span>
                  <img src={selectArrow} alt="arrow" />
                </div>
                <div className="tasks__head__back" onClick={() => setProjectTasksOpen(false)}>
                  <p>Вернуться на проекты</p>
                  <img src={arrow} alt="arrow"/>
                </div>
              </div>
            </div>

            <ModalTiket
                active={modalActiveTicket}
                setActive={setModalActiveTicket}
            />

            <div
                className={
                  modalCreateTiket ? "modal-project active" : "modal-project"
                }
                onClick={() => setModalCreateTiket(false)}
            >
              <div
                  className="modal-project__content"
                  onClick={(e) => e.stopPropagation()}
              >
                <div className="title-project">
                  <h4>Введите название карточки</h4>
                  <div className="input-container">
                    <input
                        className="name-project"
                        value={valueTiket}
                        onChange={(e) => setValueTiket(e.target.value)}
                    ></input>
                  </div>
                </div>
                <button className="create-project" onClick={createTiket}>
                  Создать
                </button>
              </div>
            </div>

            <div className="tasks__container">
              {tabTaskMok.map((section, wrapperIndex) => {
                return (
                    <div
                        key={wrapperIndex}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDragEnter={(e) => dragEnterHandler(wrapperIndex)}
                        onDrop={(e) => dragDropHandler(e, wrapperIndex)}
                        className={`tasks__board ${
                            section.tasks.length >= 3 ? "tasks__board__more" : ""
                        } ${
                            wrapperHover[wrapperIndex]
                                ? "tasks__board__hover"
                                : ""
                        }`}
                    >
                      <div className="board__head">
                          <span className={wrapperIndex === 3 ? "done" : ""}>
                            {section.name}
                          </span>
                        <div>
                            <span
                                className="add"
                                onClick={(e) =>
                                    selectedTabTask(
                                        e,
                                        wrapperIndex,
                                        section.name,
                                        section.tasks
                                    )
                                }
                            >
                              +
                            </span>
                          <span className="more">...</span>
                        </div>
                      </div>
                      {section.tasks.map((task, index) => {
                        if (index > 2) {
                          if (!section.open) {
                            return;
                          }
                        }
                        return (
                            <div
                                key={index}
                                className="tasks__board__item"
                                draggable={true}
                                onDragStart={(e) =>
                                    dragStartHandler(e, task, wrapperIndex)
                                }
                                onDragEnd={(e) => dragEndHandler(e)}
                                onClick={() => setModalActiveTicket(true)}
                            >
                              <div className="tasks__board__item__title">
                                <p>{task.task}</p>
                              </div>
                              <p className="tasks__board__item__description">
                                {task.description}
                              </p>
                              <div className="tasks__board__item__info">
                                <div className="tasks__board__item__info__more">
                                  <img src={commentsBoard} alt="commentsImg" />
                                  <span>{task.comments} коментариев</span>
                                </div>
                                <div className="tasks__board__item__info__more">
                                  <img src={filesBoard} alt="filesImg" />
                                  <span>{task.files} файлов</span>
                                </div>
                                <div className="tasks__board__item__info__avatars">
                                  <img src={task.avatarCreated} alt="avatar" />
                                  <img src={task.avatarDo} alt="avatar" />
                                </div>
                              </div>
                            </div>
                        );
                      })}
                      {section.tasks.length > 3 && (
                          <span
                              className={
                                section.open
                                    ? "lessItems openItems"
                                    : "moreItems openItems"
                              }
                              onClick={() => toggleMoreTasks(wrapperIndex)}
                          >
                            {section.open ? "-" : "+"}
                          </span>
                      )}
                    </div>
                );
              })}
            </div>
          </div>
          <div
              className={
                toggleTab === 2
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
                    onChange={(event) => filterArchiveTasks(event)}
                />
              </div>
            </div>
            <div className="taskList__wrapper">
              {allTasks.map((task, index) => {
                  return(
                      <div className="task" key={index}>
                        <div className="task__info">
                          <h5>{task.name}</h5>
                          <p>{task.description}</p>
                        </div>
                        <div className="task__person">
                          <img src={task.avatarDo} alt="avatar" />
                          <div className="task__project">
                            <p>{task.project}</p>
                            <span>{task.dateComplete}</span>
                          </div>
                        </div>
                      </div>
                  )
                })
              }
            </div>
          </div>
          <div
              className={
                toggleTab === 3
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
                {Boolean(filterCompleteTasks.length) ?
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
                  :
                  <div className="archive__noItem">
                    <p>В архиве задач нет</p>
                  </div>
                }
              </div>
            </div>
            <div className="archive__projects">
              <div className="archive__title">
                <h3>Архив проектов:</h3>
                <p>{archiveProjects.length} проект(ов)</p>
              </div>
              <div className="archive__tasksWrapper">
                {Boolean(archiveProjects) ?
                  archiveProjects.map((project, index) => {
                      return (
                          <div className="archive__completeTask" key={index}>
                            <div className="archive__completeTask__description">
                              <p>{project.name}</p>
                              <p className="date">{project.date}</p>
                            </div>
                          </div>
                      )
                    })
                  :
                  <div className="archive__noItem">
                    <p>В архиве проектов нет</p>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
