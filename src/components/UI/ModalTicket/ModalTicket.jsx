import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import TrackerModal from "../TrackerModal/TrackerModal";
import { apiRequest } from "../../../api/request";
import { useDispatch } from "react-redux";
import {
  modalToggle,
  setProjectBoardFetch,
} from "../../../redux/projectsTrackerSlice";

import category from "../../../images/category.png";
import watch from "../../../images/watch.png";
import file from "../../../images/fileModal.svg";
import taskImg from "../../../images/tasksMock.png";
import arrow from "../../../images/arrowStart.png";
import link from "../../../images/link.svg";
import archive from "../../../images/archive.svg";
import del from "../../../images/delete.svg";
import edit from "../../../images/edit.svg";
import send from "../../../images/send.svg";
import plus from "../../../images/plus.svg";
import fullScreen from "../../../images/inFullScreen.svg";

import "./ModalTicket.scss";

export const ModalTiсket = ({
  active,
  setActive,
  task,
  projectId,
  projectName,
}) => {
  const dispatch = useDispatch();
  const [addSubtask, setAddSubtask] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [inputsValue, setInputsValue] = useState({title: task.title, description: task.description})

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
        description: inputsValue.description
      },
    }).then((res) => {
      dispatch(setProjectBoardFetch(projectId));
    });
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
            {editOpen ? <input value={inputsValue.title} onChange={(e) => {
              setInputsValue((prevValue) => ({...prevValue, title: e.target.value}))
            }} /> :<h5>{inputsValue.title}</h5>}
            <div className="content__description">
              {editOpen ? <input value={inputsValue.description} onChange={(e) => {
                setInputsValue((prevValue) => ({...prevValue, description: e.target.value}))
              }}/> :<p>{inputsValue.description}</p>}
              <img src={taskImg} className="image-task"></img>
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
              <input placeholder="Оставить комментарий"></input>
              <img src={send}></img>
            </div>
          </div>
        </div>
        <div className="workers">
          <div className="workers_box">
            <span className="exit" onClick={() => setActive(false)}></span>
            <span>{task.title}</span>
            <p className="workers__creator">Создатель : {task.user?.fio}</p>
            <div>
              {Boolean(task.taskUsers?.length) &&
                task.taskUsers.map((worker, index) => {
                  return (
                    <div className="worker" key={index}>
                      <img src={worker.avatar}></img>
                      <p>{worker.name}</p>
                    </div>
                  );
                })}
            </div>

            <div className="add-worker moreItems">
              <button>+</button>
              <span>Добавить участников</span>
            </div>
          </div>

          <div className="workers_box-middle">
            <div className="time">
              <img src={watch}></img>
              <span>Длительность : </span>
              <p>{"8:30:22"}</p>
            </div>

            <button className="start">
              Начать делать <img src={arrow}></img>
            </button>
          </div>

          <div className="workers_box-bottom">
            <div className={editOpen ? 'edit' : ''} onClick={() => {
              if(editOpen) {
                setEditOpen(!editOpen)
                editTask()
              } else {
                setEditOpen(!editOpen)
              }
            }}>
              <img src={edit}></img>
              <p>{editOpen ? 'сохранить' : 'редактировать'}</p>
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
