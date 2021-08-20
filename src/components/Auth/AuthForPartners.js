import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../redux/outstaffingSlice';
import { loading } from '../../redux/loaderSlice';
import style from './AuthForPartners.module.css';
import ellipse from '../../images/ellipse.png';
import arrow from '../../images/arrow__login_page.png';
import medium from '../../images/medium_male_big.png';
import cross from '../../images/cross.png';
import text from '../../images/Body_Text.png';
import align from '../../images/align-left.png';
import phone from '../../images/phone.png';
import telegram from '../../images/telegram.png';
import vector from '../../images/Vector_Smart_Object.png';
import vectorBlack from '../../images/Vector_Smart_Object_black.png';
import { fetchAuth } from '../../server/server'

import { useSelector } from 'react-redux'
import { selectAuth } from '../../redux/outstaffingSlice';
import { selectIsLoading } from '../../redux/loaderSlice';
import { setRole } from '../../redux/roleSlice';
import { Redirect, Link } from 'react-router-dom';
import { Loader } from '../Loader/Loader'

import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import { Footer } from '../Footer/Footer'
 
const SweetAlert = withSwalInstance(swal);

const AuthForPartners = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectAuth)
  const isLoading = useSelector(selectIsLoading)
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null);

  if(isAuth) {
    return <Redirect to='/' />
  }

  return (
    <section className={style.partners}>
      <div className={style.partners__background}>
        <img className={style.vector} src={vector} alt="" />
        <img className={style.vectorBlack} src={vectorBlack} alt="" />
        <div className="container">
          <div className="row">
            <div className="col-12 col-xl-6">
              <div className={style.partners__box}>
                <h2 className={style.partners__title}>
                  Войти в <span>систему</span>
                </h2>
                <div className={style.partners__partners}>
                  <img src={ellipse} alt="" />
                  <span>Для партнеров</span>
                </div>
                <form className={style.partners__form}>
                  <label htmlFor="login">Ваш логин:</label>
                  <input id="login" type="text" placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  <label htmlFor="password">Пароль:</label>
                  <input id="password" type="password" placeholder="Пароль" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  { error && <div className={style.form__error}>
                  <SweetAlert
                    show={!!error}
                    title="Ошибка"
                    text={error}
                    onConfirm={() => setError(null)}
                  />
                  </div> }

                  <div className={style.form__buttons}>
                  <button
                    className={style.form__btn}
                    onClick={!isLoading ? (e) => {
                      e.preventDefault();
                      dispatch(loading(true))
                      fetchAuth({
                        username,
                        password,
                        dispatch: ()=> {
                          dispatch(auth(true))
                          dispatch(loading(false))
                          dispatch(setRole('ROLE_PARTNER'))
                        },
                        catchError: () => {
                          setError('Некорректные данные для входа')
                          dispatch(loading(false))
                        }
                      })
                    } : ()=>{}}
                  >
                  { isLoading ? <Loader /> : 'Войти' }
                  </button>

                  <button className={`${style.form__btn__dev} ${style.auth__link}`}>
                    <Link to='/authdev'>Для разработчиков</Link>
                  </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-xl-2">
              <img className={style.partners__arrow} src={arrow} alt="" />
            </div>
            <div className="col-12 col-xl-4">
              <div className={style.partners__info}>
                <div className={style.partners__info__box}>
                  <img src={medium} alt="" />
                  <h3>
                    Frontend разработчик,
                    <br /> Middle
                  </h3>
                </div>

                <div className={style.partners__info__container}>
                  <div className={style.partners__info__img}>
                    <div>
                      <img className="cross" src={cross} alt="" />
                    </div>
                    <div>
                      {/* <img className={style.specialists} src={specialists} alt="" /> */}
                      <p className={style.specialists}>20 Специалистов</p>
                    </div>
                  </div>

                  <ul className={style.info__list}>
                    <li className={style.info__list__item}>Ruby on Rails</li>
                    <li className={style.info__list__item}>PHP</li>
                    <li className={style.info__list__item}>Python</li>
                    <li className={style.info__list__item}>Vue.js</li>
                    <li className={style.info__list__item}>React. JS</li>
                  </ul>
                </div>

                <img className={style.img__text} src={text} alt="" />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </section>
  );
};

export default AuthForPartners;
