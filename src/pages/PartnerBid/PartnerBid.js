import React, {useState} from 'react';
import {Link, Navigate} from "react-router-dom";

import {ProfileHeader} from "../../components/ProfileHeader/ProfileHeader";
import {ProfileBreadcrumbs} from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs"
import {Footer} from "../../components/Footer/Footer";

import arrowSwitchDate from "../../images/arrowViewReport.png";
import backEndImg from "../../images/QualificationInfo.png";
import middle from "../../images/QualificationInfoMiddle.png";
import personImg from "../../images/mokPerson.png"

import './partnerBid.scss'

export const PartnerBid = () => {
    if(localStorage.getItem('role_status') !== '18') {
        return <Navigate to="/profile" replace/>
    }
    const [mokPersons] = useState([
        {
            name: 'Дмитрий, PHP Back end - разработчик, Middle',
            link: '',
            img: personImg
        },
        {
            name: 'Дмитрий, PHP Back end - разработчик, Middle',
            link: '',
            img: personImg
        },
        {
            name: 'Дмитрий, PHP Back end - разработчик, Middle',
            link: '',
            img: personImg
        }
    ])
    return (
        <div className='partnerBid'>
            <ProfileHeader />
            <div className='container'>
                <ProfileBreadcrumbs links={[
                    {name: 'Главная', link: '/profile'},
                    {name: 'Запросы и открытые позиции', link: '/profile/requests'},
                    {name: 'Просмотр заявки - PHP разработчик', link: '/profile/bid'}
                ]}
                />
                <h2 className='partnerBid__title'>Страница заявки </h2>
                <div className='partnerBid__qualification'>
                    <h3>PHP разработчик</h3>
                </div>
                <div className='partnerBid__switcher'>
                    <div className='partnerBid__switcher__prev switchDate'>
                        <img src={arrowSwitchDate} alt='arrow'/>
                    </div>
                    <p>Дата заявки : 19 декабря 2022 года </p>
                    <div className='partnerBid__switcher__next switchDate'>
                        <img src={arrowSwitchDate} alt='arrow'/>
                    </div>
                </div>
                <div className='table__wrapper'>
                    <table>
                        <thead>
                            <tr>
                                <th><p>Требования к стеку разработчика</p></th>
                                <th><p>Квалификация</p></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <p>
                                        PHP приветствуется аккуратность в коде. MySQL - умение писать запросы к MySQL,
                                        понимание как происходит запрос. Средний уровень: AJAX, JSON, общее понимание;
                                        CSS/CSS3, HTML, Bootstrap;
                                    </p>
                                </td>
                                <td>
                                    <div className='qualification__info'>
                                        <div className='img__wrapper'>
                                            <img src={backEndImg} alt='backEndImg' />
                                        </div>
                                        <p>Backend разработчик</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        Знание современных фреймворков Laravel, Yii 2, FuelPHP, Симфони;
                                        Знания по разработке REST API;
                                        Знание PHP,HTML,CSS,MySQL,Pyhton,JavaScript.
                                    </p>
                                </td>
                                <td>
                                    <div className='qualification__info'>
                                        <div className='img__wrapper'>
                                            <img src={middle} alt='middleImg' />
                                        </div>
                                        <p className='middle'>Средний<br/>(Middle)</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='partnerBid__suitable'>
                    <div className='partnerBid__suitable__title'>
                        <p>Подходящие сотрудники по запросу</p>
                    </div>
                    <div className='partnerBid__suitable__persons'>
                        {mokPersons.map((person, index) => {
                            return <div key={index} className='partnerBid__suitable__person'>
                                        <img src={person.img} alt='avatar' />
                                        <p>{person.name}</p>
                                        <Link className='partnerBid__suitable__person__more' to={person.link}>
                                            Подробнее
                                        </Link>
                                        <div className='partnerBid__suitable__person__info'>

                                        </div>
                                    </div>
                        })
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
};
