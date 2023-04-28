import React, {useEffect, useRef, useState} from "react";

import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import { ProfileBreadcrumbs } from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { Footer } from "../../components/Footer/Footer";

import { useDispatch, useSelector } from "react-redux";
import { setAllProjects, getProjects, getProjectBoard, moveProjectTask, setProjectBoardFetch } from "../../redux/projectsTrackerSlice";

import ModalTicket from "../../components/UI/ModalTicket/ModalTicket";
import ModalCreate from "../../components/UI/ModalCreate/ModalCreate";
import ModalAdd from "../../components/UI/ModalAdd/ModalAdd";
import ProjectTiket from "../../components/ProjectTiket/ProjectTiket";

import project from "../../images/trackerProject.svg";
import tasks from "../../images/trackerTasks.svg";
import archive from "../../images/archiveTracker.svg";
import avatarTest from "../../images/AvatarTest .png";
import selectArrow from "../../images/select.svg";
import commentsBoard from "../../images/commentsBoard.svg";
import filesBoard from "../../images/filesBoard.svg";
import search from "../../images/serchIcon.png";
import noProjects from "../../images/noProjects.png";
import arrow from "../../images/arrowCalendar.png";

import {apiRequest} from "../../api/request";
import { Navigation } from "../../components/Navigation/Navigation";

import "./tracker.scss";

export const Tracker = () => {
  const dispatch = useDispatch();
  const [toggleTab, setToggleTab] = useState(1);
  const [allTasks] = useState([
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
    },
  ]);

  const [archiveProjects] = useState([
    {
      name: "Будущее России",
      date: "7 марта 2023 г",
    },
    {
      name: "Будущее России",
      date: "7 марта 2023 г",
    },
    {
      name: "Будущее России",
      date: "7 марта 2023 г",
    },
    {
      name: "Будущее России",
      date: "7 марта 2023 г",
    },
    {
      name: "Будущее России",
      date: "7 марта 2023 г",
    },
    {
      name: "Будущее России",
      date: "7 марта 2023 г",
    },
    {
      name: "Будущее России",
      date: "7 марта 2023 г",
    },
    {
      name: "Будущее России",
      date: "7 марта 2023 г",
    },
    {
      name: "Будущее России",
      date: "7 марта 2023 г",
    },
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
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: "7 марта 2023 г",
      avatarDo: avatarTest,
      project: "Будущее России",
    },
  ]);

  const [filterCompleteTasks, setFilterCompleteTasks] = useState(completeTasks);

  // Modal State
  const [modalActiveTicket, setModalActiveTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [modalAddWorker, setModalAddWorker] = useState(false);
  const [modalCreateProject, setModalCreateProject] = useState(false);
  const [modalCreateColl, setModalCreateColl] = useState(false);
  const [modalCreateTiket, setModalCreateTiket] = useState(false);
  const [valueTiket, setValueTiket] = useState("");
  const [descriptionTicket, setDescriptionTicket] = useState("")
  const [valueColl, setValueColl] = useState("");
  //

  const [projectTasksOpen, setProjectTasksOpen] = useState(false);

  const [selectedTab, setSelectedTab] = useState(0);

  const startWrapperIndexTest = useRef({})
  const [wrapperHover, setWrapperHover] = useState([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    apiRequest(`/project/project-list?user_id=${localStorage.getItem('id')}&expand=columns`).then((el) => {
      dispatch(setAllProjects(el.projects))
    })
  }, [])

  const projects = useSelector(getProjects);
  const projectBoard = useSelector(getProjectBoard);

  const toggleTabs = (index) => {
    if (projectTasksOpen) {
      setProjectTasksOpen(false);
    }
    setToggleTab(index);
  };

  function toggleMoreTasks(columnId) {
    setTabTaskMok((prevArray) =>
      prevArray.map((elem, index) => {
        if (columnId === index) {
          return { ...elem, open: !elem.open };
        } else {
          return elem;
        }
      })
    );
  }

  function dragStartHandler(e, task, columnId) {
    startWrapperIndexTest.current = { task: task, index: columnId };
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

  function dragEnterHandler(columnId) {
    if (columnId === startWrapperIndexTest.current.index) {
      return;
    }
    setWrapperHover((prevArray) =>
      prevArray.map((elem, index) => {
        if (index === columnId) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
  function dragDropHandler(e, columnId) {
    e.preventDefault();
    if (startWrapperIndexTest.current.index === columnId) {
      return;
    }
    setWrapperHover((prevArray) =>
      prevArray.map((elem) => {
        return false;
      })
    );

    if (columnId !== startWrapperIndexTest.current.index) {
      dispatch(moveProjectTask({startWrapperIndex: startWrapperIndexTest.current, columnId}))
    }
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

  function selectedTabTask(columnId) {
    setSelectedTab(columnId);
    setModalCreateTiket(true);
  }

  function openTicket(e, task) {
    setSelectedTicket(task);
    setModalActiveTicket(true);
  }

  function createTiket() {
    if (!valueTiket || !descriptionTicket) {
      return
    }

    apiRequest('/task/create-task', {
      method: 'POST',
      data: {
        project_id: projectBoard.id,
        title: valueTiket,
        description: descriptionTicket,
        status: 1,
        user_id: localStorage.getItem('id'),
        column_id: selectedTab
      }
    }).then((res) => {
      dispatch(setProjectBoardFetch(projectBoard.id))
    })

    setModalCreateTiket(false);
    setValueTiket("");
    setDescriptionTicket("")
  }

  function createTab() {
    if (!valueColl) {
      return
    }

    apiRequest('/project-column/create-column', {
      method: 'POST',
      data: {
        project_id: projectBoard.id,
        title: valueColl
      }
    }).then((res) => {
      dispatch(setProjectBoardFetch(projectBoard.id))
    })
    setValueColl("");
    setModalCreateColl(false);
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

            {Boolean(projects.length) &&
              !projectTasksOpen &&
              projects.map((project, index) => {
                return (
                  <ProjectTiket
                    key={index}
                    project={project}
                    setOpenProject={setProjectTasksOpen}
                  ></ProjectTiket>
                );
              })}
            {!Boolean(projects.length) && !projectTasksOpen && (
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
            {Boolean(projects.length) && !projectTasksOpen && (
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
              toggleTab === 1 && projectTasksOpen
                ? "tracker__tabs__content__tasks tasks active__content"
                : "tracker__tabs__content__projects"
            }
          >
            <div className="tasks__head">
              <div className="tasks__head__wrapper">
                <h4>Проект : {projectBoard.name}</h4>

                <ModalAdd
                  active={modalCreateColl}
                  setActive={setModalCreateColl}
                >
                  <div className="title-project">
                    <h4>Введите название колонки</h4>
                    <div className="input-container">
                      <input
                        className="name-project"
                        value={valueColl}
                        onChange={(e) => setValueColl(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <button className="button-add" onClick={createTab}>
                    Создать
                  </button>
                </ModalAdd>

                <ModalAdd active={modalAddWorker} setActive={setModalAddWorker}>
                  <div className="title-project">
                    <h4>Добавьте участника</h4>
                    <p className="title-project__decs">
                      Введите имя или e-mail{" "}
                    </p>
                    <div className="input-container">
                      <input
                        className="name-project"
                        value={valueTiket}
                        onChange={(e) => setValueTiket(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <button
                    className="button-add"
                    onClick={(e) => e.preventDefault()}
                  >
                    Добавить
                  </button>
                </ModalAdd>

                <div className="tasks__head__add">
                  <span onClick={() => setModalCreateColl(true)}>+</span>
                  <p>добавить колонку</p>
                </div>
                <div className="tasks__head__persons">
                  <img src={avatarTest} alt="avatar" />
                  <img src={avatarTest} alt="avatar" />
                  <span className="countPersons">+9</span>
                  <span className="addPerson" onClick={setModalAddWorker}>
                    +
                  </span>
                  <p>добавить участника</p>
                </div>
                <div className="tasks__head__select">
                  <span>Участвую</span>
                  <img src={selectArrow} alt="arrow" />
                </div>
                <div className="tasks__head__select">
                  <span>Мои</span>
                  <img src={selectArrow} alt="arrow" />
                </div>
                <div
                  className="tasks__head__back"
                  onClick={() => setProjectTasksOpen(false)}
                >
                  <p>Вернуться на проекты</p>
                  <img src={arrow} alt="arrow" />
                </div>
              </div>
            </div>

            <ModalTicket
              active={modalActiveTicket}
              setActive={setModalActiveTicket}
              task={selectedTicket}
              projectId={projectBoard.id}
              projectName = {projectBoard.name}
            />

            <ModalAdd active={modalCreateTiket} setActive={setModalCreateTiket}>
              <div className="title-project">
                <h4>Введите название и описание задачи</h4>
                <div className="input-container">
                  <input
                    className="name-project"
                    value={valueTiket}
                    onChange={(e) => setValueTiket(e.target.value)}
                    placeholder='Название задачи'
                  ></input>
                </div>
                <div className="input-container">
                  <input
                      className="name-project"
                      value={descriptionTicket}
                      onChange={(e) => setDescriptionTicket(e.target.value)}
                      placeholder='Описание задачи'
                  ></input>
                </div>
              </div>
              <button className="button-add" onClick={createTiket}>
                Создать
              </button>
            </ModalAdd>

            <div className="tasks__container">
              {Boolean(projectBoard?.columns) && Boolean(projectBoard.columns.length) && projectBoard.columns.map((column) => {
                return (
                  <div
                    key={column.id}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDragEnter={(e) => dragEnterHandler(column.id)}
                    onDrop={(e) => dragDropHandler(e, column.id)}
                    className={`tasks__board ${
                        column.tasks.length >= 3 ? "tasks__board__more" : ""
                    } ${
                      wrapperHover[column.id] ? "tasks__board__hover" : ""
                    }`}
                  >
                    <div className="board__head">
                      {/*<span className={wrapperIndex === 3 ? "done" : ""}>*/}
                      <span>
                        {column.title}
                      </span>
                      <div>
                        <span
                          className="add"
                          onClick={() => selectedTabTask(column.id)}
                        >
                          +
                        </span>
                        <span className="more">...</span>
                      </div>
                    </div>
                    {column.tasks.map((task, index) => {
                      if (index > 2) {
                        if (!column.open) {
                          return;
                        }
                      }
                      return (
                        <div
                          key={task.id}
                          className="tasks__board__item"
                          draggable={true}
                          onDragStart={(e) =>
                            dragStartHandler(e, task, column.id)
                          }
                          onDragEnd={(e) => dragEndHandler(e)}
                          onClick={(e) => openTicket(e, task)}
                        >
                          <div className="tasks__board__item__title">
                            <p>{task.title}</p>
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
                            {/*<div className="tasks__board__item__info__avatars">*/}
                            {/*  <img src={task.avatarCreated} alt="avatar" />*/}
                            {/*  <img src={task.avatarDo} alt="avatar" />*/}
                            {/*</div>*/}
                          </div>
                        </div>
                      );
                    })}
                    {column.tasks.length > 3 && (
                      <span
                        className={
                          column.open
                            ? "lessItems openItems"
                            : "moreItems openItems"
                        }
                        onClick={() => toggleMoreTasks(column.id)}
                      >
                        {column.open ? "-" : "+"}
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
                return (
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
                );
              })}
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
