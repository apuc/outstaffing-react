import React from "react";

import authImg from "assets/images/partnerProfile/authCandidateFormImg.png";

import "./authBlock.scss";

export const AuthBlock = ({ title, description, img }) => {
  return (
    <div className="auth__wrapper">
      <div className="auth__info">
        {title && <h3>{title}</h3>}
        <img src={authImg} alt="img" />
        <p>{description}</p>
      </div>
      <form className="auth__form">
        <label htmlFor="login">Ваш email *</label>
        <input id="login" type="text" name="username" placeholder="Email" />

        <label htmlFor="password">Ваш пароль*</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Пароль"
        />
        <div className="auth__form__buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Войти
          </button>
          <span>Вспомнить пароль</span>
        </div>
      </form>
      {img && <img src={img} alt="authImg" className="auth__img" />}
    </div>
  );
};

export default AuthBlock;
