import React, { useState } from "react";

import AuthHeader from "@components/Common/AuthHeader/AuthHeader";
import { Footer } from "@components/Common/Footer/Footer";
import ModalLayout from "@components/Common/ModalLayout/ModalLayout";
import { ModalTrackerRegistration } from "@components/Modal/ModalTrackerRegistration/ModalTrackerRegistration";
import SideBar from "@components/SideBar/SideBar";

import arrowInfo from "assets/icons/trackerIntroInfo.svg";
import authImg from "assets/images/partnerProfile/authCandidateFormImg.png";
import registrationImg from "assets/images/trackerRegistrationImg.png";

import "./trackerRegistration.scss";

export const TrackerRegistration = () => {
  const [modalConfirmOpen, setModalConfirm] = useState(false);

  return (
    <div className="trackerRegistration">
      <AuthHeader />
      <SideBar />
      <div className="trackerAuth__content">
        <div className="container">
          <h1 className="trackerAuth__title">
            Создайте свое{" "}
            <span>
              рабочее пространство
              <img src={arrowInfo} alt="arrow" />
            </span>
          </h1>
          <div className="trackerRegistration__form">
            <div className="trackerRegistration__form__inputs">
              <div className="trackerRegistration__inputContainer">
                <span>Ваше имя *</span>
                <input placeholder="Имя" />
              </div>
              <div className="trackerRegistration__inputContainer">
                <span>Придумайте пароль*</span>
                <input placeholder="Пароль" />
              </div>
              <div className="trackerRegistration__inputContainer">
                <span>Ваш email *</span>
                <input placeholder="Email" type="email" />
              </div>
              <div className="trackerRegistration__inputContainer">
                <span>Повторите пароль*</span>
                <input placeholder="Повторите пароль" />
              </div>
            </div>
            <div className="trackerRegistration__form__submit">
              <button onClick={() => setModalConfirm(true)}>Отправить</button>
              <div className="trackerRegistration__form__info">
                <img src={authImg} alt="img" />
                <p>
                  Создавайте и редактируйте задачи и проекты вместе с другими
                  участниками команды.
                </p>
              </div>
            </div>
            <img
              className="trackerRegistration__form__img"
              src={registrationImg}
              alt="img"
            />
          </div>
        </div>
        {modalConfirmOpen && (
          <ModalLayout active={modalConfirmOpen} setActive={setModalConfirm}>
            <ModalTrackerRegistration setModalReset={setModalConfirm} />
          </ModalLayout>
        )}
        <Footer />
      </div>
    </div>
  );
};
