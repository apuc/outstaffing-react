import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { apiRequest } from "../../../api/request";
import {
  getProjectBoard,
  getValueModalType,
  setProjectBoardFetch,
} from "../../../redux/projectsTrackerSlice";

import "./modalAdd.scss";

export const ModalAdd = ({ active, setActive, selectedTab, defautlInput }) => {
  const dispatch = useDispatch();
  const projectBoard = useSelector(getProjectBoard);

  const modalType = useSelector(getValueModalType);

  const [valueTiket, setValueTiket] = useState("");
  const [valueColl, setValueColl] = useState("");
  const [descriptionTicket, setDescriptionTicket] = useState("");

  function createTab() {
    if (!valueColl) {
      return;
    }

    apiRequest("/project-column/create-column", {
      method: "POST",
      data: {
        project_id: projectBoard.id,
        title: valueColl,
      },
    }).then((res) => {
      dispatch(setProjectBoardFetch(projectBoard.id));
    });
    setValueColl("");
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

  function getModal() {
    switch (modalType) {
      case "createColumn":
        return (
          <div
            className="modal-add__content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="title-project">
              <h4>Введите название колонки</h4>
              <div className="input-container">
                <input
                  className="name-project"
                  value={valueColl}
                  onChange={(e) => setValueColl(e.target.value)}
                ></input>
              </div>
            </div>
            <button className="button-add" onClick={createTab}>
              Создать
            </button>
            <span className="exit" onClick={() => setActive(false)}></span>
          </div>
        );
      case "addWorker":
        return (
          <div
            className="modal-add__content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="title-project">
              <h4>Добавьте участника</h4>
              <p className="title-project__decs">Введите имя или e-mail </p>
              <div className="input-container">
                <input
                  className="name-project"
                  value={valueTiket}
                  onChange={(e) => setValueTiket(e.target.value)}
                ></input>
              </div>
            </div>
            <button className="button-add" onClick={(e) => e.preventDefault()}>
              Добавить
            </button>
            <span className="exit" onClick={() => setActive(false)}></span>
          </div>
        );
      case "createTiketProject":
        return (
          <div
            className="modal-add__content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="title-project">
              <h4>Введите название и описание задачи</h4>
              <div className="input-container">
                <input
                  className="name-project"
                  value={valueTiket}
                  onChange={(e) => setValueTiket(e.target.value)}
                  placeholder="Название задачи"
                ></input>
              </div>
              <div className="input-container">
                <input
                  className="name-project"
                  value={descriptionTicket}
                  onChange={(e) => setDescriptionTicket(e.target.value)}
                  placeholder="Описание задачи"
                ></input>
              </div>
            </div>
            <button className="button-add" onClick={createTiket}>
              Создать
            </button>
            <span className="exit" onClick={() => setActive(false)}></span>
          </div>
        );
      case "editProject":
        return (
          <div
            className="modal-add__content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="title-project">
              <h4>Введите новое название</h4>
              <div className="input-container">
                <input
                  className="name-project"
                  value={defautlInput}
                  onChange={(e) => setValueTiket(e.target.value)}
                ></input>
              </div>
            </div>
            <button className="button-add" onClick={(e) => e.preventDefault()}>
              Сохранить
            </button>
            <span className="exit" onClick={() => setActive(false)}></span>
          </div>
        );
      case "editColumn":
        return (
          <div
            className="modal-add__content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="title-project">
              <h4>Введите новое название</h4>
              <div className="input-container">
                <input
                  className="name-project"
                  value={defautlInput}
                  onChange={(e) => setValueTiket(e.target.value)}
                ></input>
              </div>
            </div>
            <button className="button-add" onClick={(e) => e.preventDefault()}>
              Сохранить
            </button>
            <span className="exit" onClick={() => setActive(false)}></span>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div
      className={active ? "modal-add active" : "modal-add"}
      onClick={() => setActive(false)}
    >
      {getModal()}
    </div>
  );
};

export default ModalAdd;
