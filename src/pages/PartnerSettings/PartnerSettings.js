import React from "react";
import { Footer } from "../../components/Footer/Footer";

import { ProfileBreadcrumbs } from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";

import "./partnerSettings.scss";

export const PartnerSettings = () => {
  return (
    <div className="settings">
      <ProfileHeader />
      <div className="container settings__page">
        <ProfileBreadcrumbs
          links={[
            { name: "Главная", link: "/profile" },
            { name: "Данные моего персонала", link: "/profile/employees" },
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

              <div>
                <button>Отмена</button>
                <button>Сохранить</button>
              </div>
              <span>
                Нажимая "Сохранить", вы соглашаетесь с Правилами обработки и
                использования персональных данных
              </span>
            </div>
            <div className="partner-settings__report">
              <h3 className="settings__title">Документы и отчеты</h3>
              <p className="settings__lable-first">Изменить провадера ЭДО</p>
              <div className="settings__input">
                <input></input>
              </div>

              <div>
                <button>Отмена</button>
                <button>Сохранить</button>
              </div>
              <span>
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
