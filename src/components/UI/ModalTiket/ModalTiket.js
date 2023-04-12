import React, { useState } from "react";

import avatarMock1 from "../../../images/avatarMoсk1.png";
import avatarMock2 from "../../../images/avatarMoсk2.png";
import category from "../../../images/category.png";
import watch from "../../../images/watch.png";
import file from "../../../images/fileModal.svg";
import task from "../../../images/tasksMock.png";
import arrow from "../../../images/arrowStart.png";
import link from "../../../images/link.svg";
import archive from "../../../images/archive.svg";
import del from "../../../images/delete.svg";
import edit from "../../../images/edit.svg";
import send from "../../../images/send.svg";
import plus from "../../../images/plus.svg";

import "./ModalTiket.scss";
import ModalAdd from "../ModalAdd/ModalAdd";

export const ModalTiket = ({ active, setActive }) => {
  const [tiket] = useState({
    name: "Разработка трекера",
    code: "PR - 2245",
    creator: "Василий Тарасов",
    descriptions:
      "На многих страницах сайта отсутствуют или некорректно заполнены метатеги Description. Это может негативно повлиять на представление сайта в результатах поиска. Необходимо исправить все страницы где есть ошибки или отсутствует Title и  Description.",
  });
  const [workers] = useState([
    {
      name: "Дмитрий Рогов",
      avatar: avatarMock2,
    },
    {
      name: "Марина Серова",
      avatar: avatarMock1,
    },
  ]);
  const [addSubtask, setAddSubtask] = useState(false);

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
            Проект: {tiket.name}
          </h3>

          <div className="content__task">
            <span>Задача</span>
            <h5>{tiket.code}</h5>
            <div className="content__description">
              <p>{tiket.descriptions}</p>
              <img src={task} className="image-task"></img>
              <p>{tiket.descriptions}</p>
            </div>
            <div className="content__communication">
              <p className="tasks">
                <button onClick={() => setAddSubtask(true)}>
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
            <span>{tiket.code}</span>
            <p className="workers__creator">Создатель : {tiket.creator}</p>
            <div>
              {workers.map((worker, index) => {
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
            <div>
              <img src={edit}></img>
              <p>редактировать</p>
            </div>
            <div>
              <img src={link}></img>
              <p>ссылка на проект</p>
            </div>
            <div>
              <img src={archive}></img>
              <p>в архив</p>
            </div>
            <div>
              <img src={del}></img>
              <p>удалить</p>
            </div>
          </div>
        </div>
      </div>
      <ModalAdd active={addSubtask} setActive={setAddSubtask}>
        <div className="title-project subtask">
          <h4>
            Вы добавляете подзадачу <p>в колонку задачи {"Готово"}</p>
          </h4>
          <p className="title-project__decs">Введите текст</p>
          <div>
            <textarea className="title-project__textarea"></textarea>
          </div>
        </div>
        <button className="button-add" onClick={(e) => e.preventDefault()}>
          Добавить
        </button>
      </ModalAdd>
    </div>
  );
};

export default ModalTiket;
