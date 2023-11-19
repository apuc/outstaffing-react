import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ru from "date-fns/locale/ru";
import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";

import { getProfileInfo } from "@redux/outstaffingSlice";
import {
  addPersonToProject,
  editColumnName,
  editProjectName,
  getColumnId,
  getColumnName,
  getColumnPriority,
  getProjectBoard,
  getValueModalType,
  setColumnName,
  setColumnPriority,
  setProject,
  setProjectBoardFetch,
} from "@redux/projectsTrackerSlice";

import { getCorrectRequestDate, urlForLocal } from "@utils/helper";

import { apiRequest } from "@api/request";

import { useNotification } from "@hooks/useNotification";

import { getCorrectDate } from "@components/Calendar/calendarHelper";
import BaseButton from "@components/Common/BaseButton/BaseButton";
import ModalLayout from "@components/Common/ModalLayout/ModalLayout";

import arrowCreateTask from "assets/icons/arrows/arrowCreateTask.svg";
import arrowRight from "assets/icons/arrows/arrowRightCreateTask.svg";
import arrowDown from "assets/icons/arrows/selectArrow.png";
import close from "assets/icons/close.png";
import calendarImg from "assets/icons/createTaskCalendar.svg";
import crossWhite from "assets/icons/crossWhite.svg";
import avatarMok from "assets/images/avatarMok.png";

import "./trackerModal.scss";

registerLocale("ru", ru);

export const TrackerModal = ({
  active,
  setActive,
  selectedTab,
  defautlInput,
  titleProject,
  projectId,
  priorityTask,
  projectUsers,
  projectMarks,
}) => {
  const dispatch = useDispatch();
  const projectBoard = useSelector(getProjectBoard);
  const columnName = useSelector(getColumnName);
  const columnId = useSelector(getColumnId);
  const columnPriority = useSelector(getColumnPriority);
  const profileInfo = useSelector(getProfileInfo);

  const modalType = useSelector(getValueModalType);
  const [projectName, setProjectName] = useState(defautlInput);
  const [valueColumn, setValueColumn] = useState("");
  const [nameProject, setNameProject] = useState("");
  const [valueTiket, setValueTiket] = useState("");
  const [descriptionTicket, setDescriptionTicket] = useState("");
  const [workers, setWorkers] = useState([]);
  const [selectWorkersOpen, setSelectWorkersOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectColumnPriority, setSelectColumnPriority] = useState(
    "Выберите приоритет колонки"
  );
  const [selectedExecutorTask, setSelectedExecutorTask] = useState(
    "Выберите исполнителя задачи"
  );
  const [selectExecutorTaskOpen, setSelectExecutorTaskOpen] = useState(false);
  const [correctProjectUsers, setCorrectProjectUsers] = useState([]);
  const [correctProjectTags, setCorrectProjectTags] = useState([]);
  const [taskTags, setTaskTags] = useState([]);
  const [selectTagsOpen, setSelectTagsOpen] = useState(false);
  const [selectColumnPriorityOpen, setSelectColumnPriorityOpen] =
    useState(false);
  const { showNotification } = useNotification();
  const [deadLineDate, setDeadLineDate] = useState("");
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  function createTab() {
    if (!valueColumn) {
      showNotification({ show: true, text: "Введите название", type: "error" });
      return;
    }

    apiRequest("/project-column/create-column", {
      method: "POST",
      data: {
        project_id: projectBoard.id,
        priority: projectBoard.columns.length
          ? projectBoard.columns.at(-1).priority + 1
          : 1,
        title: valueColumn,
      },
    }).then(() => {
      dispatch(setProjectBoardFetch(projectBoard.id));
    });
    setValueColumn("");
    setActive(false);
  }

  function createTiket() {
    if (!valueTiket || !descriptionTicket) {
      showNotification({
        show: true,
        text: "Введите название и описание",
        type: "error",
      });
      return;
    }

    apiRequest("/task/create-task", {
      method: "POST",
      data: {
        project_id: projectBoard.id,
        title: valueTiket,
        description: descriptionTicket,
        status: 1,
        user_id: localStorage.getItem("id"),
        column_id: selectedTab,
        priority: priorityTask,
        dead_line: deadLineDate ? getCorrectRequestDate(deadLineDate) : "",
      },
    }).then((res) => {
      if (res.status === 500) {
        showNotification({
          show: true,
          text: "Задача с таким именем уже существует",
          type: "error",
        });
      } else {
        for (let i = 0; i < taskTags.length; i++) {
          apiRequest("/mark/attach", {
            method: "POST",
            data: {
              mark_id: taskTags[i].id,
              entity_type: 2,
              entity_id: res.id,
            },
          }).then(() => {
            setTaskTags([]);
          });
        }
        if (selectedExecutorTask.user_id) {
          apiRequest("/task/update-task", {
            method: "PUT",
            data: {
              task_id: res.id,
              executor_id: selectedExecutorTask.user_id,
            },
          }).then(() => {
            dispatch(setProjectBoardFetch(projectBoard.id));
            setActive(false);
            setValueTiket("");
            setDescriptionTicket("");
            setSelectedExecutorTask("Выберите исполнителя задачи");
          });
        } else {
          setActive(false);
          setValueTiket("");
          setDescriptionTicket("");
          dispatch(setProjectBoardFetch(projectBoard.id));
        }
        setDeadLineDate("");
        showNotification({
          show: true,
          text: "Задача создана",
          type: "success",
        });
      }
    });
  }

  function editProject() {
    apiRequest("/project/update", {
      method: "PUT",
      data: {
        project_id: projectId,
        name: projectName,
      },
    }).then(() => {
      setActive(false);
      dispatch(editProjectName({ id: projectId, name: projectName }));
    });
  }

  function changeColumnParams() {
    projectBoard.columns.forEach((column) => {
      if (column.id === columnId && column.priority !== columnPriority) {
        const priorityColumns = [
          {
            column_id: column.id,
            priority: Number(columnPriority),
          },
        ];
        for (let i = column.priority; i < columnPriority; i++) {
          const currentColumn = {
            column_id: projectBoard.columns[i].id,
            priority: i,
          };
          priorityColumns.push(currentColumn);
        }
        for (let i = column.priority; i > columnPriority; i--) {
          const currentColumn = {
            column_id: projectBoard.columns[i - 2].id,
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
      }
    });
    changeColumnTitle();
  }

  function changeColumnTitle() {
    apiRequest("/project-column/update-column", {
      method: "PUT",
      data: {
        column_id: columnId,
        title: columnName,
      },
    }).then(() => {
      setActive(false);
      dispatch(editColumnName({ id: columnId, title: columnName }));
    });
  }

  function createProject() {
    if (nameProject === "") {
      return;
    } else {
      apiRequest("/project/create", {
        method: "POST",
        data: {
          user_id: localStorage.getItem("id"),
          name: nameProject,
          status: 19,
        },
      }).then((res) => {
        if (!Array.isArray(res.name)) {
          const result = { ...res, columns: [] };
          dispatch(setProject(result));
          setActive(false);
          setNameProject("");
        } else {
          showNotification({
            show: true,
            text: "Проект с таким именем уже существует",
            type: "error",
          });
        }
      });
    }
  }

  function addUserToProject() {
    apiRequest("/project/add-user", {
      method: "POST",
      data: {
        user_id: selectedWorker.user_id,
        project_id: projectBoard.id,
      },
    }).then((el) => {
      dispatch(addPersonToProject(el));
      setActive(false);
      setSelectedWorker("");
      setSelectWorkersOpen(false);
    });
  }

  useEffect(() => {
    modalType === "addWorker"
      ? apiRequest("/project/my-employee").then((el) => {
          let persons = el.managerEmployees;
          let ids = projectBoard.projectUsers.map((user) => user.user_id);
          setWorkers(
            persons.reduce((acc, cur) => {
              if (!ids.includes(cur.user_id)) acc.push(cur);
              return acc;
            }, [])
          );
        })
      : "";
    if (
      localStorage.getItem("role_status") !== "18" &&
      projectUsers &&
      Boolean(
        !projectUsers.find((item) => item.user_id === profileInfo.id_user)
      )
    ) {
      setCorrectProjectUsers([
        ...projectUsers,
        {
          user: {
            avatar: profileInfo.photo,
            fio: profileInfo.fio,
          },
          user_id: profileInfo.id_user,
        },
      ]);
    } else {
      setCorrectProjectUsers(projectUsers);
    }
    initListeners();
  }, [active]);

  useEffect(() => {
    let tagIds = taskTags.map((tag) => tag.id);
    if (projectMarks) {
      setCorrectProjectTags(
        projectMarks.reduce((acc, cur) => {
          if (!tagIds.includes(cur.id)) acc.push(cur);
          return acc;
        }, [])
      );
    }
  }, [taskTags, projectMarks]);

  const initListeners = () => {
    document.addEventListener("click", closeByClickingOut);
  };

  const closeByClickingOut = (event) => {
    const path = event.path || (event.composedPath && event.composedPath());

    if (
      event &&
      !path.find(
        (div) =>
          div.classList &&
          (div.classList.contains("tags__selected__name") ||
            div.classList.contains("tags__dropDown"))
      )
    ) {
      setSelectTagsOpen(false);
    }

    if (
      event &&
      !path.find(
        (div) =>
          div.classList &&
          (div.classList.contains("select__executor") ||
            div.classList.contains("select__executor__dropDown"))
      )
    ) {
      setSelectExecutorTaskOpen(false);
    }
  };

  return (
    <ModalLayout
      active={active}
      setActive={setActive}
      type={modalType}
      // onClick={() => {
      //   setSelectWorkersOpen(false);
      // }}
    >
      {modalType === "addWorker" && (
        <>
          <div className="select__person">
            <div className="title-project selectPerson">
              <h4>Добавьте участника</h4>
              {/*<div className="input-container">*/}
              {/*  <input*/}
              {/*    className="name-project"*/}
              {/*    value={emailWorker}*/}
              {/*    onChange={(e) => setEmailWorker(e.target.value)}*/}
              {/*  />*/}
              {/*</div>*/}
              <p className="selectPerson__info">
                Выберите пользователя в проекте или добавьте по e- mail
              </p>
              <div className="invite__blocks">
                <div className="addPersonBlock">
                  <div
                    className={
                      selectWorkersOpen
                        ? "select__worker open"
                        : "select__worker"
                    }
                    onClick={() => setSelectWorkersOpen(!selectWorkersOpen)}
                  >
                    <p>
                      {selectedWorker
                        ? selectedWorker.employee.fio
                        : "Выберите пользователя"}
                    </p>
                    <img className="arrow" src={arrowDown} alt="arrow" />
                    {Boolean(selectWorkersOpen) && (
                      <div className="select__worker__dropDown">
                        {Boolean(workers.length) ? (
                          workers.map((worker) => {
                            if (worker === selectedWorker) {
                              return;
                            }
                            return (
                              <div
                                className="worker"
                                key={worker.id}
                                onClick={() => {
                                  setSelectedWorker(worker);
                                }}
                              >
                                <p>{worker.employee.fio}</p>
                                <img
                                  src={urlForLocal(worker.employee.avatar)}
                                  alt="avatar"
                                />
                              </div>
                            );
                          })
                        ) : (
                          <div>Нет пользователей</div>
                        )}
                      </div>
                    )}
                  </div>
                  <BaseButton
                    styles={"button-add addPersonBtn"}
                    onClick={addUserToProject}
                  >
                    Добавить
                  </BaseButton>
                </div>
                <span>или</span>
                <div className="invitePersonBlock">
                  <div className="input-container invitePersonBlock__input">
                    <input
                      className="name-project"
                      placeholder="email"
                      type="email"
                    />
                  </div>
                  <BaseButton styles={"button-add invitePersonBlock__btn"}>
                    Отправить приглашение
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {modalType === "createTiketProject" && (
        <>
          <div className="title-project">
            <div className="createTaskHead">
              <div className="createTaskBody__right__owner">
                <p>Создатель : {profileInfo?.fio}</p>
                <img
                  src={
                    profileInfo.photo
                      ? urlForLocal(profileInfo.photo)
                      : avatarMok
                  }
                  alt="avatar"
                />
              </div>
              {/*<span>Этап</span>*/}
              {/*<div className="createTaskHead__selectColumn">*/}
              {/*  <span>Backlog</span>*/}
              {/*  <img src={arrowCreateTask} alt="arrow" />*/}
              {/*</div>*/}
            </div>
            <div className="createTaskBody">
              <div className="createTaskBody__left">
                <h4>Введите название и описание задачи</h4>
                <div className="input-container">
                  <input
                    maxLength="100"
                    className="name-project"
                    value={valueTiket}
                    onChange={(e) => setValueTiket(e.target.value)}
                    placeholder="Название задачи"
                  />
                </div>
                <CKEditor
                  editor={ClassicEditor}
                  data={descriptionTicket}
                  config={{
                    toolbar: [
                      "heading",
                      "|",
                      "bold",
                      "italic",
                      "link",
                      "bulletedList",
                      "numberedList",
                    ],
                    removePlugins: ["BlockQuote"],
                    placeholder: "Описание задачи",
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescriptionTicket(data);
                  }}
                />
              </div>
              <div className="createTaskBody__right">
                <div className="createTaskBody__right__tags">
                  <div className="tags__selected">
                    <div className="tags__selected__items">
                      {taskTags.map((tag) => {
                        return (
                          <div
                            className="selectedTag"
                            key={tag.id}
                            style={{ background: tag.color }}
                          >
                            <p>{tag.slug}</p>
                            <img
                              src={crossWhite}
                              className="delete"
                              alt="delete"
                              onClick={() =>
                                setTaskTags((prevState) =>
                                  prevState.filter(
                                    (prevTag) => prevTag.id !== tag.id
                                  )
                                )
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div
                      className="tags__selected__name"
                      onClick={() => setSelectTagsOpen(!selectTagsOpen)}
                    >
                      Выберете тег
                      <img
                        className={
                          selectTagsOpen ? "arrow arrow--open" : "arrow"
                        }
                        src={arrowDown}
                        alt="arrow"
                      />
                    </div>
                  </div>
                  {selectTagsOpen && (
                    <div className="tags__dropDown">
                      <img
                        src={close}
                        className="close"
                        onClick={() => setSelectTagsOpen(false)}
                      />
                      {correctProjectTags.map((tag) => {
                        return (
                          <div
                            className="tag__item"
                            key={tag.id}
                            onClick={() =>
                              setTaskTags((prevState) => [...prevState, tag])
                            }
                          >
                            <p>{tag.slug}</p>
                            <span style={{ background: tag.color }} />
                          </div>
                        );
                      })}
                      {Boolean(!correctProjectTags.length) && (
                        <p className="noTags">Нет тегов</p>
                      )}
                    </div>
                  )}
                </div>
                <div
                  onClick={() =>
                    setSelectExecutorTaskOpen(!selectExecutorTaskOpen)
                  }
                  className={
                    selectExecutorTaskOpen
                      ? "select__executor select__executor--open"
                      : "select__executor"
                  }
                >
                  <div className="selected__executor">
                    {selectedExecutorTask.user_id ? (
                      <>
                        <span>{selectedExecutorTask.user.fio}</span>
                        <img
                          className="avatar"
                          src={urlForLocal(selectedExecutorTask.user.avatar)}
                          alt="avatar"
                        />
                      </>
                    ) : (
                      <span>{selectedExecutorTask}</span>
                    )}
                  </div>
                  <img className="arrow" src={arrowDown} alt="arrow" />
                  {selectExecutorTaskOpen && (
                    <div className="select__executor__dropDown">
                      {correctProjectUsers.length ? (
                        correctProjectUsers.map((person) => {
                          return (
                            <div
                              onClick={() => setSelectedExecutorTask(person)}
                              className="executor"
                              key={person.user_id}
                            >
                              <span>{person.user.fio}</span>
                              <img
                                className="avatar"
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
                        <span>Нет пользователей</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="createTaskBody__right__deadLine">
                  <img src={calendarImg} alt="calendar" />
                  <span>Срок исполнения</span>
                  <img src={arrowRight} className="arrow" alt="arrow" />
                  <p onClick={() => setDatePickerOpen(!datePickerOpen)}>
                    {deadLineDate
                      ? getCorrectDate(deadLineDate)
                      : "Дата не выбрана"}
                  </p>
                  <DatePicker
                    className="datePicker"
                    open={datePickerOpen}
                    locale="ru"
                    selected={startDate}
                    onChange={(date) => {
                      setDatePickerOpen(false);
                      setStartDate(date);
                      setDeadLineDate(date);
                    }}
                  />
                </div>
                <BaseButton styles={"button-add"} onClick={createTiket}>
                  Создать
                </BaseButton>
              </div>
            </div>
          </div>
        </>
      )}
      {modalType === "editProject" && (
        <div>
          <div className="title-project">
            <h4>Введите новое название</h4>
            <div className="input-container">
              <input
                className="name-project"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
          </div>

          <BaseButton styles={"button-add"} onClick={editProject}>
            Сохранить
          </BaseButton>
        </div>
      )}
      {modalType === "createProject" && (
        <div>
          <div className="title-project">
            <h4>{titleProject}</h4>
            <div className="input-container">
              <input
                maxLength="30"
                className="name-project"
                value={nameProject}
                onChange={(e) => setNameProject(e.target.value)}
              />
            </div>
            <BaseButton styles={"button-add"} onClick={createProject}>
              Создать
            </BaseButton>
          </div>
        </div>
      )}
      {modalType === "addSubtask" && (
        <div>
          <div className="title-project subtask">
            <h4>
              Вы добавляете подзадачу{" "}
              <p>в колонку(id) задачи "{defautlInput}"</p>
            </h4>
            <p className="title-project__decs">Введите текст</p>
            <div>
              <textarea className="title-project__textarea"></textarea>
            </div>
          </div>
          <BaseButton styles={"button-add"} onClick={(e) => e.preventDefault()}>
            Добавить
          </BaseButton>
        </div>
      )}
      {modalType === "createColumn" && (
        <div>
          <div className="title-project">
            <h4>Введите название колонки</h4>
            <div className="input-container">
              <input
                maxLength="100"
                className="name-project"
                value={valueColumn}
                onChange={(e) => setValueColumn(e.target.value)}
              />
            </div>
          </div>
          <BaseButton styles={"button-add"} onClick={createTab}>
            Создать
          </BaseButton>
        </div>
      )}
      {modalType === "editColumn" && (
        <div>
          <div className="title-project">
            <h4>Введите новое название</h4>
            <div className="input-container">
              <input
                className="name-project"
                value={columnName}
                onChange={(e) => dispatch(setColumnName(e.target.value))}
              />
            </div>
            <h4>Приоритет колонки</h4>
            <div
              className={
                selectColumnPriorityOpen
                  ? "select-priority select-priority--open"
                  : "select-priority"
              }
              onClick={() =>
                setSelectColumnPriorityOpen(!selectColumnPriorityOpen)
              }
            >
              <span>{selectColumnPriority}</span>
              <img src={arrowDown} alt="arrow" />
              {selectColumnPriorityOpen && (
                <div className="select-priority__dropDown">
                  {projectBoard.columns.map((column, index) => {
                    return (
                      <span
                        key={column.id}
                        onClick={() => {
                          setSelectColumnPriority(index + 1);
                          dispatch(setColumnPriority(index + 1));
                        }}
                      >
                        {index + 1}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
            {/*<div className="input-container">*/}
            {/*  <input*/}
            {/*    className="name-project"*/}
            {/*    placeholder="Приоритет колонки"*/}
            {/*    type="number"*/}
            {/*    step="1"*/}
            {/*    value={columnPriority}*/}
            {/*    onChange={(e) => dispatch(setColumnPriority(e.target.value))}*/}
            {/*  />*/}
            {/*</div>*/}
          </div>
          <BaseButton styles={"button-add"} onClick={changeColumnParams}>
            Сохранить
          </BaseButton>
        </div>
      )}

      <span className="exit" onClick={() => setActive(false)}></span>
    </ModalLayout>
  );
};

export default TrackerModal;
