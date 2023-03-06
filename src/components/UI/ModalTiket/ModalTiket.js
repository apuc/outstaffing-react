import React, { useState } from "react";
import "./ModalTiket.scss";

import creatorMock from "../../../images/avatarMoсkCreator.png";
import avatarMock1 from "../../../images/avatarMoсk1.png";
import avatarMock2 from "../../../images/avatarMoсk2.png";
import category from "../../../images/category.png";
import comments from "../../../images/comments.png";
import files from "../../../images/files.png";
import task from "../../../images/tasksMock.png";

export const ModalTiket = ({ active, setActive }) => {
  const [tiket] = useState({
    name: "Разработка трекера",
    code: "PR - 2245",
    creator: "Василий Тарасов",
  });

  return (
    <div
      className={active ? "modal-tiket active" : "modal-tiket"}
      onClick={() => setActive(false)}
    >
      <div
        className="modal-tiket__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="author">
          <a href="#">
            <img src={creatorMock}></img>
          </a>
          <a href="#">
            <img src={creatorMock}></img>
          </a>
        </div>
        <div className="content">
          <h3 className="title-project">
            <img src={category} className="title-project__category"></img>
            Проект: {tiket.name}
          </h3>
          <div className="content__task">
            <h5>{tiket.code}</h5>
            <div className="content__description">
              <p>
                На многих страницах сайта отсутствуют или некорректно заполнены
                метатеги Description. Это может негативно повлиять на
                представление сайта в результатах поиска.Необходимо исправить
                все страницы где есть ошибки или отсутствует Title и
                Description.
              </p>
              <img src={task}></img>
              <p>
                На многих страницах сайта отсутствуют или некорректно заполнены
                метатеги Description. Это может негативно повлиять на
                представление сайта в результатах поиска.Необходимо исправить
                все страницы где есть ошибки или отсутствует Title и
                Description.
              </p>
            </div>
          </div>
        </div>
        <div className="workers">workers</div>
      </div>
    </div>
  );
};

export default ModalTiket;
