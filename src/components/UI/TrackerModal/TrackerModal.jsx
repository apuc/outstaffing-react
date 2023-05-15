import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { apiRequest } from "../../../api/request";
import {
  setColumnName,
  getProjectBoard,
  getValueModalType,
  setProject,
  setProjectBoardFetch,
  editProjectName,
  editColumnName,
  getColumnName,
  getColumnId
} from "../../../redux/projectsTrackerSlice";

import "./trackerModal.scss";

export const TrackerModal = ({
  active,
  setActive,
  selectedTab,
  defautlInput,
  titleProject,
  projectId,
}) => {
  const dispatch = useDispatch();
  const projectBoard = useSelector(getProjectBoard);
  const columnName = useSelector(getColumnName);
  const columnId = useSelector(getColumnId)

  const modalType = useSelector(getValueModalType);

  const [emailWorker, setEmailWorker] = useState("");
  const [projectName, setProjectName] = useState(defautlInput);

  const [valueColumn, setValueColumn] = useState("");
  const [nameProject, setNameProject] = useState("");

  const [valueTiket, setValueTiket] = useState("");
  const [descriptionTicket, setDescriptionTicket] = useState("");

  function createTab() {
    if (!valueColumn) {
      return;
    }

    apiRequest("/project-column/create-column", {
      method: "POST",
      data: {
        project_id: projectBoard.id,
        title: valueColumn,
      },
    }).then((res) => {
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
      },
    }).then((res) => {
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
    }).then((res) => {
      setActive(false);
      dispatch(editProjectName({ id: projectId, name: projectName }));
    });
  }

  function changeColumnName() {
    apiRequest("/project-column/update-column", {
      method: "PUT",
      data: {
        column_id: columnId,
        title: columnName
      }
    }).then((res) => {
      setActive(false);
      dispatch(editColumnName({id: columnId, title: columnName}))
    })
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

  return (
    <div
      className={active ? "modal-add active" : "modal-add"}
      onClick={() => setActive(false)}
    >
      <div className="modal-add__content" onClick={(e) => e.stopPropagation()}>
        {modalType === "addWorker" && (
          <div>
            <div className="title-project">
              <h4>Добавьте участника</h4>
              <p className="title-project__decs">Введите имя или e-mail </p>
              <div className="input-container">
                <input
                  className="name-project"
                  value={emailWorker}
                  onChange={(e) => setEmailWorker(e.target.value)}
                />
              </div>
            </div>
            <button
              className="button-add"
              onClick={(e) => {
                e.preventDefault();
                setActive(false);
              }}
            >
              Добавить
            </button>
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
            <button className="button-add" onClick={createTiket}>
              Создать
            </button>
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
            <button className="button-add" onClick={editProject}>
              Сохранить
            </button>
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
              <button className="button-add" onClick={createProject}>
                Создать
              </button>
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
            <button className="button-add" onClick={(e) => e.preventDefault()}>
              Добавить
            </button>
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
            <button className="button-add" onClick={createTab}>
              Создать
            </button>
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
            </div>
            <button className="button-add" onClick={changeColumnName}>
              Сохранить
            </button>
          </div>
        )}

        <span className="exit" onClick={() => setActive(false)}></span>
      </div>
    </div>
  );
};

export default TrackerModal;
