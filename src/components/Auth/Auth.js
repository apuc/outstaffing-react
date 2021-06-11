import React from 'react';
import style from './Auth.module.css';
import ellipse from '../../images/ellipse.png';
import arrow from '../../images/arrow__login_page.png';
import male from '../../images/medium_male_big.png';
import cross from '../../images/cross.png';
import specialists from '../../images/specialists.png';
import text from '../../images/Body_Text.png';
import align from '../../images/align-left.png';
import phone from '../../images/phone.png';
import telegram from '../../images/telegram.png';

const Auth = ({ setAuthed }) => {
  return (
    <section className={style.auth}>
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className={style.auth__box}>
              <h2 className={style.auth__title}>
                Войти в <span>систему</span>
              </h2>
              <div className={style.auth__partners}>
                <img src={ellipse} alt="" />
                <span>Для партнеров</span>
              </div>
              <form className={style.auth__form}>
                <label htmlFor="login">Ваш логин:</label>
                <input id="login" type="text" placeholder="Логин" />

                <label htmlFor="password">Пароль:</label>
                <input id="password" type="password" placeholder="Пароль" />

                <button className={style.form__btn} type="submit">
                  Войти
                </button>
              </form>
            </div>
          </div>
          <div className="col-xl-2">
            <img className={style.auth__arrow} src={arrow} alt="" />
          </div>
          <div className="col-xl-4">
            <div className={style.auth__info}>
              <div className={style.auth__info__box}>
                <img src={male} alt="" />
                <h3>
                  Frontend разработчик, <br /> Middle
                </h3>
              </div>

              <div className={style.auth__info__container}>
                <div className={style.auth__info__img}>
                  <div>
                    <img className="cross" src={cross} alt="" />
                  </div>
                  <div>
                    <img className={style.specialists} src={specialists} alt="" />
                  </div>
                </div>

                <ul className={style.info__list}>
                  <li className={style.info__list__item}>Ruby on Rails</li>
                  <li className={style.info__list__item}>Php</li>
                  <li className={style.info__list__item}>Python</li>
                  <li className={style.info__list__item}>Vue.js</li>
                  <li className={style.info__list__item}>React. JS</li>
                </ul>
              </div>

              <img className={style.img__text} src={text} alt="" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-7">
            <div className={style.auth__footer__left}>
              <div className={style.footer__left__img}>
                <img src={align} alt="" />
              </div>
              <div className={style.footer__left__sp}>
                <span>
                  © Адвего — биржа контента №1. Копирайтинг, рерайтинг, переводы, работа на дому: поставщик уникального
                  контента. 2021{' '}
                </span>
              </div>
            </div>
          </div>

          <div className="col-xl-2">
            <div className={style.auth__footer__icon}>
              <img src={phone} alt="" />
              <img src={telegram} alt="" />
            </div>
          </div>

          <div className="col-xl-3">
            <div className={style.auth__footer__right}>
              <p className={style.phone}>+7 495 156 78 98</p>
              <p className={style.workingHours}>Будни с 9:00 до 21:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
