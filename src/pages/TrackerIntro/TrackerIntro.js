import React from "react";
import { NavLink } from "react-router-dom";

import AuthHeader from "@components/Common/AuthHeader/AuthHeader";
import { Footer } from "@components/Common/Footer/Footer";
import SideBar from "@components/SideBar/SideBar";

import introInfo from "assets/icons/starTrackerIntro.svg";
import arrowInfo from "assets/icons/trackerIntroInfo.svg";
import trackerBoard from "assets/images/trackerBoardImg.png";
import trackerHeard from "assets/images/trackerHeard.png";
import introImg from "assets/images/trackerIntroImg.png";

import "./trackerIntro.scss";

export const TrackerIntro = () => {
  return (
    <div className="trackerIntro">
      <AuthHeader />
      <SideBar />
      <div className="trackerIntro__content">
        <div className="container">
          <div className="trackerIntro__intro">
            <div className="trackerIntro__intro__info">
              <div className="trackerIntro__intro__suptitle">
                <img src={introInfo} alt="img" />
                <span>Подключись и пользуйся бесплатно!</span>
              </div>
              <h1 className="trackerIntro__intro__title">
                Сервис для планирования и работы
                <span> для Вашей команды</span>
                <img src={arrowInfo} alt="img" />
              </h1>
              <p className="trackerIntro__intro__subtitle">
                Российский сервис для совместной работы команд. Все процессы
                компании в одном месте: проекты, задачи, цели, сотрудники,
                документы, переписки, отчеты
              </p>
              <NavLink to="/tracker-registration" className="trackerIntro__btn">
                Начать работу
              </NavLink>
            </div>
            <img
              className="trackerIntro__intro__img"
              src={introImg}
              alt="img"
            />
          </div>
        </div>
        <div className="trackerIntro__board">
          <div className="trackerIntro__boardImg">
            <img className="board" src={trackerBoard} alt="board" />
            <img className="heard" src={trackerHeard} alt="heard" />
          </div>
          <div className="trackerIntro__board__info">
            <p>
              Управление большим количеством проектов и гибкая настройка
              структуры под любые процессы
            </p>
            <NavLink to="/tracker-registration" className="trackerIntro__btn">
              Начать работу
            </NavLink>
          </div>
        </div>
        <div className="container">
          <div className="trackerIntro__info">
            <h2 className="trackerIntro__info__title">
              Используйте сервис, который позаботится о персональных данных
              вашей компании и<br />
              <span> не уйдет с рынка.</span>
              <img src={arrowInfo} alt="img" />
            </h2>
            <div className="trackerIntro__info__items">
              <div className="trackerIntro__info__item">
                <div className="trackerIntro__info__itemHead">
                  <span>+</span>
                  <h3>
                    Настраиваемые
                    <br />
                    доски
                  </h3>
                </div>
                <p>
                  Настраиваемые доски позволяют контролировать все ваши задачи и
                  работу вашей команды.
                </p>
              </div>
              <div className="trackerIntro__info__item">
                <div className="trackerIntro__info__itemHead">
                  <span>+</span>
                  <h3>
                    Учет
                    <br />
                    времени
                  </h3>
                </div>
                <p>
                  Учитывайте загрузку и ресурсы сотрудников, получайте доступные
                  отчеты о времени работы над каждой задачей или проектом.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
