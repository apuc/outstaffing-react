import React from "react";

import AuthHeader from "@components/Common/AuthHeader/AuthHeader";
import SideBar from "@components/SideBar/SideBar";
import StepsForCandidate from "@components/StepsForCandidate/StepsForCandidate";
import { Footer } from "@components/Common/Footer/Footer";

import BackEndImg from "assets/images/partnerProfile/personalBackEnd.svg";
import arrowBtn from "assets/icons/arrows/arrowRight.svg";

import "./registationForCandidate.scss";

export const RegistrationForCandidate = () => {
  return (
    <div className="registrationCandidate">
      <AuthHeader />
      <div className="container">
        <div className="registrationCandidate__start">
          <h2 className="auth-candidate__start__title">
            Хочу в команду <span>Айти специалистов</span>
          </h2>
          <div className="change-mode__arrow">
            <img src={arrowBtn}></img>
          </div>
          <p className="auth-candidate__start__description">
            Для нас не имеет значение Ваша локация.
          </p>
          <StepsForCandidate step="шаг 2 - заполните данные" />
          <div className="registrationCandidate__formWrapper">
            <div className="registrationCandidate__info">
              <div className="registrationCandidate__info__category">
                <img src={BackEndImg} alt="img" />
                <p>Backend разработчики</p>
              </div>
              <p className="registrationCandidate__info__skills">
                Java PHP Python C# React Vue.js NodeJs Golang Ruby JavaScript
              </p>
              <div className="registrationCandidate__info__arrow">
                <img src={arrowBtn} alt="img" />
              </div>
            </div>
            <form className="registrationCandidate__form">
              <div className="registrationCandidate__form__input">
                <label htmlFor="name">Ваше имя *</label>
                <input id="name" type="text" placeholder="Имя" />
              </div>
              <div className="registrationCandidate__form__input">
                <label htmlFor="summary">Если есть ссылка на резюме</label>
                <input id="summary" type="text" placeholder="Резюме" />
              </div>
              <div className="registrationCandidate__form__input">
                <label htmlFor="email">Ваш email *</label>
                <input id="email" type="text" placeholder="Email" />
              </div>
              <div className="registrationCandidate__form__input">
                <label htmlFor="tg">Ваш телеграм*</label>
                <input id="tg" type="text" placeholder="Телеграм" />
              </div>
              <div className="registrationCandidate__form__input">
                <label htmlFor="password">Придумайте пароль*</label>
                <input id="password" type="text" placeholder="Пароль" />
              </div>
              <div className="registrationCandidate__form__input">
                <label htmlFor="secondPassword">Повторите пароль*</label>
                <input id="secondPassword" type="text" placeholder="Пароль" />
              </div>
              <div className="registrationCandidate__form__submit">
                <button>Отправить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <SideBar />
      <Footer />
    </div>
  );
};
