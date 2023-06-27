import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

import {getProfileInfo} from "@redux/outstaffingSlice";

import { urlForLocal } from "@utils/helper";

import { apiRequest } from "@api/request";

import BaseButton from "@components/Common/BaseButton/BaseButton";
import ModalLayout from "@components/Common/ModalLayout/ModalLayout";

import arrowDown from "assets/icons/arrows/selectArrow.png";

import "./trackerModal.scss";

export const TrackerModal = ({
  active,
  setActive,
  selectedTab,
  defautlInput,
  titleProject,
  projectId,
  priorityTask,
  projectUsers
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
  const [selectedExecutorTask, setSelectedExecutorTask] = useState('Выберите исполнителя задачи')
  const [selectExecutorTaskOpen, setSelectExecutorTaskOpen] = useState(false)
  const [correctProjectUsers, setCorrectProjectUsers] = useState([]);
  const [selectColumnPriorityOpen, setSelectColumnPriorityOpen] =
    useState(false);

  function createTab() {
    if (!valueColumn) {
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
      },
    }).then((res) => {
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
          setSelectedExecutorTask('Выберите исполнителя задачи')
        })
      } else {
        setActive(false);
        setValueTiket("");
        setDescriptionTicket("");
        dispatch(setProjectBoardFetch(projectBoard.id));
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
        const result = { ...res, columns: [] };
        dispatch(setProject(result));
        setActive(false);
        setNameProject("");
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
        localStorage.getItem("role_status") !== "18" && projectUsers && Boolean(!projectUsers.find((item) => item.user_id === profileInfo.id_user))
    ) {
      setCorrectProjectUsers( [
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
      setCorrectProjectUsers(projectUsers)
    }
  }, [active]);

  return (
    <ModalLayout
      active={active}
      setActive={setActive}
      // onClick={() => {
      //   setSelectWorkersOpen(false);
      // }}
    >
      {modalType === "addWorker" && (
        <div>
          <div className="title-project">
            <h4>Добавьте участника</h4>
            {/*<div className="input-container">*/}
            {/*  <input*/}
            {/*    className="name-project"*/}
            {/*    value={emailWorker}*/}
            {/*    onChange={(e) => setEmailWorker(e.target.value)}*/}
            {/*  />*/}
            {/*</div>*/}
            <div
              className={
                selectWorkersOpen ? "select__worker open" : "select__worker"
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
          </div>
          <BaseButton styles={"button-add"} onClick={addUserToProject}>
            Добавить
          </BaseButton>
        </div>
      )}
      {modalType === "createTiketProject" && (
        <>
          <div className="title-project">
            <h4>Введите название и описание задачи</h4>
            <div className="input-container">
              <input
                className="name-project"
                value={valueTiket}
                onChange={(e) => setValueTiket(e.target.value)}
                placeholder="Название задачи"
              />
            </div>
            <div className="input-container">
              <input
                className="name-project"
                value={descriptionTicket}
                onChange={(e) => setDescriptionTicket(e.target.value)}
                placeholder="Описание задачи"
              />
            </div>
            <div
                onClick={() => setSelectExecutorTaskOpen(!selectExecutorTaskOpen)}
                className={selectExecutorTaskOpen ? 'select__executor select__executor--open' : 'select__executor'}>
              <div className='selected__executor'>
                {selectedExecutorTask.user_id ?
                    <>
                      <span>{selectedExecutorTask.user.fio}</span>
                      <img className='avatar' src={urlForLocal(selectedExecutorTask.user.avatar)}  alt='avatar' />
                    </>
                    : <span>{selectedExecutorTask}</span>
                }
              </div>
              <img className='arrow' src={arrowDown} alt='arrow' />
              {selectExecutorTaskOpen &&
                  <div className='select__executor__dropDown'>
                    {correctProjectUsers.length ?
                        correctProjectUsers.map((person) => {
                          return <div onClick={() => setSelectedExecutorTask(person)} className='executor' key={person.user_id}>
                            <span>{person.user.fio}</span>
                            <img className='avatar' src={urlForLocal(person.user.avatar)}  alt='avatar'/>
                          </div>
                        })
                        : <span>Нет пользователей</span>

                    }
                  </div>
              }
            </div>
          </div>
          <BaseButton styles={"button-add"} onClick={createTiket}>
            Создать
          </BaseButton>
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
              className={selectColumnPriorityOpen ? 'select-priority select-priority--open' : 'select-priority'}
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
