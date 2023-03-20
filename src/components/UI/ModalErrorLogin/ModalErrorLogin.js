import React from "react";

import "./modalErrorLogin.scss";

export const ModalErrorLogin = ({ active, setActive }) => {
  return (
    <div
      className={active ? "modal-error active" : "modal-error"}
      onClick={() => setActive(false)}
    >
      <div
        className="modal-error__content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Ошибка входа</h2>
        <p>Введены некоректные данные для входа</p>
        <button className="modal-error__content-button">
          Попробовать еще раз
        </button>
        <span onClick={() => setActive(false)}></span>
      </div>
    </div>
  );
};

export default ModalErrorLogin;
