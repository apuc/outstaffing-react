import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import TrackerModal from "../TrackerModal/TrackerModal";
import { apiRequest } from "../../../api/request";
import { useDispatch } from "react-redux";
import { urlForLocal } from "../../../helper";
import {
  modalToggle,
  setProjectBoardFetch,
} from "../../../redux/projectsTrackerSlice";
import { getCorrectDate } from "../../../components/Calendar/calendarHelper";

import category from "../../../images/category.svg";
import watch from "../../../images/watch.svg";
import file from "../../../images/fileModal.svg";
import arrow from "../../../images/arrowStart.png";
import link from "../../../images/link.svg";
import archive from "../../../images/archive.svg";
import del from "../../../images/delete.svg";
import edit from "../../../images/edit.svg";
import send from "../../../images/send.svg";
import plus from "../../../images/plus.svg";
import fullScreen from "../../../images/inFullScreen.svg";
import close from "../../../images/closeProjectPersons.svg";

import "./ModalTicket.scss";

export const ModalTiсket = ({
  active,
  setActive,
  task,
  projectId,
  projectName,
  projectUsers,
}) => {
  const dispatch = useDispatch();
  const [addSubtask, setAddSubtask] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [inputsValue, setInputsValue] = useState({
    title: task.title,
    description: task.description,
    comment: "",
  });
  const [comments, setComments] = useState([]);
  const [commentsEditOpen, setCommentsEditOpen] = useState({});
  const [commentsEditText, setCommentsEditText] = useState({});
  const [dropListOpen, setDropListOpen] = useState(false);
  const [dropListMembersOpen, setDropListMembersOpen] = useState(false);
  const [executor, setExecutor] = useState(task.executor);
  const [members, setMembers] = useState(task.taskUsers);
  const [users, setUsers] = useState([]);

  function deleteTask() {
    apiRequest("/task/update-task", {
      method: "PUT",
      data: {
        task_id: task.id,
        status: 0,
      },
    }).then((res) => {
      setActive(false);
      dispatch(setProjectBoardFetch(projectId));
    });
  }

  function editTask() {
    apiRequest("/task/update-task", {
      method: "PUT",
      data: {
        task_id: task.id,
        title: inputsValue.title,
        description: inputsValue.description,
      },
    }).then((res) => {
      dispatch(setProjectBoardFetch(projectId));
    });
  }

  function createComment() {
    apiRequest("/comment/create", {
      method: "POST",
      data: {
        text: inputsValue.comment,
        entity_type: 2,
        entity_id: task.id,
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

  function taskExecutor(person) {
    apiRequest("/task/update-task", {
      method: "PUT",
      data: {
        task_id: task.id,
        executor_id: person.user_id,
      },
    }).then((res) => {
      setDropListOpen(false);
      setExecutor(res.executor);
    });
  }

  function deleteTaskExecutor() {
    apiRequest("/task/update-task", {
      method: "PUT",
      data: {
        task_id: task.id,
        executor_id: 0,
      },
    }).then((res) => {
      setExecutor(null);
    });
  }

  function addMember(person) {
    apiRequest("/task/add-user-to-task", {
      method: "POST",
      data: {
        task_id: task.id,
        user_id: person.user_id,
      },
    }).then((res) => {
      setDropListMembersOpen(false);
      setMembers((prevValue) => [...prevValue, res]);
    });
  }

  function deleteMember(person) {
    apiRequest("/task/del-user", {
      method: "DELETE",
      data: {
        task_id: task.id,
        user_id: person.user_id,
      },
    }).then((res) => {
      setMembers(members.filter((item) => item.user_id !== person.user_id));
    });
  }

  useEffect(() => {
    apiRequest(
      `/comment/get-by-entity?entity_type=2&entity_id=${task.id}`
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
  }, []);

  useEffect(() => {
    let ids = members.map((user) => user.user_id);
    setUsers(
      projectUsers.reduce((acc, cur) => {
        if (!ids.includes(cur.user_id)) acc.push(cur);
        return acc;
      }, [])
    );
  }, [members]);

  return (
    <div
      className={active ? "modal-tiket active" : "modal-tiket"}
      onClick={() => setActive(false)}
    >
      <div
        className="modal-tiket__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="content">
          <h3 className="title-project">
            <img src={category} className="title-project__category"></img>
            Проект: {projectName}
            <Link
              to={`/tracker/task/${task.id}`}
              className="title-project__full"
            >
              <img src={fullScreen}></img>
            </Link>
          </h3>

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
              {/*<img src={taskImg} className="image-task"></img>*/}
            </div>
            <div className="content__communication">
              <p className="tasks">
                <button
                  onClick={() => {
                    dispatch(modalToggle("addSubtask"));
                    setAddSubtask(true);
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
          <div className="workers_box task__info">
            <span className="exit" onClick={() => setActive(false)}></span>
            <span className="nameProject">{task.title}</span>
            <p className="workers__creator">Создатель : {task.user?.fio}</p>

            {executor ? (
              <div className="executor">
                <p>Исполнитель: {executor.fio}</p>
                <img src={urlForLocal(executor.avatar)} alt="avatar" />
                <img
                  src={close}
                  className="delete"
                  onClick={() => deleteTaskExecutor()}
                />
              </div>
            ) : (
              <div className="add-worker moreItems ">
                <button onClick={() => setDropListOpen(true)}>+</button>
                <span>Добавить исполнителя</span>
                {dropListOpen && (
                  <div className="dropdownList">
                    <img
                      src={close}
                      className="dropdownList__close"
                      onClick={() => setDropListOpen(false)}
                    />
                    {projectUsers.map((person) => {
                      return (
                        <div
                          className="dropdownList__person"
                          key={person.user_id}
                          onClick={() => taskExecutor(person)}
                        >
                          <span>{person.user.fio}</span>
                          <img src={urlForLocal(person.user.avatar)} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {Boolean(members.length) && (
              <div className="members">
                <p>Участники:</p>
                <div className="members__list">
                  {members.map((member) => {
                    return (
                      <div className="worker" key={member.user_id}>
                        <p>{member.fio}</p>
                        <img src={urlForLocal(member.avatar)} />
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
              <button onClick={() => setDropListMembersOpen(true)}>+</button>
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
                          <img src={urlForLocal(person.user.avatar)} />
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
              <p>{"0:00:00"}</p>
            </div>

            <button className="start">
              Начать делать <img src={arrow}></img>
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
            <div onClick={deleteTask}>
              <img src={archive}></img>
              <p>в архив</p>
            </div>
            <div onClick={deleteTask}>
              <img src={del}></img>
              <p>удалить</p>
            </div>
          </div>
        </div>
      </div>

      <TrackerModal
        active={addSubtask}
        setActive={setAddSubtask}
        defautlInput={task.column_id}
      ></TrackerModal>
    </div>
  );
};

export default ModalTiсket;
