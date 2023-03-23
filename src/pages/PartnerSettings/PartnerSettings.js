import React from "react";
import { Footer } from "../../components/Footer/Footer";

import { ProfileBreadcrumbs } from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";

import kontur from "../../images/konturLogo.png";
import astral from "../../images/astralLogo.png";
import "./partnerSettings.scss";

export const PartnerSettings = () => {
  return (
    <div className="settings">
      <ProfileHeader />
      <div className="container settings__page">
        <ProfileBreadcrumbs
          links={[
            { name: "Главная", link: "/profile" },
            { name: "Данные моего персонала", link: "/profile/settings" },
          ]}
        />
        <div className="partner-settings">
          <h2 className="infoPersonal__title">Настройки акаунта</h2>
          <div className="partner-settings__body">
            <div className="partner-settings__login">
              <h3 className="settings__title">Вход в систему</h3>

              <p className="settings__lable-first">Изменение логина</p>
              <div className="settings__input">
                <input></input>
              </div>

              <p className="settings__lable-second">Изменение пароля</p>
              <div className="settings__input">
                <input></input>
              </div>

              <div className="settings__buttons">
                <button className="settings__buttons-cancel">Отмена</button>
                <button className="settings__buttons-save">Сохранить</button>
              </div>
              <span className="settings__agreement">
                Нажимая "Сохранить", вы соглашаетесь с Правилами обработки и
                использования персональных данных
              </span>
            </div>
            <div className="partner-settings__report">
              <h3 className="settings__title">Документы и отчеты</h3>
              <p className="settings__lable-first">Изменить провадера ЭДО</p>

              <div className="partner-settings__logo">
                <div>
                  <label className="partner-settings__label-first">
                    <img src={astral}></img>
                    <input type="checkbox" />
                    <span className="checkbox__first"></span>
                  </label>
                </div>
                <div>
                  <label className="partner-settings__label-second">
                    <img src={kontur}></img>
                    <input type="checkbox" />
                    <span className="checkbox__second"></span>
                  </label>
                </div>
              </div>

              <p className="settings__lable-second">
                Изменение названия компании
              </p>
              <div className="settings__input">
                <input></input>
              </div>

              <div className="settings__buttons">
                <button className="settings__buttons-cancel">Отмена</button>
                <button className="settings__buttons-save">Сохранить</button>
              </div>
              <span className="settings__agreement">
                Нажимая "Сохранить", вы соглашаетесь с Правилами обработки и
                использования персональных данных
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PartnerSettings;
