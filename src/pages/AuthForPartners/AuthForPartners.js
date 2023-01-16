import React from 'react'
import arrow from '../../images/arrow__login_page.png'
import medium from '../../images/medium_male_big.png'
import cross from '../../images/cross.png'
import text from '../../images/Body_Text.png'
import vector from '../../images/Vector_Smart_Object.png'
import vectorBlack from '../../images/Vector_Smart_Object_black.png'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../redux/outstaffingSlice'
import { useNavigate} from 'react-router-dom'

import { Footer } from '../../components/Footer/Footer'
import { AuthBox } from '../../components/AuthBox/AuthBox'

import './authForPartners.scss'

const AuthForPartners = () => {
  const isAuth = useSelector(selectAuth);
  let navigate = useNavigate();

  if (isAuth) {
    navigate('/')
  }

  return (
    <section className='auth-partners'>
      <div className='auth-partners__background'>
        <img className='auth-partners__vector' src={vector} alt='' />
        <img className='auth-partners__vector-black' src={vectorBlack} alt='' />
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-xl-6'>
              <div className='auth-partners__box'>
                <AuthBox
                  title='Для партнёров'
                  altTitle='Для разработчиков'
                  roleChangeLink='/authdev'
                />
              </div>
            </div>
            <div className='col-xl-2'>
              <img className='auth-partners__arrow' src={arrow} alt='' />
            </div>
            <div className='col-12 col-xl-4'>
              <div className='auth-partners__info'>
                <div className='auth-partners__info-box'>
                  <img src={medium} alt='' />
                  <h3>
                    Frontend разработчик,
                    <br /> Middle
                  </h3>
                </div>

                <div className='auth-partners__info-container'>
                  <div className='auth-partners__info-img'>
                    <div>
                      <img className='cross' src={cross} alt='' />
                    </div>
                    <div>
                      {/* <img className='auth-specialists} src={specialists} alt="" /> */}
                      <p className='auth-partners__specialists'>
                        20 Специалистов
                      </p>
                    </div>
                  </div>

                  <ul className='auth-partners__info-list'>
                    <li className='auth-partners__info-item'>Ruby on Rails</li>
                    <li className='auth-partners__info-item'>PHP</li>
                    <li className='auth-partners__info-item'>Python</li>
                    <li className='auth-partners__info-item'>Vue.js</li>
                    <li className='auth-partners__info-item'>React. JS</li>
                  </ul>
                </div>

                <img className='auth-partners__img-text' src={text} alt='' />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </section>
  )
};

export default AuthForPartners
