import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  activeLoader,
  deletePersonOnProject,
  filterCreatedByMe,
  filteredExecutorTasks,
  filteredParticipateTasks,
  getBoarderLoader,
  getProjectBoard,
  modalToggle,
  movePositionProjectTask,
  moveProjectTask,
  setColumnId,
  setColumnName,
  setColumnPriority,
  setProjectBoardFetch,
  setToggleTab,
} from "@redux/projectsTrackerSlice";

import { urlForLocal } from "@utils/helper";
import { caseOfNum } from "@utils/helper";

import { apiRequest } from "@api/request";

import { useNotification } from "@hooks/useNotification";

import BaseButton from "@components/Common/BaseButton/BaseButton";
import { Footer } from "@components/Common/Footer/Footer";
import { Loader } from "@components/Common/Loader/Loader";
import ModalTicket from "@components/Modal/Tracker/ModalTicket/ModalTicket";
import TrackerModal from "@components/Modal/Tracker/TrackerModal/TrackerModal";
import { Navigation } from "@components/Navigation/Navigation";
import { ProfileBreadcrumbs } from "@components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { ProfileHeader } from "@components/ProfileHeader/ProfileHeader";

import arrow from "assets/icons/arrows/arrowCalendar.png";
import arrowDown from "assets/icons/arrows/selectArrow.png";
import close from "assets/icons/close.png";
import commentsBoard from "assets/icons/commentsBoard.svg";
import del from "assets/icons/delete.svg";
import edit from "assets/icons/edit.svg";
import filesBoard from "assets/icons/filesBoard.svg";
import trackerNoTasks from "assets/icons/trackerNoTasks.svg";
import project from "assets/icons/trackerProject.svg";
import tasks from "assets/icons/trackerTasks.svg";
import accept from "assets/images/accept.png";
import archive from "assets/images/archiveIcon.png";
import avatarMok from "assets/images/avatarMok.png";

import { getCorrectDate } from "../../components/Calendar/calendarHelper";

export const ProjectTracker = () => {
  const dispatch = useDispatch();
  const projectId = useParams();

  const [openColumnSelect, setOpenColumnSelect] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);
  const [priorityTask, setPriorityTask] = useState(0);
  const [wrapperHover, setWrapperHover] = useState({});
  const [taskHover, setTaskHover] = useState({});
  const [modalAdd, setModalAdd] = useState(false);
  const [modalActiveTicket, setModalActiveTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [personListOpen, setPersonListOpen] = useState(false);
  const [checkBoxParticipateTasks, setCheckBoxParticipateTasks] =
    useState(false);
  const [filteredNoTasks, setFilteredNoTasks] = useState(false);
  const [checkBoxMyTasks, setCheckBoxMyTasks] = useState(false);
  const [selectedExecutor, setSelectedExecutor] = useState(null);
  const [selectExecutorOpen, setSelectedExecutorOpen] = useState(false);
  const startWrapperIndexTest = useRef({});
  const projectBoard = useSelector(getProjectBoard);
  const loader = useSelector(getBoarderLoader);
  const { showNotification } = useNotification();

  useEffect(() => {
    dispatch(activeLoader());
    dispatch(setProjectBoardFetch(projectId.id));
  }, []);

  useEffect(() => {
    const tasksHover = {};
    const columnHover = {};
    let columnsTasksEmpty = true;
    if (Object.keys(projectBoard).length) {
      projectBoard.columns.forEach((column) => {
        if (column.tasks.length) columnsTasksEmpty = false;
        setOpenColumnSelect((prevState) => ({
          ...prevState,
          [column.id]: false,
        }));
        columnHover[column.id] = false;
        column.tasks.forEach((task) => (tasksHover[task.id] = false));
      });
    }
    if (
      columnsTasksEmpty &&
      (checkBoxMyTasks || selectedExecutor || checkBoxParticipateTasks)
    ) {
      setFilteredNoTasks(true);
    } else {
      setFilteredNoTasks(false);
    }
    setWrapperHover(columnHover);
    setTaskHover(tasksHover);
  }, [projectBoard]);

  function dragStartHandler(e, task, columnId) {
    startWrapperIndexTest.current = { task: task, index: columnId };
  }

  function dragOverTaskHandler(e, task) {
    e.preventDefault();
    if (startWrapperIndexTest.current.task.id === task.id) {
      return;
    }
    setTaskHover((prevState) => ({ [prevState]: false, [task.id]: true }));
  }

  function dragLeaveTaskHandler() {
    setTaskHover((prevState) => ({ [prevState]: false }));
  }

  function dragEndTaskHandler() {
    setTaskHover((prevState) => ({ [prevState]: false }));
    setWrapperHover((prevState) => ({
      [prevState]: false,
    }));
  }

  function dragDropTaskHandler(e, task, column) {
    e.preventDefault();
    if (task.id === startWrapperIndexTest.current.task.id) {
      return;
    }
    const finishTask = column.tasks.indexOf(task);
    dispatch(
      movePositionProjectTask({
        startTask: startWrapperIndexTest.current.task,
        finishTask: task,
        finishIndex: finishTask,
      })
    );
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }

  function dragEnterHandler(columnId) {
    if (columnId === startWrapperIndexTest.current.index) {
      return;
    }

    setWrapperHover((prevState) => ({
      [prevState]: false,
      [columnId]: true,
    }));
  }

  function dragDropHandler(e, columnId) {
    e.preventDefault();

    setWrapperHover((prevState) => ({
      [prevState]: false,
    }));

    if (
      startWrapperIndexTest.current.index === columnId ||
      e.target.className.includes("__item")
    ) {
      return;
    }

    if (columnId !== startWrapperIndexTest.current.index) {
      dispatch(
        moveProjectTask({
          startWrapperIndex: startWrapperIndexTest.current,
          columnId,
        })
      );
    }
  }

  function selectedTabTask(columnId, length) {
    setSelectedTab(columnId);
    dispatch(modalToggle("createTiketProject"));
    setModalAdd(true);
    setPriorityTask(length);
  }

  function openTicket(e, task) {
    setSelectedTicket(task);
    setModalActiveTicket(true);
  }

  function deleteColumn(column) {
    const priorityColumns = [];
    apiRequest("/project-column/update-column", {
      method: "PUT",
      data: {
        column_id: column.id,
        project_id: projectBoard.id,
        status: 0,
      },
    }).then(() => {
      if (column.priority < projectBoard.columns.length) {
        for (let i = column.priority; i < projectBoard.columns.length; i++) {
          const currentColumn = {
            column_id: projectBoard.columns[i].id,
            priority: i,
          };
          priorityColumns.push(currentColumn);
        }
        apiRequest("/project-column/set-priority", {
          method: "POST",
          data: {
            project_id: projectBoard.id,
            data: JSON.stringify(priorityColumns),
          },
        }).then(() => {
          dispatch(setProjectBoardFetch(projectBoard.id));
        });
      } else {
        dispatch(setProjectBoardFetch(projectBoard.id));
      }
      showNotification({ show: true, text: "Колонка удалена", type: "error" });
    });
  }

  function deletePerson(userId) {
    apiRequest("/project/del-user", {
      method: "DELETE",
      data: {
        project_id: projectBoard.id,
        user_id: userId,
      },
    }).then(() => {
      dispatch(deletePersonOnProject(userId));
    });
  }

  function filterParticipateTasks() {
    if (!checkBoxParticipateTasks) {
      dispatch(filteredParticipateTasks(Number(localStorage.getItem("id"))));
    } else {
      dispatch(setProjectBoardFetch(projectId.id));
      setCheckBoxParticipateTasks(false);
      setCheckBoxMyTasks(false);
      setSelectedExecutor(null);
    }
    setCheckBoxParticipateTasks(!checkBoxParticipateTasks);
  }

  function filterMyTask() {
    if (!checkBoxMyTasks) {
      dispatch(filterCreatedByMe(Number(localStorage.getItem("id"))));
    } else {
      dispatch(setProjectBoardFetch(projectId.id));
      setCheckBoxParticipateTasks(false);
      setCheckBoxMyTasks(false);
      setSelectedExecutor(null);
    }
    setCheckBoxMyTasks(!checkBoxMyTasks);
  }

  function executorFilter(user) {
    dispatch(filteredExecutorTasks(user.user_id));
    setSelectedExecutor(user);
  }

  function deleteSelectedExecutorFilter() {
    setSelectedExecutor(null);
    setCheckBoxParticipateTasks(false);
    setCheckBoxMyTasks(false);
    dispatch(setProjectBoardFetch(projectId.id));
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
          <TrackerModal
            active={modalAdd}
            setActive={setModalAdd}
            selectedTab={selectedTab}
            priorityTask={priorityTask}
            projectUsers={projectBoard.projectUsers}
          />

          {loader && <Loader style="green" />}
          {!loader && (
            <div className="tracker__tabs__content__tasks tasks active__content">
              <div className="tasks__head">
                <div className="tasks__head__wrapper">
                  <h5>Проект : {projectBoard.name}</h5>

                  <div className="tasks__head__add">
                    <BaseButton
                      onClick={() => {
                        dispatch(modalToggle("createColumn"));
                        setModalAdd(true);
                      }}
                      styles={"button-add-column"}
                    >
                      +
                    </BaseButton>
                    {/* <span
                      onClick={() => {
                        dispatch(modalToggle("createColumn"));
                        setModalAdd(true);
                      }}
                    >
                      +
                    </span> */}
                    <p>добавить колонку</p>
                  </div>
                  <div className="tasks__head__persons">
                    {projectBoard.projectUsers?.length > 3 && (
                      <span className="countPersons">+1...</span>
                    )}
                    <div className="projectPersons">
                      {projectBoard.projectUsers?.length &&
                        projectBoard.projectUsers.slice(0, 3).map((person) => {
                          return (
                            <img
                              key={person.user_id}
                              src={
                                person.user?.avatar
                                  ? urlForLocal(person.user.avatar)
                                  : avatarMok
                              }
                              alt="avatar"
                            />
                          );
                        })}
                    </div>
                    <span
                      className="addPerson"
                      onClick={() => {
                        setPersonListOpen(true);
                      }}
                    >
                      +
                    </span>
                    <p>добавить участника</p>
                    {personListOpen && (
                      <div className="persons__list">
                        <img
                          className="persons__list__close"
                          src={close}
                          alt="close"
                          onClick={() => setPersonListOpen(false)}
                        />
                        <div className="persons__list__count">
                          <span>{projectBoard.projectUsers?.length}</span>
                          {caseOfNum(
                            projectBoard.projectUsers?.length,
                            "persons"
                          )}
                        </div>
                        <div className="persons__list__info">
                          <span>В проекте - </span>
                          <p>“{projectBoard.name}”</p>
                        </div>
                        <div className="persons__list__items">
                          {projectBoard.projectUsers?.map((person) => {
                            return (
                              <div
                                className="persons__list__item"
                                key={person.user_id}
                              >
                                <img
                                  className="avatar"
                                  src={
                                    person.user?.avatar
                                      ? urlForLocal(person.user.avatar)
                                      : avatarMok
                                  }
                                  alt="avatar"
                                />
                                <span>{person.user.fio}</span>
                                <img
                                  className="delete"
                                  src={close}
                                  alt="delete"
                                  onClick={() => deletePerson(person.user_id)}
                                />
                              </div>
                            );
                          })}
                        </div>
                        <div
                          className="persons__list__add"
                          onClick={() => {
                            dispatch(modalToggle("addWorker"));
                            setModalAdd(true);
                            setPersonListOpen(false);
                          }}
                        >
                          <span className="addPerson">+</span>
                          <p>Добавить участников</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className="tasks__head__checkBox"
                    onClick={filterParticipateTasks}
                  >
                    <span>Участвую</span>
                    <div className="tasks__head__checkBox__box">
                      {checkBoxParticipateTasks && (
                        <img src={accept} alt="accept" />
                      )}
                    </div>
                  </div>
                  <div className="tasks__head__checkBox" onClick={filterMyTask}>
                    <span>Мои</span>
                    <div className="tasks__head__checkBox__box">
                      {checkBoxMyTasks && <img src={accept} alt="accept" />}
                    </div>
                  </div>
                  {selectedExecutor ? (
                    <div className="tasks__head__executorSelected">
                      <p>{selectedExecutor.user.fio}</p>
                      <img
                        className="avatar"
                        src={
                          selectedExecutor.user?.avatar
                            ? urlForLocal(selectedExecutor.user.avatar)
                            : avatarMok
                        }
                        alt="avatar"
                      />
                      <img
                        className="delete"
                        src={close}
                        alt="delete"
                        onClick={deleteSelectedExecutorFilter}
                      />
                    </div>
                  ) : (
                    <div
                      className="tasks__head__executor"
                      onClick={() =>
                        setSelectedExecutorOpen(!selectExecutorOpen)
                      }
                    >
                      <p>Выберите исполнителя</p>
                      <img
                        className={selectExecutorOpen ? "open" : ""}
                        src={arrowDown}
                        alt="arrow"
                      />
                      {selectExecutorOpen && (
                        <div className="tasks__head__executorDropdown">
                          {projectBoard.projectUsers.map((user) => {
                            return (
                              <div
                                className="executorDropdown__person"
                                key={user.user_id}
                                onClick={() => executorFilter(user)}
                              >
                                <p>{user.user?.fio}</p>
                                <img
                                  src={
                                    user.user?.avatar
                                      ? urlForLocal(user.user.avatar)
                                      : avatarMok
                                  }
                                  alt="avatar"
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                  <Link to="/profile/tracker" className="tasks__head__back">
                    <p>Вернуться на проекты</p>
                    <img src={arrow} alt="arrow" />
                  </Link>
                </div>
              </div>

              {Boolean(modalActiveTicket) && (
                <ModalTicket
                  active={modalActiveTicket}
                  setActive={setModalActiveTicket}
                  task={selectedTicket}
                  projectId={projectBoard.id}
                  projectName={projectBoard.name}
                  projectUsers={projectBoard.projectUsers}
                />
              )}

              <div className="tasks__container">
                {Boolean(projectBoard?.columns) &&
                  !filteredNoTasks &&
                  Boolean(projectBoard.columns.length) &&
                  projectBoard.columns.map((column) => {
                    return (
                      <div
                        key={column.id}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDragEnter={() => dragEnterHandler(column.id)}
                        onDrop={(e) => dragDropHandler(e, column.id)}
                        className={`tasks__board ${
                          wrapperHover[column.id] ? "tasks__board__hover" : ""
                        }`}
                      >
                        <div className="board__head">
                          <span>{column.title}</span>
                          <div className="board__head__more">
                            <span
                              className="add"
                              onClick={() =>
                                selectedTabTask(
                                  column.id,
                                  projectBoard?.columns
                                    ? projectBoard?.columns[0].tasks.at(-1)
                                        .priority + 1
                                    : 1
                                )
                              }
                            >
                              +
                            </span>
                            <span
                              onClick={() => {
                                setOpenColumnSelect((prevState) => ({
                                  ...prevState,
                                  [column.id]: true,
                                }));
                              }}
                              className="more"
                            >
                              ...
                            </span>
                          </div>
                        </div>
                        {openColumnSelect[column.id] && (
                          <div className="column__select">
                            <div
                              className="column__select__item"
                              onClick={() => {
                                setOpenColumnSelect((prevState) => ({
                                  ...prevState,
                                  [column.id]: false,
                                }));
                                dispatch(modalToggle("editColumn"));
                                dispatch(setColumnName(column.title));
                                dispatch(setColumnId(column.id));
                                dispatch(setColumnPriority(column.priority));
                                setModalAdd(true);
                              }}
                            >
                              <img src={edit} alt="edit" />
                              <span>Изменить</span>
                            </div>
                            <div
                              className="column__select__item"
                              onClick={() => deleteColumn(column)}
                            >
                              <img src={del} alt="delete" />
                              <span>Удалить</span>
                            </div>
                          </div>
                        )}
                        {column.tasks.map((task) => {
                          return (
                            <div
                              key={task.id}
                              className={`tasks__board__item ${
                                taskHover[task.id] ? "task__hover" : ""
                              }`}
                              draggable={true}
                              onDragStart={(e) =>
                                dragStartHandler(e, task, column.id)
                              }
                              onDragOver={(e) => dragOverTaskHandler(e, task)}
                              onDragLeave={(e) => dragLeaveTaskHandler(e)}
                              onDragEnd={() => dragEndTaskHandler()}
                              onDrop={(e) =>
                                dragDropTaskHandler(e, task, column)
                              }
                              onClick={(e) => openTicket(e, task)}
                            >
                              <div className="tasks__board__item__title">
                                <p className="task__board__item__title">
                                  {task.title}
                                </p>
                              </div>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: task.description,
                                }}
                                className="tasks__board__item__description"
                              ></p>
                              <div className="tasks__board__item__executor">
                                <span>
                                  {task.executor?.fio
                                    ? task.executor?.fio
                                    : "Исполнитель не назначен"}
                                </span>
                                {task.executor?.avatar && (
                                  <img
                                    src={
                                      task.executor?.avatar
                                        ? urlForLocal(task.executor?.avatar)
                                        : avatarMok
                                    }
                                    alt="avatar"
                                  />
                                )}
                              </div>
                              <div className="tasks__board__item__deadLine">
                                <p>Срок исполнения:</p>
                                <span>
                                  {task.dead_line
                                    ? getCorrectDate(task.dead_line)
                                    : "Не выбран"}
                                </span>
                              </div>
                              <div className="tasks__board__item__info">
                                <div className="tasks__board__item__info__more">
                                  <img src={commentsBoard} alt="commentsImg" />
                                  <span>
                                    {task.comment_count}{" "}
                                    {caseOfNum(task.comment_count, "comments")}
                                  </span>
                                </div>
                                <div className="tasks__board__item__info__more">
                                  <img src={filesBoard} alt="filesImg" />
                                  <span>
                                    {task.files ? task.files : 0}{" "}
                                    {caseOfNum(0, "files")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                {Boolean(projectBoard?.columns) &&
                  !Boolean(projectBoard.columns.length) && (
                    <div className="tasks__board__noItems">
                      В проекте нет задач.
                    </div>
                  )}
                {filteredNoTasks && (
                  <div className="tasks__board__noTasks">
                    <div className="tasks__board__noTasksInfo">
                      <img src={trackerNoTasks} alt="noTasks" />
                      <p>Пока нет подходящих задач</p>
                    </div>
                    <p className="tasks__board__noTasksMore">
                      Ставьте задачи, следите за прогрессом, ведите учёт
                      рабочего времени
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
