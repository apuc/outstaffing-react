import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Loader } from "../Loader/Loader";
import ErrorBoundary from "../../hoc/ErrorBoundary";

import { auth, selectAuth, setUserInfo } from "../../redux/outstaffingSlice";
import { loading } from "../../redux/loaderSlice";
import { setRole } from "../../redux/roleSlice";
import { selectIsLoading } from "../../redux/loaderSlice";

import { apiRequest } from "../../api/request";

import ellipse from "../../images/ellipse.png";

import "./authBox.scss";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SweetAlert = withReactContent(Swal);

export const AuthBox = ({ title, altTitle, roleChangeLink }) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const navigate = useNavigate();

  const isAuth = useSelector(selectAuth);
  const isLoading = useSelector(selectIsLoading);

  const [error, setError] = useState(null);

  const handleModalError = (error) => {
    SweetAlert.fire({
      title: "Ошибка",
      text: error,
    });

    setError(null);
  };

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
          setError("Некорректные данные для входа");
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
        <img src={ellipse} alt="" />
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
            <ErrorBoundary>
              {handleModalError(error)}
              {/*<SweetAlert*/}
              {/*    show={!!error}*/}
              {/*    title='Ошибка'*/}
              {/*    text={error}*/}
              {/*    onConfirm={() => setError(null)}*/}
              {/*/>*/}
            </ErrorBoundary>
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

          <Link to={roleChangeLink}>
            <button className="auth-box__form-btn--role auth-box__auth-link">
              {altTitle}
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};
