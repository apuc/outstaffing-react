import React, { useState } from "react";
import "./ModalTiket.scss";

import creatorMock from "../../../images/avatarMoсkCreator.png";
import avatarMock1 from "../../../images/avatarMoсk1.png";
import avatarMock2 from "../../../images/avatarMoсk2.png";
import category from "../../../images/category.png";
import comments from "../../../images/commentsBoard.svg";
import watch from "../../../images/watch.png";
import files from "../../../images/filesBoard.svg";
import task from "../../../images/tasksMock.png";
import arrow from "../../../images/arrowStart.png";

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
            <div className="title-project__menu">
              <p>Редактировать</p>
              <p>Удалить</p>
            </div>
          </h3>

          <div className="content__task">
            <h5>{tiket.code}</h5>
            <div className="content__description">
              <p>{tiket.descriptions}</p>
              <img src={task} className="image-task"></img>
              <p>{tiket.descriptions}</p>
            </div>
            <div className="content__communication">
              <p className="comment">
                <img src={comments}></img>
                <span>{0}</span>
                Коментариев
              </p>
              <p className="file">
                <img src={files}></img>
                <span>{0}</span>
                Файлов
              </p>
            </div>
          </div>
        </div>
        <div className="workers">
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

          <div className="time">
            <img src={watch}></img>
            <span>Длительность : </span>
            <p>{"8:30:22"}</p>
          </div>

          <button className="start">
            Начать делать <img src={arrow}></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalTiket;
