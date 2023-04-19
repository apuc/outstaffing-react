import React, {useState} from 'react';
import {Link, Navigate} from "react-router-dom";

import {ProfileHeader} from "../../components/ProfileHeader/ProfileHeader";
import {ProfileBreadcrumbs} from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs"
import {SliderWorkers} from "../../components/SliderWorkers/SliderWorkers"
import {Footer} from "../../components/Footer/Footer";

import cursorImg from "../../images/cursorImg.png"

import './partnerRequests.scss'
import { Navigation } from '../../components/Navigation/Navigation';

export const PartnerRequests = () => {
    if(localStorage.getItem('role_status') !== '18') {
        return <Navigate to="/profile" replace/>
    }
    const [items] = useState([
        {
            name: 'PHP разработчик ',
            count: 4
        },
        {
            name: 'PHP разработчик ',
            count: 4
        },
        {
            name: 'PHP разработчик ',
            count: 4
        },
        {
            name: 'PHP разработчик ',
            count: 4
        }
    ])
    return (
        <div className='partnerRequests'>
            <ProfileHeader />
            <Navigation  />
            <div className='container'>
                <ProfileBreadcrumbs links={[
                    {name: 'Главная', link: '/profile'},
                    {name: 'Запросы и открытые позиции', link: '/profile/requests'}
                ]}
                />
                <h2 className='partnerRequests__title'>Запросы</h2>
                {Boolean(items.length) ?
                    <div className='partnerRequests__section'>
                        <div className='partnerRequests__section__items'>
                            {
                                items.map((item, index) => {
                                    return <Link key={index} to={'/profile/bid'} className='partnerRequests__section__item'>
                                                <p className='partnerRequests__section__item__name'>
                                                    {item.name}
                                                </p>
                                                <p className='partnerRequests__section__item__count'>
                                                    Подходящие кандидаты<span>{item.count}</span>
                                                </p>
                                            </Link>
                                })
                            }
                        </div>
                        <div className='partnerRequests__section__info'>
                            <h3>Инструкция: подачи заявки</h3>
                            <p>
                                Оператор компании заводит заявку и указывает необходимые параметры —
                                количество сотрудников, стек, уровень специалиста
                            </p>
                            <Link to={'/profile/add-request'}>
                                <span>+</span>
                                Создать запрос
                            </Link>
                        </div>
                    </div>
                    :
                    <div className="partnerRequests__noItems">
                        <div className="partnerRequests__noItems__create">
                            <div className="partnerRequests__noItems__create__link">
                                <img src={cursorImg} alt="cursor" />
                                <p>У вас еще нет запросов на сотрудников</p>
                                <Link to={'/profile/add-request'}>
                                    <span>+</span>
                                    Создать запрос
                                </Link>
                            </div>
                            <div className="partnerRequests__noItems__create__instruction">
                                <h3>Инструкция: подачи заявки</h3>
                                <p>
                                    Оператор компании заводит заявку и указывает необходимые параметры —
                                    количество сотрудников, стек, уровень специалиста
                                </p>
                            </div>
                        </div>
                        <div className="partnerRequests__noItems__freeEmployees">
                            <SliderWorkers title={"Свободные разработчики"} titleInfo={"в нашей базе"} />
                            <p>Перейти в полный <Link to={'/profile/catalog'}>КАТАЛОГ</Link> сотрудников</p>
                        </div>
                    </div>
                }
            </div>
            <Footer/>
        </div>
    )
};
