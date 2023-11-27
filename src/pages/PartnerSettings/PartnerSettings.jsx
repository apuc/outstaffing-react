import React, {useState} from "react";

import BaseButton from "@components/Common/BaseButton/BaseButton";
import { Footer } from "@components/Common/Footer/Footer";
import { Navigation } from "@components/Navigation/Navigation";
import { ProfileBreadcrumbs } from "@components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { ProfileHeader } from "@components/ProfileHeader/ProfileHeader";
import { useNotification } from "@hooks/useNotification";
import { Loader } from "@components/Common/Loader/Loader";

import astral from "assets/images/logo/astralLogo.png";
import kontur from "assets/images/logo/konturLogo.png";

import "./partnerSettings.scss";
import {apiRequest} from "@api/request";

export const PartnerSettings = () => {
  const { showNotification } = useNotification();
  const [inputsValue, setInputsValue] = useState({
    name: '',
    oldPassword: '',
    password: ''
  })

  const [inputsError, setInputsError] = useState({
    name: false,
    password: false,
  });

  const [loader, setLoader] = useState(false)

  const setSettings = () => {
    if (inputsValue.name.length < 2) {
      setInputsError((prevValue) => ({ ...prevValue, name: true }));
      return
    }
    if (inputsValue.password.length < 6 || inputsValue.oldPassword.length < 6) {
      setInputsError(() => ({ name: false, password: true }));
      return
    }
    setLoader(true)
    apiRequest("/user/change-personal-data", {
      method: "PUT",
      data: {
        newUsername : inputsValue.name,
      },
    }).then((data) => {
      apiRequest("/user/change-password", {
        method: "PUT",
        data: {
          password  : inputsValue.oldPassword,
          newPassword: inputsValue.password
        },
      }).then((data) => {
        setLoader(false)
        if (data.status === 'success') {
          setInputsError({
            name: false,
            password: false,
          })
          setInputsValue({
            name: '',
            oldPassword: '',
            password: ''
          })
          showNotification({
            show: true,
            text: "Данные изменены",
            type: "success",
          });
        } else {
          showNotification({
            show: true,
            text: "Неверные данные",
            type: "error",
          });
        }
      })
    })
  }
  return (
    <div className="settings">
      <ProfileHeader />
      <Navigation />
      <div className="container settings__page">
        <ProfileBreadcrumbs
          links={[
            { name: "Главная", link: "/profile" },
            { name: "Настройка профиля", link: "/profile/settings" },
          ]}
        />
        <div className="partner-settings">
          <h2 className="infoPersonal__title">Настройки акаунта</h2>
          <div className="partner-settings__body">
            <div className="partner-settings__login">
              <h3 className="settings__title">Вход в систему</h3>

              <p className="settings__lable-first">Изменение логина</p>
              <div className="settings__input">
                <input
                    className={inputsError.name ? 'warning' : ''}
                    placeholder='Имя'
                    onChange={(e) => {
                    setInputsValue((prevValue) => ({
                      ...prevValue,
                      name: e.target.value,
                    }));
                    setInputsError((prevValue) => ({ ...prevValue, name: false }));
                }}
                    value={inputsValue.name}
                />
                {inputsError.name &&
                    <span className='error'>Минимум 2 символов</span>
                }
              </div>

              <p className="settings__lable-second">Изменение пароля</p>
              <div className="settings__input oldPassword">
                <input
                    className={inputsError.password ? 'warning' : ''}
                    placeholder='Старый пароль'
                    type={"password"}
                    onChange={(e) => {
                      setInputsValue((prevValue) => ({
                        ...prevValue,
                        oldPassword: e.target.value,
                      }));
                      setInputsError((prevValue) => ({ ...prevValue, password: false }));
                    }}
                    value={inputsValue.oldPassword}
                />
                {inputsError.password &&
                  <span className='error'>Введите верный пароль</span>
                }
              </div>
              <div className="settings__input">
                <input
                    className={inputsError.password ? 'warning' : ''}
                    placeholder='Новый пароль'
                    type={"password"}
                    onChange={(e) => {
                      setInputsValue((prevValue) => ({
                        ...prevValue,
                        password: e.target.value,
                      }));
                      setInputsError((prevValue) => ({ ...prevValue, password: false }));
                    }}
                    value={inputsValue.password}
                />
                {inputsError.password &&
                    <span className='error'>Минимум 6 символов</span>
                }
              </div>

              <div className="settings__buttons">
                <BaseButton styles={"settings__buttons-cancel"}>
                  Отмена
                </BaseButton>
                {loader ? <Loader style={"green"} width={'40px'} height={'40px'} /> :
                    <BaseButton onClick={setSettings} styles={"settings__buttons-save"}>
                      Сохранить
                    </BaseButton>
                }
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
                <BaseButton styles={"settings__buttons-cancel"}>
                  Отмена
                </BaseButton>
                <BaseButton styles={"settings__buttons-save"}>
                  Сохранить
                </BaseButton>
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
