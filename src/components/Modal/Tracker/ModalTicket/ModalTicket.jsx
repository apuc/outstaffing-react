import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ru from "date-fns/locale/ru";
import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getProfileInfo } from "@redux/outstaffingSlice";
import { setProjectBoardFetch } from "@redux/projectsTrackerSlice";

import {
  backendImg,
  caseOfNum,
  getCorrectRequestDate,
  getToken,
  urlForLocal,
} from "@utils/helper";

import { apiRequest } from "@api/request";

import { useNotification } from "@hooks/useNotification";

import FileTracker from "@components/FileTracker/FileTracker";
import AcceptModal from "@components/Modal/AcceptModal/AcceptModal";
import TrackerModal from "@components/Modal/Tracker/TrackerModal/TrackerModal";
import TrackerTaskComment from "@components/TrackerTaskComment/TrackerTaskComment";

import archive from "assets/icons/archive.svg";
import arrow from "assets/icons/arrows/arrowStart.png";
import fullScreen from "assets/icons/arrows/inFullScreen.svg";
import calendarIcon from "assets/icons/calendar.svg";
import category from "assets/icons/category.svg";
import close from "assets/icons/closeProjectPersons.svg";
import del from "assets/icons/delete.svg";
import edit from "assets/icons/edit.svg";
import file from "assets/icons/fileModal.svg";
import link from "assets/icons/link.svg";
import send from "assets/icons/send.svg";
import watch from "assets/icons/watch.svg";
import avatarMok from "assets/images/avatarMok.png";

import { getCorrectDate } from "../../../Calendar/calendarHelper";
import "./modalTicket.scss";

registerLocale("ru", ru);

export const ModalTiсket = ({
  active,
  setActive,
  task,
  projectId,
  projectName,
  projectUsers,
  projectOwnerId,
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
  const [deadLine, setDeadLine] = useState(task.dead_line);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState(
    task.dead_line ? new Date(task.dead_line) : new Date()
  );
  const [dropListOpen, setDropListOpen] = useState(false);
  const [dropListMembersOpen, setDropListMembersOpen] = useState(false);
  const [executor, setExecutor] = useState(task.executor);
  const [members, setMembers] = useState(task.taskUsers);
  const [users, setUsers] = useState([]);
  const [timerStart, setTimerStart] = useState(false);
  const [timerInfo, setTimerInfo] = useState({});
  const [uploadedFile, setUploadedFile] = useState(null);
  const [currentTimerCount, setCurrentTimerCount] = useState({
    hours: 0,
    minute: 0,
    seconds: 0,
  });
  const [timerId, setTimerId] = useState(null);
  const [taskFiles, setTaskFiles] = useState([]);
  const [correctProjectUsers, setCorrectProjectUsers] = useState(projectUsers);
  const [executorId, setExecutorId] = useState(task.executor_id);
  const profileInfo = useSelector(getProfileInfo);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const { showNotification } = useNotification();

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
      showNotification({
        show: true,
        text: "Задача успешно была перемещена в архив",
        type: "archive",
      });
    });
  }

  function archiveTask() {
    setAcceptModalOpen(true);
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
      showNotification({
        show: true,
        text: "Изменения сохранены",
        type: "success",
      });
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

    apiRequest(`/file/get-by-entity?entity_type=2&entity_id=${task.id}`).then(
      (res) => {
        if (Array.isArray(res)) {
          setTaskFiles(res);
        }
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

  async function handleUpload(event) {
    const formData = new FormData();
    formData.append("uploadFile", event.target.files[0]);
    const res = await fetch("https://itguild.info/api/file/upload", {
      method: "POST",
      body: formData,
      headers: { ...getToken() },
    });

    const data = await res.json();

    setUploadedFile(data);
  }

  function deleteLoadedFile() {
    setUploadedFile(null);
  }

  function attachFile() {
    apiRequest("/file/attach", {
      method: "POST",
      data: {
        file_id: uploadedFile[0].id,
        entity_type: 2,
        entity_id: task.id,
        status: 1,
      },
    }).then((res) => {
      setTaskFiles((prevValue) => [...prevValue, res]);
      setUploadedFile(null);
    });
  }

  function deleteFile(file) {
    setTaskFiles((prevValue) =>
      prevValue.filter((item) => item.id !== file.id)
    );
  }

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
    showNotification({
      show: true,
      text: "Ссылка скопирована в буфер обмена",
      type: "copy",
    });
  }

  function selectDeadLine(date) {
    apiRequest("/task/update-task", {
      method: "PUT",
      data: {
        task_id: task.id,
        dead_line: getCorrectRequestDate(date),
      },
    }).then(() => {
      dispatch(setProjectBoardFetch(projectId));
    });
  }

  function closeAcceptModal() {
    setAcceptModalOpen(false);
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
            {editOpen ? (
              <input
                maxLength="100"
                value={inputsValue.title}
                onChange={(e) => {
                  setInputsValue((prevValue) => ({
                    ...prevValue,
                    title: e.target.value,
                  }));
                }}
              />
            ) : (
              <h5 className="taskName">{inputsValue.title}</h5>
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
                  className="taskDescription"
                  dangerouslySetInnerHTML={{ __html: inputsValue.description }}
                />
              )}
              {/*<img src={taskImg} className="image-task"></img>*/}
            </div>
            {Boolean(taskFiles.length) && (
              <div className="task__files">
                {taskFiles.map((file) => {
                  return (
                    <FileTracker
                      key={file.id}
                      file={file}
                      setDeletedTask={deleteFile}
                      taskId={task.id}
                    />
                  );
                })}
              </div>
            )}
            {uploadedFile && (
              <div className="fileLoaded">
                {uploadedFile.map((file) => {
                  return (
                    <div className="loadedFile" key={file.id}>
                      <img src={backendImg(file.url)} alt="img" key={file.id} />
                      <div
                        className="deleteFile"
                        onClick={() => deleteLoadedFile(file)}
                      >
                        <img src={close} alt="delete" />
                      </div>
                    </div>
                  );
                })}
                <button onClick={attachFile}>Загрузить</button>
              </div>
            )}
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
              <div className="file">
                <div className="input__wrapper">
                  <input
                    name="file"
                    id="input__file"
                    type="file"
                    accept="image/*,.png,.jpg,.svg,.jpeg"
                    className="input__file"
                    onChange={handleUpload}
                  />
                  <label htmlFor="input__file" className="button-add-file">
                    <img src={file}></img>
                    Загрузить файл
                  </label>
                </div>
                <span>{taskFiles.length ? taskFiles.length : 0}</span>
                {caseOfNum(taskFiles.length, "files")}
              </div>
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
            <p className="workers__creator">Создатель : {task.user?.fio}</p>

            {executor ? (
              <div className="executor">
                <p>Исполнитель: {executor.fio}</p>
                <img
                  src={
                    executor?.avatar ? urlForLocal(executor.avatar) : avatarMok
                  }
                  alt="avatar"
                />
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
                            alt="avatar"
                          />
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
                        <img
                          src={
                            member?.avatar
                              ? urlForLocal(member.avatar)
                              : avatarMok
                          }
                          alt="avatar"
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
                            alt="avatar"
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
            <div className="deadLine">
              <div
                className="deadLine__container"
                onClick={() => setDatePickerOpen(!datePickerOpen)}
              >
                <img src={calendarIcon} alt="calendar" />
                <span>
                  {deadLine ? getCorrectDate(deadLine) : "Срок исполнения:"}
                </span>
              </div>
              <DatePicker
                className="datePicker"
                open={datePickerOpen}
                locale="ru"
                selected={startDate}
                onChange={(date) => {
                  setDatePickerOpen(false);
                  setStartDate(date);
                  setDeadLine(date);
                  selectDeadLine(date);
                }}
              />
            </div>
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
            <div
              onClick={archiveTask}
              className={
                profileInfo.id_user === projectOwnerId ||
                profileInfo.id_user === task.user_id
                  ? ""
                  : "disable"
              }
            >
              <img src={archive}></img>
              <p>в архив</p>
            </div>
            <div
              onClick={deleteTask}
              className={
                profileInfo.id_user === projectOwnerId ||
                profileInfo.id_user === task.user_id
                  ? ""
                  : "disable"
              }
            >
              <img src={del}></img>
              <p>удалить</p>
            </div>
          </div>
        </div>
        {acceptModalOpen && (
          <AcceptModal
            closeModal={closeAcceptModal}
            agreeHandler={deleteTask}
          />
        )}
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
