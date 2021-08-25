import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import { currentCandidate, selectCurrentCandidate, auth } from '../redux/outstaffingSlice';
import SVG from 'react-inlinesvg';
import { WithLogout } from '../hoc/withLogout';
import Form from '../components/Form/Form';
import { LEVELS, SKILLS } from '../components/constants/constants';
import { fetchItemsForId } from '../server/server';
import { Footer } from '../components/Footer/Footer';

import arrow from '../images/right-arrow.png';
import rectangle from '../images/rectangle_secondPage.png';
import telegramIcon from '../images/telegram-icon.svg';

import './formPage.scss';
import { getRole } from '../redux/roleSlice';

const goBack = (history) => {
    history.goBack();
  };

const FormPage = () => {
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const candidate = useSelector(selectCurrentCandidate);
    const role = useSelector(getRole);

    if(!candidate.id) {
        fetchItemsForId({ link: `${process.env.REACT_APP_API_URL}/api/profile/`, index: Number(params.id), history, role, logout: dispatch(auth(false))  }).then((el) =>
            dispatch(currentCandidate(el))
        );
    }

    return (
        <WithLogout>
        <div className='form-page'>
            <div className='form-page__back'>
                <div className='form-page__arrow' onClick={() => goBack(history)}>
                    <div className='form-page__arrow-img'>
                        <img src={arrow} alt="" />
                    </div>
                    <div className='form-page__back-to-candidate'>
                        <span>Вернуться к кандидату</span>
                    </div>
                </div>
            </div>
            <div className='form-page__candidate'>
                <div className='form-page__avatar'>
                    <img src={candidate.photo} />
                </div>
                <div className='form-page__candidate-info'>
                    <div className='form-page__position'>
                        <span>{candidate.specification} {SKILLS[candidate.position_id]}, {LEVELS[candidate.level]}</span>
                    </div>
                    <div className='form-page__selected'>
                        <img src={rectangle} />
                        <span>Выбранный кандидат</span>
                    </div>
                </div>
            </div>
            <div className='form-page__interview'>
                <div className='form-page__form'><Form /></div>
                <div className='form-page__separator'>
                    <div className='form-page__line'></div>
                    <div className='form-page__option'>или</div>
                </div>
                <div className='form-page__telegram'>
                    <div className='form-page__telegram-text'>Заявка на собеседование через телеграм</div>
                    <div className='form-page__telegram-icon'>
                       <a href='https://t.me/st0kir' target='_blank'><SVG src={telegramIcon} /></a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        </WithLogout>
    )
}

export default FormPage;
