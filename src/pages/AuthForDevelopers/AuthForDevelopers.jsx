import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { selectAuth } from "@redux/outstaffingSlice";

import { scrollToForm } from "@utils/helper";

import { AuthBox } from "@components/AuthBox/AuthBox";
import AuthHeader from "@components/Common/AuthHeader/AuthHeader";
import { Footer } from "@components/Common/Footer/Footer";
import SideBar from "@components/SideBar/SideBar";
import SliderWorkers from "@components/SliderWorkers/SliderWorkers";

import arrowBtn from "assets/icons/arrows/arrowRight.svg";
import arrow from "assets/icons/arrows/arrow__login_page.png";
import text from "assets/images/Body_Text.png";
import vector from "assets/images/Vector_Smart_Object.png";
import vectorBlack from "assets/images/Vector_Smart_Object_black.png";
import cross from "assets/images/cross.png";
import medium from "assets/images/medium_male_big.png";

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
                  <img src={medium} alt="" />
                  <h3>
                    Frontend разработчик,
                    <br /> Middle
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
                      Ruby on Rails
                    </li>
                    <li className="auth-developers__info-item">PHP</li>
                    <li className="auth-developers__info-item">Python</li>
                    <li className="auth-developers__info-item">Vue.js</li>
                    <li className="auth-developers__info-item">React. JS</li>
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
