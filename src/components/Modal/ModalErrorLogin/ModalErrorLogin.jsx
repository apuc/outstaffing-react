import React from "react";

import BaseButton from "@components/Common/BaseButton/BaseButton";
import ModalLayout from "@components/Common/ModalLayout/ModalLayout";

import "./modalErrorLogin.scss";

export const ModalErrorLogin = ({ active, setActive, title }) => {
  return (
    <ModalLayout active={active} setActive={setActive} styles={"error-login"}>
      <h2>Ошибка входа</h2>
      <p>{title}</p>
      <BaseButton
        styles={"error-login__button"}
        onClick={(e) => {
          e.preventDefault();
          setActive(false);
        }}
      >
        Попробовать еще раз
      </BaseButton>
      <span onClick={() => setActive(false)} className="exit"></span>
    </ModalLayout>
  );
};

export default ModalErrorLogin;
