import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { auth, selectAuth, setUserInfo } from "../../redux/outstaffingSlice";
import { loading } from "../../redux/loaderSlice";
import { setRole } from "../../redux/roleSlice";
import { selectIsLoading } from "../../redux/loaderSlice";

import ModalRegistration from "../Modal/ModalRegistration/ModalRegistration";
import ModalErrorLogin from "../Modal/ModalErrorLogin/ModalErrorLogin";
import { Loader } from "../Loader/Loader";
import { apiRequest } from "../../api/request";

import ellipse from "../../assets/icons/ellipse.png";

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
        Войти в <span>систему</span>
      </h2>
      <div className="auth-box__title">
        <img src={ellipse} alt="." />
        <span>{title}</span>
      </div>
      <form ref={ref} className="auth-box__form">
        <label htmlFor="login">Ваш логин:</label>
        <input id="login" type="text" name="username" placeholder="Логин" />

        <label htmlFor="password">Пароль:</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Пароль"
        />

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

          <ModalRegistration active={modalReg} setActive={setModalReg} />
          <button
            className="auth-box__form-btn--role auth-box__auth-link"
            onClick={(e) => {
              e.preventDefault();
              setModalReg(true);
            }}
          >
            Регистрация
          </button>
        </div>
      </form>
    </div>
  );
};
