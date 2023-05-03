import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import { Navigation } from "../../components/Navigation/Navigation";
import { ProfileBreadcrumbs } from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { Footer } from "../../components/Footer/Footer";

import { useDispatch, useSelector } from "react-redux";
import {
  getProjectBoard,
  modalToggle,
  moveProjectTask,
  setProjectBoardFetch,
  setToggleTab,
} from "../../redux/projectsTrackerSlice";

import ModalTicket from "../../components/UI/ModalTicket/ModalTicket";
import ModalAdd from "../../components/UI/ModalAdd/ModalAdd";

import project from "../../images/trackerProject.svg";
import tasks from "../../images/trackerTasks.svg";
import archive from "../../images/archiveTracker.svg";
import avatarTest from "../../images/AvatarTest .png";
import selectArrow from "../../images/select.svg";
import commentsBoard from "../../images/commentsBoard.svg";
import filesBoard from "../../images/filesBoard.svg";
import arrow from "../../images/arrowCalendar.png";

export const ProjectTracker = () => {
  const dispatch = useDispatch();
  const currentUrl = useState(window.location.pathname);
  const projectId = currentUrl[0].split("/").at(-1);

  useEffect(() => {
    dispatch(setProjectBoardFetch(projectId));
  }, []);

  const [modalAdd, setModalAdd] = useState(false);
  const [modalActiveTicket, setModalActiveTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});

  const [selectedTab, setSelectedTab] = useState(0);

  const startWrapperIndexTest = useRef({});
  const [wrapperHover, setWrapperHover] = useState([
    false,
    false,
    false,
    false,
  ]);

  const projectBoard = useSelector(getProjectBoard);

  // function toggleMoreTasks(columnId) {
  //     setTabTaskMok((prevArray) =>
  //         prevArray.map((elem, index) => {
  //             if (columnId === index) {
  //                 return { ...elem, open: !elem.open };
  //             } else {
  //                 return elem;
  //             }
  //         })
  //     );
  // }

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
      dispatch(
        moveProjectTask({
          startWrapperIndex: startWrapperIndexTest.current,
          columnId,
        })
      );
    }
  }

  function selectedTabTask(columnId) {
    setSelectedTab(columnId);
    dispatch(modalToggle("createTiketProject"));
    setModalAdd(true);
  }

  function openTicket(e, task) {
    setSelectedTicket(task);
    setModalActiveTicket(true);
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
          <Link
            to="/profile/tracker"
            className="tab active-tab tab"
            onClick={() => dispatch(setToggleTab(1))}
          >
            <img src={project} alt="img" />
            <p>Проекты </p>
          </Link>
          <Link
            to="/profile/tracker"
            className="tab"
            onClick={() => dispatch(setToggleTab(2))}
          >
            <img src={tasks} alt="img" />
            <p>Все мои задачи</p>
          </Link>
          <Link
            to="/profile/tracker"
            className="tab"
            onClick={() => dispatch(setToggleTab(3))}
          >
            <img src={archive} alt="img" />
            <p>Архив</p>
          </Link>
        </div>
        <div className="tracker__tabs__content">
          <div className="tracker__tabs__content__tasks tasks active__content">
            <div className="tasks__head">
              <div className="tasks__head__wrapper">
                <h4>Проект : {projectBoard.name}</h4>

                <ModalAdd
                  active={modalAdd}
                  setActive={setModalAdd}
                  selectedTab={selectedTab}
                ></ModalAdd>

                <div className="tasks__head__add">
                  <span
                    onClick={() => {
                      dispatch(modalToggle("createColumn"));
                      setModalAdd(true);
                    }}
                  >
                    +
                  </span>
                  <p>добавить колонку</p>
                </div>
                <div className="tasks__head__persons">
                  <img src={avatarTest} alt="avatar" />
                  <img src={avatarTest} alt="avatar" />
                  <span className="countPersons">+9</span>
                  <span
                    className="addPerson"
                    onClick={() => {
                      dispatch(modalToggle("addWorker"));
                      setModalAdd(true);
                    }}
                  >
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
                <Link to="/profile/tracker" className="tasks__head__back">
                  <p>Вернуться на проекты</p>
                  <img src={arrow} alt="arrow" />
                </Link>
              </div>
            </div>

            <ModalTicket
              active={modalActiveTicket}
              setActive={setModalActiveTicket}
              task={selectedTicket}
              projectId={projectBoard.id}
              projectName={projectBoard.name}
            />

            <div className="tasks__container">
              {Boolean(projectBoard?.columns) &&
                Boolean(projectBoard.columns.length) &&
                projectBoard.columns.map((column) => {
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
                        <span>{column.title}</span>
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
                          // onClick={() => toggleMoreTasks(column.id)}
                        >
                          {column.open ? "-" : "+"}
                        </span>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
