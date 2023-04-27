import React, { useState } from "react";

import arrow from "../../images/sideBarArrow.svg";
import LogoITguild from "../../images/LogoITguild.svg";

import "./sidebar.scss";
import { Link } from "react-router-dom";

export const SideBar = () => {
  const [active, setActive] = useState(false);

  const toggleBar = () => {
    if (active) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  return (
    <div className="auth-menu">
      <div className="auth-title">
        <div className="text">
          <div className="burger" onClick={() => toggleBar()}>
            <div
              className={active ? "burger__line  l1 change" : "burger__line"}
            ></div>
            <div
              className={active ? "burger__line  l2 change" : "burger__line"}
            ></div>
            <div
              className={active ? "burger__line  l3 change" : "burger__line"}
            ></div>
          </div>

          <h3>МЕНЮ</h3>
        </div>
        <p className="outstaffing">
          <img src={arrow}></img>
          2023 © Outstaffing
        </p>
      </div>

      <div className={active ? "auth-body active" : "auth-body"}>
        <div className="auth-body__title">
          <img src={LogoITguild}></img>
        </div>
        <ul className="auth-body__navigation">
          <li>
            <Link to={"/auth"}>Вход для партнеров</Link>
          </li>
          <li>
            <Link to={"/auth"}>Кабинет разработчика</Link>
          </li>
          <li>
            <a href="#">Школа</a>
          </li>
          <li>
            <a href="#">Отрасли</a>
          </li>
          <li>
            <a href="#">Контакты</a>
          </li>
          <li>
            <Link to={"/blog"}>Блог</Link>
          </li>
          <li>
            <a href="#">FAQ</a>
          </li>
        </ul>
        <p className="auth-body__politic">Политика конфиденциальности</p>
        <div className="auth-body__contacts">
          <h4>+7 812 363 17 87</h4>
          <p>Перезвонить Вам?</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;