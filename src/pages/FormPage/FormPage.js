import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useNavigate} from 'react-router-dom'
import SVG from 'react-inlinesvg'

import {useRequest} from "../../HOOks/useRequest";
import {WithLogout} from '../../HOC/withLogout'

import Form from '../../components/Form/Form'
import {Footer} from '../../components/Footer/Footer'

import arrow from '../../images/right-arrow.png'
import rectangle from '../../images/rectangle_secondPage.png'
import telegramIcon from '../../images/telegram-icon.svg'

import {LEVELS, SKILLS} from '../../constants/constants'

import {currentCandidate, selectCurrentCandidate} from '../../redux/outstaffingSlice'

import './formPage.scss'
import {apiRequest} from "../../api/request";




const FormPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const candidate = useSelector(selectCurrentCandidate);



  const goBack = () => {
    navigate(-1)
  };

  if (!candidate.id) {
    apiRequest('/profile', {
      params: Number(params.id)
    })
        .then((el) => dispatch(currentCandidate(el)))
  }

  return (
      <WithLogout>
        <div className='form-page'>
          <div className='form-page__back'>
            <div className='form-page__arrow' onClick={goBack}>
              <div className='form-page__arrow-img'>
                <img src={arrow} alt=''/>
              </div>
              <div className='form-page__back-to-candidate'>
                <span>Вернуться к кандидату</span>
              </div>
            </div>
          </div>
          <div className='form-page__candidate'>
            <div className='form-page__avatar'>
              <img src={candidate.photo} alt='candidate avatar'/>
            </div>
            <div className='form-page__candidate-info'>
              <div className='form-page__position'>
              <span>
                {candidate.specification} {SKILLS[candidate.position_id]},{' '}
                {LEVELS[candidate.level]}
              </span>
              </div>
              <div className='form-page__selected'>
                <img src={rectangle} alt='rectangle'/>
                <span>Выбранный кандидат</span>
              </div>
            </div>
          </div>
          <div className='form-page__interview'>
            <div className='form-page__form'>
              <Form/>
            </div>
            <div className='form-page__separator'>
              <div className='form-page__line'></div>
              <div className='form-page__option'>или</div>
            </div>
            <div className='form-page__telegram'>
              <div className='form-page__telegram-text'>
                Заявка на собеседование через телеграм
              </div>
              <div className='form-page__telegram-icon'>
                <a href='https://t.me/st0kir' target='_blank' rel="noreferrer">
                  <SVG src={telegramIcon}/>
                </a>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      </WithLogout>
  )
};

export default FormPage
