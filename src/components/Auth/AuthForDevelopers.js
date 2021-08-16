import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../redux/outstaffingSlice'
import { loading } from '../../redux/loaderSlice'
import style from './AuthForDevelopers.module.css'
import ellipse from '../../images/ellipse.png'
import arrow from '../../images/arrow__login_page.png'
import authImg from '../../images/auth_img.png'
import cross from '../../images/cross.png'
import text from '../../images/Body_Text.png'
import align from '../../images/align-left.png'
import phone from '../../images/phone.png'
import telegram from '../../images/telegram.png'
import vector from '../../images/Vector_Smart_Object.png'
import vectorBlack from '../../images/Vector_Smart_Object_black.png'
import { fetchAuth } from '../../server/server'

import { selectAuth } from '../../redux/outstaffingSlice';
import { selectIsLoading } from '../../redux/loaderSlice';
import { Redirect, Link } from 'react-router-dom';
import { Loader } from '../Loader/Loader'

import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
 
const SweetAlert = withSwalInstance(swal);

const AuthForDevelopers = () => {
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
    <section className={style.developers}>
      <div className={style.developers__background}>
        <img className={style.vector} src={vector} alt='' />
        <img className={style.vectorBlack} src={vectorBlack} alt='' />
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-xl-6'>
              <div className={style.developers__box}>
                <h2 className={style.developers__title}>
                  Войти в <span>систему</span>
                </h2>
                <div className={style.developers__partners}>
                  <img src={ellipse} alt='' />
                  <span>Для разработчиков</span>
                </div>
                <form className={style.developers__form}>
                  <label htmlFor='login'>Ваш логин:</label>
                  <input
                    id='login'
                    type='text'
                    placeholder='Логин'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  <label htmlFor='password'>Пароль:</label>
                  <input
                    id='password'
                    type='password'
                    placeholder='Пароль'
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

                    <button className={`${style.form__btn__partners} ${style.auth__link}`}>
                      <Link to='/auth'>Для партнёров</Link>
                    </button>
                  </div>

                </form>
              </div>
            </div>
            <div className='col-xl-2'>
              <img className={style.developers__arrow} src={arrow} alt='' />
            </div>
            <div className='col-12 col-xl-4'>
              <div className={style.developers__info}>
                <div className={style.developers__info__box}>
                  <img src={authImg} alt='' />
                  <h3>
                    Управление
                    <br /> командой
                  </h3>
                </div>

                <div className={style.developers__info__container}>
                  <div className={style.developers__info__img}>
                    <div>
                      <img className='cross' src={cross} alt='' />
                    </div>
                    <div>
                      {/* <img className={style.specialists} src={specialists} alt="" /> */}
                      <p className={style.specialists}>20 Специалистов</p>
                    </div>
                  </div>

                  <ul className={style.info__list}>
                    <li className={style.info__list__item}>
                      Рабочее пространство
                    </li>
                    <li className={style.info__list__item}>
                      Управление задачами
                    </li>
                  </ul>
                </div>

                <img className={style.img__text} src={text} alt='' />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12 col-xl-7'>
              <div className={style.developers__footer__left}>
                <div className={style.footer__left__img}>
                  <img src={align} alt='' />
                </div>
                <div className={style.footer__left__sp}>
                  <span>
                    Подберем и документально оформим IT-специалистов, после чего передадим исполнителей под ваше руководство. 
                    Вы получаете полное управление над сотрудниками, имея возможность контролировать и заменять IT штат.{' '}
                    <br></br>
                    <br></br>
                    2021 © Outstaffing
                  </span>
                </div>
              </div>
            </div>

            <div className='col-4 col-xl-2'>
              <div className={style.developers__footer__icon}>
                <img src={phone} alt='' />
                <img src={telegram} alt='' />
              </div>
            </div>

            <div className='col-8 col-xl-3'>
              <div className={style.developers__footer__right}>
                <p className={style.phone}>+7 495 156 78 98</p>
                <p className={style.workingHours}>Будни с 9:00 до 21:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthForDevelopers
