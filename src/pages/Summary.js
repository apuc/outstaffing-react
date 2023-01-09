import React from 'react';
import {useSelector} from "react-redux";
import {getProfileInfo} from "../redux/outstaffingSlice";
import {ProfileHeader} from "../components/Profile/ProfileHeader";
import {NavLink} from "react-router-dom";
import {Footer} from "../components/Footer/Footer";

import reportsIcon from "../images/reports.png"
import summaryIcon from "../images/summaryIcon.png"
import timerIcon from "../images/timerIcon.png"
import paymentIcon from "../images/paymentIcon.png"
import settingIcon from "../images/settingIcon.png"
import rightArrow from "../images/arrowRight.png"

import './../components/Profile/summary.scss'

export const Summary = () => {
    const profileInfo = useSelector(getProfileInfo)
    return(
        <div className='summary'>
            <ProfileHeader/>
            <div className='container'>
                <h2 className='summary__title'>Добрый день, <span>{profileInfo.fio}</span></h2>
                <div className='summary__info'>
                    <div className='profile__person'>
                        <img src={profileInfo.photo} className='profile__avatar' />
                        <p className='profile__name'>{profileInfo.fio} {profileInfo.specification}</p>
                    </div>
                </div>
                <div className='summary__items'>
                    <NavLink to={'/profile'} className='item'>
                        <div className='item__about'>
                            <img src={reportsIcon} />
                            <h3>Ваша отчетность</h3>
                        </div>
                        <div className='item__info'>
                            <p><span>У вас 122 часа</span><br/> отработанных в этом месяце</p>
                            <div className='item__infoLink'>
                                <img src={rightArrow} />
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to={'/profile'} className='item'>
                        <div className='item__about'>
                            <img src={summaryIcon} />
                            <h3>Данные и резюме</h3>
                        </div>
                        <div className='item__info'>
                            <p>Ваше резюме<br/><span>заполнено</span></p>
                            <div className='item__infoLink'>
                                <img src={rightArrow} />
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to={'/profile'} className='item'>
                        <div className='item__about'>
                            <img src={timerIcon} />
                            <h3>Трекер времени</h3>
                        </div>
                        <div className='item__info'>
                            <p>Сколько времени занимает<br/> выполнение задач</p>
                            <div className='item__infoLink'>
                                <img src={rightArrow} />
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to={'/profile'} className='item'>
                        <div className='item__about'>
                            <img src={paymentIcon} />
                            <h3>Выплаты</h3>
                        </div>
                        <div className='item__info'>
                            <p>У вас <span>подтвержден</span><br/> статус самозанятого</p>
                            <div className='item__infoLink'>
                                <img src={rightArrow} />
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to={'/profile'} className='item'>
                        <div className='item__about'>
                            <img src={settingIcon} />
                            <h3>Настройки аккаунта</h3>
                        </div>
                        <div className='item__info'>
                            <p>Перейдите чтобы начать<br/> редактирование</p>
                            <div className='item__infoLink'>
                                <img src={rightArrow} />
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
