import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getProfileInfo } from "@redux/outstaffingSlice";
import { setProjectBoardFetch } from "@redux/projectsTrackerSlice";

import { getCorrectRequestDate, urlForLocal } from "@utils/helper";

import { apiRequest } from "@api/request";

import TrackerModal from "@components/Modal/Tracker/TrackerModal/TrackerModal";
import TrackerTaskComment from "@components/TrackerTaskComment/TrackerTaskComment";

import archive from "assets/icons/archive.svg";
import arrow from "assets/icons/arrows/arrowStart.png";
import fullScreen from "assets/icons/arrows/inFullScreen.svg";
import category from "assets/icons/category.svg";
import close from "assets/icons/closeProjectPersons.svg";
import del from "assets/icons/delete.svg";
import edit from "assets/icons/edit.svg";
import file from "assets/icons/fileModal.svg";
import link from "assets/icons/link.svg";
import send from "assets/icons/send.svg";
import watch from "assets/icons/watch.svg";

import "./modalTicket.scss";

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
  const [dropListOpen, setDropListOpen] = useState(false);
  const [dropListMembersOpen, setDropListMembersOpen] = useState(false);
  const [executor, setExecutor] = useState(task.executor);
  const [members, setMembers] = useState(task.taskUsers);
  const [users, setUsers] = useState([]);
  const [timerStart, setTimerStart] = useState(false);
  const [timerInfo, setTimerInfo] = useState({});
  const [currentTimerCount, setCurrentTimerCount] = useState({
    hours: 0,
    minute: 0,
    seconds: 0,
  });
  const [timerId, setTimerId] = useState(null);
  const [correctProjectUsers, setCorrectProjectUsers] = useState(projectUsers);
  const [executorId, setExecutorId] = useState(task.executor_id);
  const profileInfo = useSelector(getProfileInfo);

  function deleteTask() {
    apiRequest("/task/update-task", {
      method: "PUT",
      data: {
        task_id: task.id,
        status: 0,
      },
    }).then(() => {
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
      newComment.subComments = [];
      setInputsValue((prevValue) => ({ ...prevValue, comment: "" }));
      setComments((prevValue) => [...prevValue, newComment]);
    });
  }

  function commentDelete(comment) {
    setComments((prevValue) =>
      prevValue.filter((item) => item.id !== comment.id)
    );
    if (comment.subComments.length) {
      // promiseAll
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

  function startTaskTimer() {
    apiRequest("/timer/create", {
      method: "POST",
      data: {
        entity_type: 2,
        entity_id: task.id,
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

  function taskExecutor(person) {
    apiRequest("/task/update-task", {
      method: "PUT",
      data: {
        task_id: task.id,
        executor_id: person.user_id,
      },
    }).then((res) => {
      setExecutorId(person.user_id);
      setDropListOpen(false);
      setExecutor(res.executor);
      dispatch(setProjectBoardFetch(projectId));
    });
  }

  function deleteTaskExecutor() {
    apiRequest("/task/update-task", {
      method: "PUT",
      data: {
        task_id: task.id,
        executor_id: 0,
      },
    }).then(() => {
      setExecutorId(null);
      setExecutor(null);
      dispatch(setProjectBoardFetch(projectId));
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
      dispatch(setProjectBoardFetch(projectId));
    });
  }

  function deleteMember(person) {
    apiRequest("/task/del-user", {
      method: "DELETE",
      data: {
        task_id: task.id,
        user_id: person.user_id,
      },
    }).then(() => {
      setMembers(members.filter((item) => item.user_id !== person.user_id));
      dispatch(setProjectBoardFetch(projectId));
    });
  }

  useEffect(() => {
    apiRequest(
      `/comment/get-by-entity?entity_type=2&entity_id=${task.id}`
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
    apiRequest(`/timer/get-by-entity?entity_type=2&entity_id=${task.id}`).then(
      (res) => {
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
      }
    );

    if (
      localStorage.getItem("role_status") !== "18" &&
      Boolean(
        !correctProjectUsers.find(
          (item) => item.user_id === profileInfo.id_user
        )
      )
    ) {
      setCorrectProjectUsers((prevState) => [
        ...prevState,
        {
          user: {
            avatar: profileInfo.photo,
            fio: profileInfo.fio,
          },
          user_id: profileInfo.id_user,
        },
      ]);
    }
  }, []);

  function startTimer() {
    setTimerId(
      setInterval(() => {
        run();
      }, 1000)
    );
  }

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

  useEffect(() => {
    let ids = members.map((user) => user.user_id);
    setUsers(
      projectUsers.reduce((acc, cur) => {
        if (!ids.includes(cur.user_id)) acc.push(cur);
        return acc;
      }, [])
    );
  }, [members]);

  function copyTicketLink() {
    navigator.clipboard.writeText(
      `https://itguild.info/tracker/task/${task.id}`
    );
  }

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
                  dangerouslySetInnerHTML={{ __html: inputsValue.description }}
                />
              )}
              {/*<img src={taskImg} className="image-task"></img>*/}
            </div>
            <div className="content__communication">
              {/*<p className="tasks">*/}
              {/*  <button*/}
              {/*    onClick={() => {*/}
              {/*      dispatch(modalToggle("addSubtask"));*/}
              {/*      setAddSubtask(true);*/}
              {/*    }}*/}
              {/*  >*/}
              {/*    <img src={plus}></img>*/}
              {/*    Добавить под задачу*/}
              {/*  </button>*/}
              {/*</p>*/}
              <p className="file">
                <button className="button-add-file">
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
                  <TrackerTaskComment
                    key={comment.id}
                    taskId={task.id}
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
              <p>
                {correctTimerTime(currentTimerCount.hours)}:
                {correctTimerTime(currentTimerCount.minute)}:
                {correctTimerTime(currentTimerCount.seconds)}
              </p>
            </div>

            {timerStart ? (
              <button
                className={
                  executorId === Number(localStorage.getItem("id"))
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
                  executorId === Number(localStorage.getItem("id"))
                    ? "start"
                    : "start disable"
                }
                onClick={() => startTaskTimer()}
              >
                Начать делать
                <img src={arrow}></img>
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
              <img src={edit}></img>
              <p>{editOpen ? "сохранить" : "редактировать"}</p>
            </div>
            <div>
              <img src={link}></img>
              <p onClick={copyTicketLink}>ссылка на задачу</p>
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
