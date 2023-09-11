import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loading, selectIsLoading } from "@redux/loaderSlice";
import { auth, selectAuth, setUserInfo } from "@redux/outstaffingSlice";
import { setRole } from "@redux/roleSlice";

import { apiRequest } from "@api/request";

import { Loader } from "@components/Common/Loader/Loader";
import ModalErrorLogin from "@components/Modal/ModalErrorLogin/ModalErrorLogin";
import ModalRegistration from "@components/Modal/ModalRegistration/ModalRegistration";

import authHead from "assets/icons/authHead.svg"
import eyePassword from "assets/icons/passwordIcon.svg"

import "./authBox.scss";

export const AuthBox = ({ title }) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const navigate = useNavigate();

  const isAuth = useSelector(selectAuth);
  const isLoading = useSelector(selectIsLoading);

  const [error, setError] = useState(null);
  const [modalError, setModalError] = useState(false);
  const [modalReg, setModalReg] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      dispatch(auth(false));
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  });

  const submitHandler = () => {
    let formData = new FormData(ref.current);
    if (!isLoading) {
      dispatch(loading(true));
      apiRequest("/user/login", {
        method: "POST",
        data: formData,
      }).then((res) => {
        if (!res.access_token) {
          setError("Введены некоректные данные для входа");
          setModalError(true);
          dispatch(loading(false));
        } else {
          localStorage.setItem("auth_token", res.access_token);
          localStorage.setItem("id", res.id);
          localStorage.setItem("cardId", res.card_id);
          localStorage.setItem("role_status", res.status);
          localStorage.setItem(
            "access_token_expired_at",
            res.access_token_expired_at
          );
          dispatch(auth(true));
          dispatch(setUserInfo(res));
          dispatch(loading(false));
          dispatch(setRole("ROLE_PARTNER"));
        }
      });
    }
  };

  return (
    <div className="auth-box">
      <h2 className="auth-box__header">
        Вход <img src={authHead} alt='authImg' />
      </h2>
      <div className="auth-box__title">
        <span>{title}</span>
      </div>
      <form ref={ref} className="auth-box__form">
        <label htmlFor="login">Ваш email *</label>
        <input id="login" type="text" name="username" placeholder="Логин" />

        <label htmlFor="password">Ваш пароль*</label>
        <div className='inputWrapper'>
          <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Пароль"
          />
          <img onClick={() => setShowPassword(!showPassword)} className='eye' src={eyePassword} alt='eye' />
        </div>

        {error && (
          <div className="auth-box__form-error">
            <ModalErrorLogin
              active={modalError}
              setActive={setModalError}
              title={error}
            />
          </div>
        )}

        <div className="auth-box__form-buttons">
          <button
            className="auth-box__form-btn"
            onClick={(e) => {
              e.preventDefault();
              submitHandler();
            }}
          >
            {isLoading ? <Loader /> : "Войти"}
          </button>
          <span className="auth-box__reset">
            Вспомнить пароль
          </span>

          <ModalRegistration active={modalReg} setActive={setModalReg} />
        </div>
        <p className="auth-box__registration">
          У вас еще нет аккаунта? &nbsp;
          <span
              onClick={(e) => {
                e.preventDefault();
                setModalReg(true);
              }}
          >
            Зарегистрироваться
          </span>
        </p>
      </form>
    </div>
  );
};
