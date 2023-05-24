import React, { useState } from "react";

import { Link } from "react-router-dom";
import ModalLayout from "../ModalLayout/ModalLayout";

import avatar from "../../../images/mokPerson.png";
import logoTg from "../../../images/tgLogo.svg";
import arrow from "../../../images/left-arrow.png";
import interview from "../../../images/interviewLogo.svg";

import "./modalAspt.scss";

export const ModalAspt = ({ active, setActive, level }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [modalSend, setModalSend] = useState(false);

  const send = () => {
    if (date != "" && time != "") {
      setModalSend(true);

      setTimeout(() => {
        setModalSend(false);
        setActive(false);
      }, 3200);
    }
  };

  return (
    <div
      className={active ? "modal-aspt active" : "modal-aspt"}
      onClick={() => setActive(false)}
    >
      <div className="modal-aspt__content" onClick={(e) => e.stopPropagation()}>
        <div className="aspt-decs">
          <h1>Выбранный кандидат</h1>
          <div className="aspt-decs__avatar">
            <div className="aspt-decs__avatar_title">
              <img src={avatar}></img>
              <p>
                {level.spec} {level.skils}, {level.level}{" "}
              </p>
            </div>
            <div className="aspt-decs__avatar_back">
              <Link to={"/profile/catalog"}>
                <div>
                  <img src={arrow}></img>
                </div>
                <p>Вернуться к списку</p>
              </Link>
            </div>
          </div>

          <div className="aspt-decs__telega">
            <h4>Есть вопросы?</h4>
            <div className="aspt-decs__telega-logo">
              <img src={logoTg}></img>
              <p>Напишите нам в Телеграм. Мы с удовольствием ответим!</p>
            </div>
          </div>
        </div>
        <div className="form-interview">
          <p>Дата собеседования</p>
          <div className="input">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </div>

          <p>Время собеседования</p>
          <div className="input">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            ></input>
          </div>

          <button onClick={send}>Отправить</button>
        </div>
        <span className="exit" onClick={() => setActive(false)}></span>
      </div>

      <ModalLayout active={modalSend} setActive={setModalSend}>
        <div className="send">
          <img src={interview}></img>
          <h2>Спасибо, собеседование назначено</h2>
          <p>
            Дата: <span>{date}</span>
          </p>
          <p>
            Время собеседования: <span>{time}</span>
          </p>
        </div>
      </ModalLayout>
    </div>
  );
};

export default ModalAspt;
