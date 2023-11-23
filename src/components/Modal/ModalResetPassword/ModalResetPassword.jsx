import React, { useState } from "react";

import { apiRequest } from "@api/request";

import { useNotification } from "@hooks/useNotification";

import ModalLayout from "@components/Common/ModalLayout/ModalLayout";
import { Loader } from "@components/Common/Loader/Loader";

import arrow from "assets/icons/arrows/arrowCalendar.png";
import close from "assets/icons/close.png";

import "./modalResetPassword.scss";

export const ModalResetPassword = ({ active, setActive }) => {
  const [step, setStep] = useState(false);
  const [inputsValue, setInputsValue] = useState({
    email: "",
    token: "",
    password: "",
  });

  const [inputsError, setInputsError] = useState({
    email: false,
    password: false,
    token: false
  });

  const validateEmail = (email) => {
    // регулярное выражение для проверки email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // возвращаем true, если email проходит проверку, и false, если нет
    return re.test(email);
  };

  const [loader, setLoader] = useState(false)

  const resetInputsValue = () => {
    setInputsValue({
      email: "",
      token: "",
      password: "",
    });
  };

  const { showNotification } = useNotification();
  const submitHandler = () => {
    if (!validateEmail(inputsValue.email)) {
      setInputsError((prevValue) => ({ ...prevValue, email: true }));
      return showNotification({
        show: true,
        text: "Введите коректный email",
        type: "error",
      });
    }
    setLoader(true)
    apiRequest("/register/request-password-reset", {
      method: "POST",
      data: {
        email: inputsValue.email,
      },
    }).then((data) => {
      setLoader(false)
      if (data) {
        showNotification({
          show: true,
          text: "Письмо отправлено Вам на почту",
          type: "success",
        });
        setStep(true);
      }
    });
  };
  const resetPassword = () => {
    if (!inputsValue.password || !inputsValue.token) {
      setInputsError((prevValue) => ({ ...prevValue, password: true, token: true }));
      return showNotification({
        show: true,
        text: "Введите данные",
        type: "error",
      });
    }
    if (inputsValue.password.length < 6) {
      setInputsError((prevValue) => ({ ...prevValue, password: true }));
      return
    }
    setLoader(true)
    apiRequest("/register/reset-password", {
      method: "POST",
      data: {
        token: inputsValue.token,
        password: inputsValue.password,
      },
    }).then((data) => {
      setLoader(false)
      if (data.code === 0) {
        showNotification({
          show: true,
          text: "Введите коректные данные",
          type: "error",
        });
      } else {
        setActive(false);
        resetInputsValue();
        showNotification({
          show: true,
          text: "Пароль изменён",
          type: "success",
        });
      }
    });
  };
  return (
    <ModalLayout active={active} setActive={setActive}>
      <div className="resetPassword">
        <img
          className="resetPassword__close"
          src={close}
          alt="close"
          onClick={() => setActive(false)}
        />
        <h3 className="resetPassword__title">Восстановление пароля</h3>
        {!step ? (
          <div className="resetPassword__email">
            <h5>Введите email:</h5>
            <input
              type="email"
              onChange={(e) => {
                setInputsValue((prevValue) => ({
                  ...prevValue,
                  email: e.target.value,
                }))
                setInputsError({
                  email: false,
                  password: false,
                  token: false
                });
              }}
              placeholder="Email"
              value={inputsValue.email}
              className={inputsError.email ? "error" : ""}
            />
            {inputsError.email && <span className='warningText'>Введите коректный email</span>}
            {loader ?
                <Loader style={'green'} /> :
                <button
                className="resetPassword__btn"
                onClick={(e) => {
                e.preventDefault();
                submitHandler();
              }}
                >
                Отправить
                </button>
            }
          </div>
        ) : (
          <div className="resetPassword__email">
            <img
              src={arrow}
              onClick={() => setStep(false)}
              className="resetPassword__email__arrow"
            />
            <h5>Введите код подтверждения:</h5>
            <input
              type="text"
              onChange={(e) => {
                setInputsError({
                  email: false,
                  password: false,
                  token: false
                });
                setInputsValue((prevValue) => ({
                  ...prevValue,
                  token: e.target.value,
                }))
              }}
              value={inputsValue.token}
              className={inputsError.token ? "error" : ""}
              placeholder="token"
            />
            {inputsError.token && <span className='warningText'>Введите данные</span>}
            <h5>Введите новый пароль:</h5>
            <input
              type="password"
              onChange={(e) => {
                setInputsValue((prevValue) => ({
                  ...prevValue,
                  password: e.target.value,
                }))
                setInputsError({
                  email: false,
                  password: false,
                  token: false
                });
              }}
              placeholder="password"
              value={inputsValue.password}
              className={inputsError.password ? "error" : ""}
            />
            {inputsError.password && <span className='warningText'>Минимум 6 символов</span>}
            {loader ? <Loader style={'green'} /> :
                <button
                    className="resetPassword__btn"
                    onClick={(e) => {
                      e.preventDefault();
                      resetPassword();
                    }}
                >
                  Отправить
                </button>
            }
          </div>
        )}
      </div>
    </ModalLayout>
  );
};

export default ModalResetPassword;
