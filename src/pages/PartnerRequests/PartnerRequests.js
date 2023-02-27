import React, {useState} from 'react';
import {Link} from "react-router-dom";

import {ProfileHeader} from "../../components/ProfileHeader/ProfileHeader";
import {Footer} from "../../components/Footer/Footer";

import './partnerRequests.scss'

export const PartnerRequests = () => {
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
            <div className='container'>
                <h2 className='partnerRequests__title'>Запросы</h2>
                <div className='partnerRequests__section'>
                    <div className='partnerRequests__section__items'>
                        {
                            items.map((item, index) => {
                                return <Link key={index} to={''} className='partnerRequests__section__item'>
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
            </div>
            <Footer/>
        </div>
    )
};
