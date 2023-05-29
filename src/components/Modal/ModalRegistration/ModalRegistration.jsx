import React from "react";

import ModalLayout from "../../Common/ModalLayout/ModalLayout";
import BaseButton from "../../Common/BaseButton/BaseButton";

import telegramLogo from "../../../assets/icons/tgLogo.svg";
import doc from "../../../assets/icons/doc.svg";
import anyMoment from "../../../assets/icons/anyMoment.svg";

import "./modalRegistration.scss";

export const ModalRegistration = ({ active, setActive }) => {
  return (
    <ModalLayout active={active} setActive={setActive} styles={"registration"}>
      <div className="registration-body__left">
        <h2>
          Подключайтесь к <p>itguild.</p>
        </h2>
        <p className="registration-body__left-desc">
          Зарегистрируйтесь и назначайте собеседования любым специалистам без
          задержек
        </p>

        <div className="input-body">
          <div className="input-body__box">
            <h5>Ваше имя</h5>
            <input></input>
            <h5>E-mail</h5>
            <input></input>
          </div>

          <div className="input-body__box">
            <h5>Название компании</h5>
            <input></input>
            <h5>Пароль</h5>
            <input></input>
          </div>
        </div>
        <div className="button-box">
          <BaseButton
            onClick={(e) => e.preventDefault()}
            styles={"button-box__submit"}
          >
            Отправить
          </BaseButton>
          <h5>
            У вас уже есть аккаунт? <p>Войти</p>
          </h5>
        </div>
      </div>
      <div className="registration-body__right">
        <h4>Отказ от специалиста в любой момент</h4>
        <div className="registration-body__right-text">
          <img src={anyMoment}></img>
          <p>
            Поменяйте, откажитесь или возьмите еще специалиста в любой момент
            работы.
          </p>
        </div>
        <h4>100% постоплата</h4>
        <div className="registration-body__right-text">
          <img src={doc}></img>
          <p>
            Договор не подразумевает какую‑либо оплату до того, как вы
            арендовали специалиста
          </p>
        </div>
        <h4>Есть вопросы?</h4>
        <div className="registration-body__right-text">
          <img src={telegramLogo}></img>
          <p>Напишите нам в Телеграм. Мы с удовольствием ответим!</p>
        </div>
      </div>
      <span onClick={() => setActive(false)} className="exit"></span>
    </ModalLayout>
  );
};

export default ModalRegistration;
