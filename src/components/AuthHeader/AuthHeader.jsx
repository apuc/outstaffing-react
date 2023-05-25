import React from "react";
import { NavLink } from "react-router-dom";
import { scrollToForm } from "../../helper";

import userIcon from "../../assets/icons/userIcon.svg";

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
                <NavLink to={"/auth"}>
                  <span>Главная</span>
                </NavLink>
              </li>
              <li>
                <a href="#">Кабинет разработчика</a>
              </li>
              <li>
                <a href="#">Школа</a>
              </li>
              <li>
                <NavLink to={"/auth-candidate"} className="candidate">
                  <span>Войти в команду</span>
                </NavLink>
              </li>
            </ul>

            <a
              onClick={(e) => {
                e.preventDefault();
                scrollToForm();
              }}
            >
              <img src={userIcon}></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
