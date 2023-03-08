import React from "react";
import "./sidebar.scss";

export const SideBar = ({ active, setActive }) => {
  return (
    <div className={active ? "auth-menu active" : "auth-menu"}>
      <div className="auth-title">
        <div className="text">
          <h3>МЕНЮ</h3>
          <div className="burger">
            <span className="burger__line"></span>
            <span className="burger__line"></span>
            <span className="burger__line"></span>
          </div>
        </div>
        <p>2023 © Outstaffing</p>
      </div>
    </div>
  );
};

export default SideBar;
