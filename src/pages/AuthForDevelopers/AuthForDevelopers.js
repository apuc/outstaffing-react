import React, { useEffect, useState } from "react";

import { AuthBox } from "../../components/AuthBox/AuthBox";

import { useSelector } from "react-redux";
import arrow from "../../images/arrow__login_page.png";
import authImg from "../../images/auth_img.png";
import cross from "../../images/cross.png";
import text from "../../images/Body_Text.png";
import arrowBtn from "../../images/arrowRight.png";
import vector from "../../images/Vector_Smart_Object.png";
import vectorBlack from "../../images/Vector_Smart_Object_black.png";

import { selectAuth } from "../../redux/outstaffingSlice";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import SideBar from "../../components/SideBar/SideBar";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import SliderWorkers from "../../components/SliderWorkers/SliderWorkers";

import "./authForDevelopers.scss";

const AuthForDevelopers = () => {
  const isAuth = useSelector(selectAuth);
  let navigate = useNavigate();
  const getToken = localStorage.getItem("auth_token");

  useEffect(() => {
    if (isAuth || getToken) {
      navigate("/profile");
    }
  }, [getToken]);

  function scrollToForm() {
    window.scrollTo({
      top: 850,
      behavior: "smooth",
    });
  }

  return (
    <section className="auth-developers">
      <AuthHeader />
      <SliderWorkers
        title={"Свободные разработчики"}
        titleInfo={"для Вашей команды"}
        subTitle={true}
      />
      <div className="auth-developers__background">
        <img className="auth-developers__vector" src={vector} alt="" />
        <img
          className="auth-developers__vector-black"
          src={vectorBlack}
          alt="#"
        />
        <div className="container">
          <div className="change-mode">
            <div className="change-mode__arrow" onClick={() => scrollToForm()}>
              <img src={arrowBtn}></img>
            </div>
            <div className="buttons">
              <Link to={"/authdev"}>
                <button className="change-mode__developersForDev">
                  Для разработчиков
                </button>
              </Link>
              <Link to={"/auth"}>
                <button className="change-mode__partnersForDev">
                  Для партнёров
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-xl-6">
              <div className="auth-developers__box">
                <AuthBox title="Для разработчиков" />
              </div>
            </div>
            <div className="col-xl-2">
              <img className="auth-developers__arrow" src={arrow} alt="" />
            </div>
            <div className="col-12 col-xl-4">
              <div className="auth-developers__info">
                <div className="auth-developers__info-box">
                  <img src={authImg} alt="" />
                  <h3>
                    Управление
                    <br /> командой
                  </h3>
                </div>

                <div className="auth-developers__info-container">
                  <div className="auth-developers__info-img">
                    <div>
                      <img className="cross" src={cross} alt="" />
                    </div>
                    <div>
                      {/* <img className='auth-specialists} src={specialists} alt="" /> */}
                      <p className="auth-developers__specialists">
                        20 Специалистов
                      </p>
                    </div>
                  </div>

                  <ul className="auth-developers__info-list">
                    <li className="auth-developers__info-item">
                      Рабочее
                      <br />
                      пространство
                    </li>
                    <li className="auth-info__list-item">
                      Управление задачами
                    </li>
                  </ul>
                </div>

                <img className="auth-developers__img-text" src={text} alt="" />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <SideBar />
    </section>
  );
};

export default AuthForDevelopers;
