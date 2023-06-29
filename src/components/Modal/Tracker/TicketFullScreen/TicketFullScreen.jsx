import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  deletePersonOnProject,
  getBoarderLoader,
  modalToggle, setProjectBoardFetch,
  setToggleTab
} from "@redux/projectsTrackerSlice";

import { getCorrectRequestDate, urlForLocal } from "@utils/helper";

import { apiRequest } from "@api/request";

import BaseButton from "@components/Common/BaseButton/BaseButton";
import { Footer } from "@components/Common/Footer/Footer";
import { Loader } from "@components/Common/Loader/Loader";
import TrackerModal from "@components/Modal/Tracker/TrackerModal/TrackerModal";
import { Navigation } from "@components/Navigation/Navigation";
import { ProfileBreadcrumbs } from "@components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { ProfileHeader } from "@components/ProfileHeader/ProfileHeader";
import TrackerTaskComment from "@components/TrackerTaskComment/TrackerTaskComment";

import archive from "assets/icons/archive.svg";
import archive2 from "assets/icons/archive.svg";
import arrow from "assets/icons/arrows/arrowCalendar.png";
import arrowStart from "assets/icons/arrows/arrowStart.png";
import close from "assets/icons/close.png";
import del from "assets/icons/delete.svg";
import edit from "assets/icons/edit.svg";
import file from "assets/icons/fileModal.svg";
import link from "assets/icons/link.svg";
import send from "assets/icons/send.svg";
import project from "assets/icons/trackerProject.svg";
import tasks from "assets/icons/trackerTasks.svg";
import watch from "assets/icons/watch.svg";
import avatarMok from "assets/images/avatarMok.png";

import "./ticketFullScreen.scss";

export const TicketFullScreen = () => {
  const [modalAddWorker, setModalAddWorker] = useState(false);
  const ticketId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boardLoader = useSelector(getBoarderLoader);
  const [projectInfo, setProjectInfo] = useState({})
  const [taskInfo, setTaskInfo] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [inputsValue, setInputsValue] = useState({});
  const [loader, setLoader] = useState(true);
  const [comments, setComments] = useState([]);
  const [personListOpen, setPersonListOpen] = useState(false);
  const [timerStart, setTimerStart] = useState(false);
  const [timerInfo, setTimerInfo] = useState({});
  const [currentTimerCount, setCurrentTimerCount] = useState({
    hours: 0,
    minute: 0,
    seconds: 0,
  });
  const [timerId, setTimerId] = useState(null);
  const [dropListOpen, setDropListOpen] = useState(false);
  const [correctProjectUsers, setCorrectProjectUsers] = useState([]);
  const [dropListMembersOpen, setDropListMembersOpen] = useState(false);
  const [users, setUsers] = useState([]);

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
        const comments = res.reduce((acc, cur) => {
          if (!cur.parent_id) {
            acc.push({ ...cur, subComments: [] });
          } else {
            acc.forEach((item) => {
              if (item.id === cur.parent_id) item.subComments.push(cur);
            });
          }
          return acc;
        }, []);
        setComments(comments);
      });
      apiRequest(
        `/timer/get-by-entity?entity_type=2&entity_id=${taskInfo.id}`
      ).then((res) => {
        let timerSeconds = 0;
        res.length &&
          res.forEach((time) => {
            timerSeconds += time.deltaSeconds;
            setCurrentTimerCount({
              hours: Math.floor(timerSeconds / 60 / 60),
              minute: Math.floor((timerSeconds / 60) % 60),
              seconds: timerSeconds % 60,
            });
            updateTimerHours = Math.floor(timerSeconds / 60 / 60);
            updateTimerMinute = Math.floor((timerSeconds / 60) % 60);
            updateTimerSec = timerSeconds % 60;
            if (!time.stopped_at) {
              setTimerStart(true);
              startTimer();
              setTimerInfo(time);
            }
          });
      });
      apiRequest(`/project/get-project?project_id=${taskInfo.project_id}&expand=columns`).then((res) => {
        setProjectInfo(res)
        setCorrectProjectUsers(res.projectUsers)
      })
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
    }).then(() => {
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
    }).then(() => {});
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
      newComment.subComments = [];
      setInputsValue((prevValue) => ({ ...prevValue, comment: "" }));
      setComments((prevValue) => [...prevValue, newComment]);
    });
  }

  function startTaskTimer() {
    apiRequest("/timer/create", {
      method: "POST",
      data: {
        entity_type: 2,
        entity_id: taskInfo.id,
        created_at: getCorrectRequestDate(new Date()),
      },
    }).then((res) => {
      setTimerStart(true);
      setTimerInfo(res);
      startTimer();
    });
  }

  function stopTaskTimer() {
    apiRequest("/timer/update", {
      method: "PUT",
      data: {
        timer_id: timerInfo.id,
        stopped_at: getCorrectRequestDate(new Date()),
      },
    }).then(() => {
      setTimerStart(false);
      clearInterval(timerId);
    });
  }

  function deletePerson(userId) {
    apiRequest("/project/del-user", {
      method: "DELETE",
      data: {
        project_id: projectInfo.id,
        user_id: userId,
      },
    }).then(() => {
      dispatch(deletePersonOnProject(userId));
    });
  }

  function commentDelete(comment) {
    setComments((prevValue) =>
      prevValue.filter((item) => item.id !== comment.id)
    );
    if (comment.subComments.length) {
      comment.subComments.forEach((subComment) => {
        apiRequest("/comment/update", {
          method: "PUT",
          data: {
            comment_id: subComment.id,
            status: 0,
          },
        }).then(() => {});
      });
    }
  }

  function addSubComment(commentId, subComment) {
    const addSubComment = comments;
    addSubComment.forEach((comment) => {
      if (comment.id === commentId) {
        comment.subComments.push(subComment);
      }
    });
    setComments(addSubComment);
  }

  function subCommentDelete(subComment) {
    const deleteSubComment = comments;
    deleteSubComment.forEach((comment, index) => {
      if (comment.id === subComment.parent_id) {
        deleteSubComment[index].subComments = comment.subComments.filter(
          (item) => item.id !== subComment.id
        );
      }
    });
    setComments([...deleteSubComment]);
  }

  const toggleTabs = (index) => {
    dispatch(setToggleTab(index));
  };

  function copyTicketLink() {
    navigator.clipboard.writeText(
      `https://itguild.info/tracker/task/${taskInfo.id}`
    );
  }

  function startTimer() {
    setTimerId(
      setInterval(() => {
        run();
      }, 1000)
    );
  }

  useEffect(() => {
    if (taskInfo.taskUsers && projectInfo.projectUsers) {
      let ids = taskInfo.taskUsers.map((user) => user.user_id);
      setUsers(
        projectInfo.projectUsers.reduce((acc, cur) => {
          if (!ids.includes(cur.user_id)) acc.push(cur);
          return acc;
        }, [])
      );
    }
  }, [taskInfo.taskUsers, projectInfo]);

  let updateTimerSec = currentTimerCount.seconds,
    updateTimerMinute = currentTimerCount.minute,
    updateTimerHours = currentTimerCount.hours;

  function run() {
    updateTimerSec++;
    if (updateTimerSec > 60) {
      updateTimerMinute++;
      updateTimerSec = 0;
    }
    if (updateTimerMinute === 60) {
      updateTimerMinute = 0;
      updateTimerHours++;
    }

    return setCurrentTimerCount({
      hours: updateTimerHours,
      minute: updateTimerMinute,
      seconds: updateTimerSec,
    });
  }

  function correctTimerTime(time) {
    if (time < 10) return `0${time}`;
    if (time > 10) return time;
  }

  function deleteTaskExecutor() {
    apiRequest("/task/update-task", {
      method: "PUT",
      data: {
        task_id: taskInfo.id,
        executor_id: 0,
      },
    }).then(() => {
      setTaskInfo((prevState) => ({
        ...prevState,
        executor_id: null,
        executor: null
      }))
    });
  }

  function taskExecutor(person) {
    apiRequest("/task/update-task", {
      method: "PUT",
      data: {
        task_id: taskInfo.id,
        executor_id: person.user_id,
      },
    }).then((res) => {
      setDropListOpen(false);
      setTaskInfo((prevState) => ({
        ...prevState,
        executor_id: res.executor_id,
        executor: res.executor
      }))
    });
  }

  function deleteMember(person) {
    apiRequest("/task/del-user", {
      method: "DELETE",
      data: {
        task_id: taskInfo.id,
        user_id: person.user_id,
      },
    }).then(() => {
      setTaskInfo((prevState) => ({
        ...prevState,
        taskUsers: taskInfo.taskUsers.filter((item) => item.user_id !== person.user_id)
      }))
    });
  }

  function addMember(person) {
    apiRequest("/task/add-user-to-task", {
      method: "POST",
      data: {
        task_id: taskInfo.id,
        user_id: person.user_id,
      },
    }).then((res) => {
      setDropListMembersOpen(false);
      setTaskInfo((prevValue) => ({
        ...prevValue,
        taskUsers: [...prevValue.taskUsers, res]
      }));
    });
  }

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
                  <h5>Проект : {projectInfo.name}</h5>

                  <TrackerModal
                    active={modalAddWorker}
                    setActive={setModalAddWorker}
                  ></TrackerModal>

                  <div className="tasks__head__persons">
                    {projectInfo.projectUsers?.length > 3 && (
                      <span className="countPersons">+1...</span>
                    )}
                    <div className="projectPersons">
                      {projectInfo.projectUsers?.length &&
                        projectInfo.projectUsers
                          .slice(
                            0,
                            3
                          )
                          .map((person) => {
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
                          <span>{projectInfo.projectUsers?.length}</span>
                          участник
                        </div>
                        <div className="persons__list__info">
                          В проекте - <span>“{projectInfo.name}”</span>
                        </div>
                        <div className="persons__list__items">
                          {projectInfo.projectUsers?.map((person) => {
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
                      <CKEditor
                        editor={ClassicEditor}
                        data={inputsValue.description}
                        config={{
                          removePlugins: [
                            "CKFinderUploadAdapter",
                            "CKFinder",
                            "EasyImage",
                            "Image",
                            "ImageCaption",
                            "ImageStyle",
                            "ImageToolbar",
                            "ImageUpload",
                            "MediaEmbed",
                            "BlockQuote",
                          ],
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setInputsValue((prevValue) => ({
                            ...prevValue,
                            description: data,
                          }));
                        }}
                      />
                    ) : (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: inputsValue.description,
                        }}
                      />
                    )}
                  </div>
                  <div className="content__communication">
                    {/*<p className="tasks">*/}
                    {/*  <BaseButton*/}
                    {/*    onClick={() => {*/}
                    {/*      dispatch(modalToggle("addSubtask"));*/}
                    {/*      setModalAddWorker(true);*/}
                    {/*    }}*/}
                    {/*    styles={"button-green-add"}*/}
                    {/*  >*/}
                    {/*    <img src={plus}></img>*/}
                    {/*    Добавить под задачу*/}
                    {/*  </BaseButton>*/}
                    {/*</p>*/}
                    <p className="file">
                      <BaseButton styles={"button-add-file"}>
                        <img src={file}></img>
                        Загрузить файл
                      </BaseButton>
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
                    <img src={send} onClick={createComment} alt="send"></img>
                  </div>
                  <div className="comments__list">
                    {comments.map((comment) => {
                      return (
                        <TrackerTaskComment
                          key={comment.id}
                          taskId={taskInfo.id}
                          comment={comment}
                          commentDelete={commentDelete}
                          addSubComment={addSubComment}
                          subCommentDelete={subCommentDelete}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="workers">
                <div className="workers_box task__info">
                  <p className="workers__creator">
                    Создатель : <br />
                    {taskInfo.user?.fio}
                  </p>

                  {taskInfo.executor ? (
                    <div className="executor">
                      <p>Исполнитель: {taskInfo.executor.fio}</p>
                      <img
                        src={
                          taskInfo.executor?.avatar
                            ? urlForLocal(taskInfo.executor.avatar)
                            : avatarMok
                        }
                        alt="avatar" />
                      <img
                        src={close}
                        className="delete"
                        onClick={() => deleteTaskExecutor()}
                      />
                    </div>
                  ) : (
                    <div className="add-worker moreItems ">
                      <button
                        className="button-add-worker"
                        onClick={() => setDropListOpen(true)}
                      >
                        +
                      </button>
                      <span>Добавить исполнителя</span>
                      {dropListOpen && (
                        <div className="dropdownList">
                          <img
                            src={close}
                            className="dropdownList__close"
                            onClick={() => setDropListOpen(false)}
                          />
                          {correctProjectUsers.map((person) => {
                            return (
                              <div
                                className="dropdownList__person"
                                key={person.user_id}
                                onClick={() => taskExecutor(person)}
                              >
                                <span>{person.user.fio}</span>
                                <img
                                  src={
                                    person.user?.avatar
                                      ? urlForLocal(person.user.avatar)
                                      : avatarMok
                                  }
                                  alt='avatar'
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                  {Boolean(taskInfo.taskUsers.length) && (
                    <div className="members">
                      <p>Участники:</p>
                      <div className="members__list">
                        {taskInfo.taskUsers.map((member) => {
                          return (
                            <div className="worker" key={member.user_id}>
                              <p>{member.fio}</p>
                              <img
                                src={
                                  member?.avatar
                                    ? urlForLocal(member.avatar)
                                    : avatarMok
                                }
                                alt='avatar'
                              />
                              <img
                                src={close}
                                className="delete"
                                onClick={() => deleteMember(member)}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <div className="add-worker moreItems">
                    <button
                      className="button-add-worker"
                      onClick={() => setDropListMembersOpen(true)}
                    >
                      +
                    </button>
                    <span>Добавить участников</span>
                    {dropListMembersOpen && (
                      <div className="dropdownList">
                        <img
                          src={close}
                          className="dropdownList__close"
                          onClick={() => setDropListMembersOpen(false)}
                        />
                        {users.length ? (
                          users.map((person) => {
                            return (
                              <div
                                className="dropdownList__person"
                                key={person.user_id}
                                onClick={() => addMember(person)}
                              >
                                <span>{person.user.fio}</span>
                                <img
                                  src={
                                    person.user?.avatar
                                      ? urlForLocal(person.user.avatar)
                                      : avatarMok
                                  }
                                  alt='avatar'
                                />
                              </div>
                            );
                          })
                        ) : (
                          <p className="noUsers">Нет пользователей</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="workers_box-middle">
                  <div className="time">
                    <img src={watch}></img>
                    <span>Длительность : </span>
                    <p>
                      {correctTimerTime(currentTimerCount.hours)}:
                      {correctTimerTime(currentTimerCount.minute)}:
                      {correctTimerTime(currentTimerCount.seconds)}
                    </p>
                  </div>

                  {timerStart ? (
                    <button
                      className={
                        taskInfo.executor_id ===
                        Number(localStorage.getItem("id"))
                          ? "stop"
                          : "stop disable"
                      }
                      onClick={() => stopTaskTimer()}
                    >
                      Остановить
                    </button>
                  ) : (
                    <button
                      className={
                        taskInfo.executor_id ===
                        Number(localStorage.getItem("id"))
                          ? "start"
                          : "start disable"
                      }
                      onClick={() => startTaskTimer()}
                    >
                      Начать делать
                      <img src={arrowStart}></img>
                    </button>
                  )}
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
                    <img src={edit} alt="edit"></img>
                    <p>{editOpen ? "сохранить" : "редактировать"}</p>
                  </div>
                  <div>
                    <img src={link} alt="link"></img>
                    <p onClick={copyTicketLink}>ссылка на задачу</p>
                  </div>
                  <div>
                    <img src={archive2} alt="arch"></img>
                    <p>в архив</p>
                  </div>
                  <div onClick={deleteTask}>
                    <img src={del} alt="delete"></img>
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
