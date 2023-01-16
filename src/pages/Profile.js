import React from 'react';
import {useSelector} from "react-redux";
import {getProfileInfo} from "../redux/outstaffingSlice";
import {ProfileHeader} from "../components/Profile/ProfileHeader";
import {Link} from "react-router-dom";
import {Footer} from "../components/Footer/Footer";

import reportsIcon from "../images/reports.png"
import summaryIcon from "../images/summaryIcon.png"
import timerIcon from "../images/timerIcon.png"
import paymentIcon from "../images/paymentIcon.png"
import settingIcon from "../images/settingIcon.png"
import rightArrow from "../images/arrowRight.png"

import '../components/Profile/profile.scss'

export const Profile = () => {
    const profileInfo = useSelector(getProfileInfo);
    return(
        <div className='profile'>
            <ProfileHeader/>
            <div className='container'>
                <h2 className='profile__title'>Добрый день, <span>{profileInfo.fio}</span></h2>
                <div className='summary__info'>
                    <div className='summary__person'>
                        <img src={profileInfo.photo} className='summary__avatar'  alt='avatar'/>
                        <p className='summary__name'>{profileInfo.fio} {profileInfo.specification}</p>
                    </div>
                </div>
                <div className='profile__items'>
                    <Link to={'/profile/profilecalendar'} className='item'>
                        <div className='item__about'>
                            <img src={reportsIcon}  alt='report'/>
                            <h3>Ваша отчетность</h3>
                        </div>
                        <div className='item__info'>
                            <p><span></span>Отработанных в этом месяце часов</p>
                            <div className='item__infoLink'>
                                <img src={rightArrow}  alt='arrow'/>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/summary'} className='item'>
                        <div className='item__about'>
                            <img src={summaryIcon}  alt='summary'/>
                            <h3>Данные и резюме</h3>
                        </div>
                        <div className='item__info'>
                            <p>Ваше резюме<br/><span>заполнено</span></p>
                            <div className='item__infoLink'>
                                <img src={rightArrow}  alt='arrow'/>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/profile'} className='item'>
                        <div className='item__about'>
                            <img src={timerIcon} alt='timer'/>
                            <h3>Трекер времени</h3>
                        </div>
                        <div className='item__info'>
                            <p>Сколько времени занимает<br/> выполнение задач</p>
                            <div className='item__infoLink'>
                                <img src={rightArrow} alt='arrow'/>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/profile'} className='item'>
                        <div className='item__about'>
                            <img src={paymentIcon} alt='payment'/>
                            <h3>Выплаты</h3>
                        </div>
                        <div className='item__info'>
                            <p>У вас <span>подтвержден</span><br/> статус самозанятого</p>
                            <div className='item__infoLink'>
                                <img src={rightArrow} alt='arrow'/>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/profile'} className='item'>
                        <div className='item__about'>
                            <img src={settingIcon} alt='settings'/>
                            <h3>Настройки аккаунта</h3>
                        </div>
                        <div className='item__info'>
                            <p>Перейдите чтобы начать<br/> редактирование</p>
                            <div className='item__infoLink'>
                                <img src={rightArrow} alt='arrow'/>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <Footer/>
        </div>
    )
};
