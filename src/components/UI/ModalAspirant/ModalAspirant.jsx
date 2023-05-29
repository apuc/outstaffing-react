import React, { useState } from "react";

import { Link } from "react-router-dom";
import ModalLayout from "../../Common/ModalLayout/ModalLayout";
import Button from "../../Common/Button/Button";

import avatar from "../../../assets/images/mock/mokPerson.png";
import logoTg from "../../../assets/icons/tgLogo.svg";
import arrow from "../../../assets/icons/arrows/left-arrow.png";
import interview from "../../../assets/images/logo/interviewLogo.svg";

import "./modalAspirant.scss";

export const ModalAspirant = ({ active, setActive, level }) => {
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
    <ModalLayout active={active} setActive={setActive} styles={"aspirant"}>
      <div className="aspirant-decs">
        <h1>Выбранный кандидат</h1>
        <div className="aspirant-decs__avatar">
          <div className="aspirant-decs__avatar_title">
            <img src={avatar}></img>
            <p>
              {level.spec} {level.skils}, {level.level}{" "}
            </p>
          </div>
          <div className="aspirant-decs__avatar_back">
            <Link to={"/profile/catalog"}>
              <div>
                <img src={arrow}></img>
              </div>
              <p>Вернуться к списку</p>
            </Link>
          </div>
        </div>

        <div className="aspirant-decs__telega">
          <h4>Есть вопросы?</h4>
          <div className="aspirant-decs__telega-logo">
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
        <Button onClick={send} styles="form-interview__submit">
          Отправить
        </Button>
      </div>
      <span className="exit" onClick={() => setActive(false)}></span>
      <ModalLayout active={modalSend} setActive={setModalSend} styles={"send"}>
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
    </ModalLayout>
  );
};

export default ModalAspirant;
