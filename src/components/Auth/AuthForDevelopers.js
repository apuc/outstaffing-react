import React from 'react'

import { AuthBox } from '../AuthBox/AuthBox'

import { useSelector } from 'react-redux'
import arrow from '../../images/arrow__login_page.png'
import authImg from '../../images/auth_img.png'
import cross from '../../images/cross.png'
import text from '../../images/Body_Text.png'
import vector from '../../images/Vector_Smart_Object.png'

import { selectAuth } from '../../redux/outstaffingSlice'
import { Redirect } from 'react-router-dom'
import { Footer } from '../Footer/Footer'

import './authForDevelopers.scss'

const AuthForDevelopers = () => {
  const isAuth = useSelector(selectAuth)

  if (isAuth) {
    return <Redirect to='/' />
  }

  return (
    <section className='auth-developers'>
      <div className='auth-developers__background'>
        <img className='auth-developers__vector' src={vector} alt='' />
        <img
          className='auth-developers__vector-black'
          src={'./images/Vector_Smart_Object_black.png'}
          alt=''
        />
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-xl-6'>
              <div className='auth-developers__box'>
                <AuthBox
                  title='Для разработчиков'
                  altTitle='Для партнёров'
                  roleChangeLink='/auth'
                />
              </div>
            </div>
            <div className='col-xl-2'>
              <img className='auth-developers__arrow' src={arrow} alt='' />
            </div>
            <div className='col-12 col-xl-4'>
              <div className='auth-developers__info'>
                <div className='auth-developers__info-box'>
                  <img src={authImg} alt='' />
                  <h3>
                    Управление
                    <br /> командой
                  </h3>
                </div>

                <div className='auth-developers__info-container'>
                  <div className='auth-developers__info-img'>
                    <div>
                      <img className='cross' src={cross} alt='' />
                    </div>
                    <div>
                      {/* <img className='auth-specialists} src={specialists} alt="" /> */}
                      <p className='auth-developers__specialists'>
                        20 Специалистов
                      </p>
                    </div>
                  </div>

                  <ul className='auth-developers__info-list'>
                    <li className='auth-developers__info-item'>
                      Рабочее пространство
                    </li>
                    <li className='auth-info__list-item'>
                      Управление задачами
                    </li>
                  </ul>
                </div>

                <img className='auth-developers__img-text' src={text} alt='' />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </section>
  )
}

export default AuthForDevelopers
