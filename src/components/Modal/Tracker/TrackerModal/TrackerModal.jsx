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

import { urlForLocal } from "@utils/helper";

import { apiRequest } from "@api/request";

import BaseButton from "@components/Common/BaseButton/BaseButton";

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
}) => {
  const dispatch = useDispatch();
  const projectBoard = useSelector(getProjectBoard);
  const columnName = useSelector(getColumnName);
  const columnId = useSelector(getColumnId);
  const columnPriority = useSelector(getColumnPriority);

  const modalType = useSelector(getValueModalType);
  const [projectName, setProjectName] = useState(defautlInput);
  const [valueColumn, setValueColumn] = useState("");
  const [nameProject, setNameProject] = useState("");
  const [valueTiket, setValueTiket] = useState("");
  const [descriptionTicket, setDescriptionTicket] = useState("");
  const [workers, setWorkers] = useState([]);
  const [selectWorkersOpen, setSelectWorkersOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

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
    }).then(() => {
      dispatch(setProjectBoardFetch(projectBoard.id));
    });

    setActive(false);
    setValueTiket("");
    setDescriptionTicket("");
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
  }, [active]);

  return (
    <div
      className={active ? "modal-add active" : "modal-add"}
      onClick={() => {
        setActive(false);
        setSelectWorkersOpen(false);
      }}
    >
      <div className="modal-add__content" onClick={(e) => e.stopPropagation()}>
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
          <div>
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
            </div>
            <BaseButton styles={"button-add"} onClick={createTiket}>
              Создать
            </BaseButton>
          </div>
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
            <BaseButton
              styles={"button-add"}
              onClick={(e) => e.preventDefault()}
            >
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
              <div className="input-container">
                <input
                  className="name-project"
                  placeholder="Приоритет колонки"
                  type="number"
                  step="1"
                  value={columnPriority}
                  onChange={(e) => dispatch(setColumnPriority(e.target.value))}
                />
              </div>
            </div>
            <BaseButton styles={"button-add"} onClick={changeColumnParams}>
              Сохранить
            </BaseButton>
          </div>
        )}

        <span className="exit" onClick={() => setActive(false)}></span>
      </div>
    </div>
  );
};

export default TrackerModal;
