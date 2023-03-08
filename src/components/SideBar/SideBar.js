import React, { useState } from "react";

import arrow from "../../images/sideBarArrow.svg";

import "./sidebar.scss";

export const SideBar = () => {
  const [active, setActive] = useState(false);

  const toggleBar = () => {};
  return (
    <div className="auth-menu">
      <div className="auth-title">
        <div className="text">
          <div className="burger" onClick={() => setActive(true)}>
            <div className="burger__line"></div>
            <div className="burger__line"></div>
            <div className="burger__line"></div>
          </div>

          <h3>МЕНЮ</h3>
        </div>
        <p className="outstaffing">
          <img src={arrow}></img>
          2023 © Outstaffing
        </p>
      </div>
      <div className={active ? "auth-body active" : "auth-body"}></div>
    </div>
  );
};

export default SideBar;
