import React from "react";

import userIcon from "../../images/userIcon.png";

import "./authHeader.scss";

export const AuthHeader = ({}) => {
  return (
    <div className="auth-header">
      <div className="auth-header__logo">
        <h3>
          itguild.<span>аутстафинг ИТ специалистов</span>
        </h3>
      </div>
      <div className="auth-header__navigation">
        <div className="container">
          <div className="auth-nav">
            <ul>
              <li>
                <a href="#">Главная</a>
              </li>
              <li>
                <a href="#">Кабинет разработчика</a>
              </li>
              <li>
                <a href="#">Школа</a>
              </li>
            </ul>

            <a href="#">
              <img src={userIcon}></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
