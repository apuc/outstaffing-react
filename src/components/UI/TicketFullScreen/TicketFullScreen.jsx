import React, { useEffect, useState } from "react";

import { ProfileHeader } from "../../ProfileHeader/ProfileHeader";
import { ProfileBreadcrumbs } from "../../ProfileBreadcrumbs/ProfileBreadcrumbs";
import { Footer } from "../../Footer/Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import TrackerModal from "../TrackerModal/TrackerModal";
import { Navigation } from "../../Navigation/Navigation";
import { Loader } from "../../Loader/Loader";

import { useDispatch, useSelector } from "react-redux";
import {
  deletePersonOnProject,
  modalToggle,
  setProjectBoardFetch,
  setToggleTab,
  getProjectBoard,
  getBoarderLoader,
} from "../../../redux/projectsTrackerSlice";
import { apiRequest } from "../../../api/request";
import { urlForLocal } from "../../../helper";
import { getCorrectDate } from "../../Calendar/calendarHelper";

import project from "../../../images/trackerProject.svg";
import watch from "../../../images/watch.svg";
import file from "../../../images/fileModal.svg";
import send from "../../../images/send.svg";
import arrow2 from "../../../images/arrowStart.png";
import plus from "../../../images/plus.svg";
import tasks from "../../../images/trackerTasks.svg";
import archive from "../../../images/archiveTracker.svg";
import selectArrow from "../../../images/select.svg";
import arrow from "../../../images/arrowCalendar.png";
import link from "../../../images/link.svg";
import archive2 from "../../../images/archive.svg";
import del from "../../../images/delete.svg";
import edit from "../../../images/edit.svg";
import close from "../../../images/closeProjectPersons.svg";

import "./ticketFullScreen.scss";

export const TicketFullScreen = ({}) => {
  const [modalAddWorker, setModalAddWorker] = useState(false);
  const ticketId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projectBoard = useSelector(getProjectBoard);
  const boardLoader = useSelector(getBoarderLoader);
  const [taskInfo, setTaskInfo] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [inputsValue, setInputsValue] = useState({});
  const [loader, setLoader] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentsEditOpen, setCommentsEditOpen] = useState({});
  const [commentsEditText, setCommentsEditText] = useState({});
  const [personListOpen, setPersonListOpen] = useState(false);

  useEffect(() => {
    apiRequest(`/task/get-task?task_id=${ticketId.id}`).then((taskInfo) => {
      setTaskInfo(taskInfo);
      setInputsValue({
        title: taskInfo.title,
        description: taskInfo.description,
        comment: "",
      });
      apiRequest(
        `/comment/get-by-entity?entity_type=2&entity_id=${taskInfo.id}`
      ).then((res) => {
        setComments(res);
        res.forEach((item) => {
          setCommentsEditOpen((prevValue) => ({
            ...prevValue,
            [item.id]: false,
          }));
          setCommentsEditText((prevValue) => ({
            ...prevValue,
            [item.id]: item.text,
          }));
        });
      });
      dispatch(setProjectBoardFetch(taskInfo.project_id));
      setLoader(boardLoader);
    });
  }, []);

  function deleteTask() {
    apiRequest("/task/update-task", {
      method: "PUT",
      data: {
        task_id: ticketId.id,
        status: 0,
      },
    }).then((res) => {
      navigate(`/tracker/project/${taskInfo.project_id}`);
    });
  }

  function editTask() {
    apiRequest("/task/update-task", {
      method: "PUT",
      data: {
        task_id: taskInfo.id,
        title: inputsValue.title,
        description: inputsValue.description,
      },
    }).then((res) => {});
  }

  function createComment() {
    apiRequest("/comment/create", {
      method: "POST",
      data: {
        text: inputsValue.comment,
        entity_type: 2,
        entity_id: taskInfo.id,
      },
    }).then((res) => {
      let newComment = res;
      newComment.created_at = new Date();
      setInputsValue((prevValue) => ({ ...prevValue, comment: "" }));
      setComments((prevValue) => [...prevValue, newComment]);
      setCommentsEditOpen((prevValue) => ({ ...prevValue, [res.id]: false }));
      setCommentsEditText((prevValue) => ({
        ...prevValue,
        [res.id]: res.text,
      }));
    });
  }

  function deleteComment(commentId) {
    apiRequest("/comment/update", {
      method: "PUT",
      data: {
        comment_id: commentId,
        status: 0,
      },
    }).then((res) => {
      setComments((prevValue) =>
        prevValue.filter((item) => item.id !== commentId)
      );
    });
  }

  function editComment(commentId) {
    apiRequest("/comment/update", {
      method: "PUT",
      data: {
        comment_id: commentId,
        text: commentsEditText[commentId],
      },
    }).then((res) => {});
  }

  function deletePerson(userId) {
    apiRequest("/project/del-user", {
      method: "DELETE",
      data: {
        project_id: projectBoard.id,
        user_id: userId,
      },
    }).then((res) => {
      dispatch(deletePersonOnProject(userId));
    });
  }

  const toggleTabs = (index) => {
    dispatch(setToggleTab(index));
  };

  return (
    <section className="ticket-full-screen">
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
            className="tab active-tab"
            onClick={() => toggleTabs(1)}
          >
            <img src={project} alt="img" />
            <p>Проекты </p>
          </Link>
          <Link
            to="/profile/tracker"
            className="tab"
            onClick={() => toggleTabs(2)}
          >
            <img src={tasks} alt="img" />
            <p>Все мои задачи</p>
          </Link>
          <Link
            to="/profile/tracker"
            className="tab"
            onClick={() => toggleTabs(3)}
          >
            <img src={archive} alt="img" />
            <p>Архив</p>
          </Link>
        </div>
        {loader ? (
          <Loader />
        ) : (
          <>
            <div className="tracker__tabs__content content-tabs">
              <div className="tasks__head">
                <div className="tasks__head__wrapper">
                  <h4>Проект : {projectBoard.name}</h4>

                  <TrackerModal
                    active={modalAddWorker}
                    setActive={setModalAddWorker}
                  ></TrackerModal>

                  <div className="tasks__head__persons">
                    {/*<img src={avatarTest} alt="avatar" />*/}
                    {/*<img src={avatarTest} alt="avatar" />*/}
                    <span className="countPersons">
                      {projectBoard.projectUsers?.length}
                    </span>
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
                          участник
                        </div>
                        <div className="persons__list__info">
                          В проекте - <span>“{projectBoard.name}”</span>
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
                                  src={urlForLocal(person.user.avatar)}
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
                            setModalAddWorker(true);
                            setPersonListOpen(false);
                          }}
                        >
                          <span className="addPerson">+</span>
                          <p>Добавить участников</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="tasks__head__select">
                    <span>Учавствую</span>
                    <img src={selectArrow} alt="arrow" />
                  </div>
                  <div className="tasks__head__select">
                    <span>Мои</span>
                    <img src={selectArrow} alt="arrow" />
                  </div>
                  <Link to={`/profile/tracker`} className="link">
                    <div className="tasks__head__back">
                      <p>Вернуться на проекты</p>
                      <img src={arrow} alt="arrow" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="modal-tiket__content ticket">
              <div className="content ticket-whith">
                <div className="content__task">
                  <span>Задача</span>
                  {editOpen ? (
                    <input
                      value={inputsValue.title}
                      onChange={(e) => {
                        setInputsValue((prevValue) => ({
                          ...prevValue,
                          title: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <h5>{inputsValue.title}</h5>
                  )}
                  <div className="content__description">
                    {editOpen ? (
                      <input
                        value={inputsValue.description}
                        onChange={(e) => {
                          setInputsValue((prevValue) => ({
                            ...prevValue,
                            description: e.target.value,
                          }));
                        }}
                      />
                    ) : (
                      <p>{inputsValue.description}</p>
                    )}
                    {/*<img src={task} className="image-task"></img>*/}
                  </div>
                  <div className="content__communication">
                    <p className="tasks">
                      <button
                        onClick={() => {
                          dispatch(modalToggle("addSubtask"));
                          setModalAddWorker(true);
                        }}
                      >
                        <img src={plus}></img>
                        Добавить под задачу
                      </button>
                    </p>
                    <p className="file">
                      <button>
                        <img src={file}></img>
                        Загрузить файл
                      </button>
                      <span>{0}</span>
                      Файлов
                    </p>
                  </div>
                  <div className="content__input">
                    <input
                      placeholder="Оставить комментарий"
                      value={inputsValue.comment}
                      onChange={(e) => {
                        setInputsValue((prevValue) => ({
                          ...prevValue,
                          comment: e.target.value,
                        }));
                      }}
                    />
                    <img src={send} onClick={createComment}></img>
                  </div>
                  <div className="comments__list">
                    {comments.map((comment) => {
                      return (
                        <div className="comments__list__item" key={comment.id}>
                          <div className="comments__list__item__info">
                            <span>{getCorrectDate(comment.created_at)}</span>
                            <div
                              className={
                                commentsEditOpen[comment.id]
                                  ? "edit edit__open"
                                  : "edit"
                              }
                            >
                              <img
                                src={edit}
                                alt="edit"
                                onClick={() => {
                                  if (commentsEditOpen[comment.id]) {
                                    editComment(comment.id);
                                  }
                                  setCommentsEditOpen((prevValue) => ({
                                    ...prevValue,
                                    [comment.id]: !prevValue[comment.id],
                                  }));
                                }}
                              />
                            </div>
                            <img
                              src={del}
                              alt="delete"
                              onClick={() => deleteComment(comment.id)}
                            />
                          </div>
                          {commentsEditOpen[comment.id] ? (
                            <input
                              value={commentsEditText[comment.id]}
                              onChange={(e) => {
                                setCommentsEditText((prevValue) => ({
                                  ...prevValue,
                                  [comment.id]: e.target.value,
                                }));
                              }}
                            />
                          ) : (
                            <p>{commentsEditText[comment.id]}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="workers">
                <div className="workers_box">
                  <p className="workers__creator">
                    Создатель : <span>{taskInfo.user?.fio}</span>
                  </p>
                  <div>
                    {Boolean(taskInfo.taskUsers?.length) &&
                      taskInfo.taskUsers.map((worker, index) => {
                        return (
                          <div className="worker" key={index}>
                            <img src={worker.avatar}></img>
                            <p>{worker.name}</p>
                          </div>
                        );
                      })}
                  </div>

                  <div className="add-worker moreItems">
                    <button
                      onClick={() => {
                        dispatch(modalToggle("addWorker"));
                        setModalAddWorker(true);
                      }}
                    >
                      +
                    </button>
                    <span>Добавить исполнителя</span>
                  </div>
                  <div className="add-worker moreItems">
                    <button
                      onClick={() => {
                        dispatch(modalToggle("addWorker"));
                        setModalAddWorker(true);
                      }}
                    >
                      +
                    </button>
                    <span>Добавить участников</span>
                  </div>
                </div>

                <div className="workers_box-middle">
                  <div className="time">
                    <img src={watch}></img>
                    <span>Длительность : </span>
                    <p>{"0:00:00"}</p>
                  </div>

                  <button className="start">
                    Начать делать <img src={arrow2}></img>
                  </button>
                </div>

                <div className="workers_box-bottom">
                  <div
                    className={editOpen ? "edit" : ""}
                    onClick={() => {
                      if (editOpen) {
                        setEditOpen(!editOpen);
                        editTask();
                      } else {
                        setEditOpen(!editOpen);
                      }
                    }}
                  >
                    <img src={edit}></img>
                    <p>{editOpen ? "сохранить" : "редактировать"}</p>
                  </div>
                  <div>
                    <img src={link}></img>
                    <p>ссылка на проект</p>
                  </div>
                  <div>
                    <img src={archive2}></img>
                    <p>в архив</p>
                  </div>
                  <div onClick={deleteTask}>
                    <img src={del}></img>
                    <p>удалить</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default TicketFullScreen;
