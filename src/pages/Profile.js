import React, {useEffect, useState} from 'react';
import { ProfileHeader } from "../components/Profile/ProfileHeader";
import { setProfileInfo, getProfileInfo } from "../redux/outstaffingSlice";
import {useDispatch, useSelector} from "react-redux";
import { fetchGet } from '../../src/server/server'
import {Link} from "react-router-dom";

import './../components/Profile/profile.scss'
export const Profile = () => {
    const dispatch = useDispatch();
    const profileInfo = useSelector(getProfileInfo)
    useEffect(() => {
        fetchGet({
            link: `${process.env.REACT_APP_API_URL}/api/profile/get-main-data?user_id=${localStorage.getItem('id')}`,
        }).then((profileInfo) => {
            dispatch(setProfileInfo(profileInfo))
        })
    }, [dispatch, localStorage.getItem('id')])
    return(
        <div className='profile'>
            <div className='profile__container'>
                <ProfileHeader/>
                <div className='profile__content'>
                    <div className='profile__sideBar'>
                        <h2 className='profile__sideBar__position'>{profileInfo.position_name} {profileInfo.specification}</h2>
                        <img className='profile__avatar' src={profileInfo.photo} />
                        <span className='profile__sideBar-name'>{profileInfo.fio}</span>
                        <p className='profile__sideBar__experience'>Опыт работы: <span>{profileInfo.years_of_exp}года</span></p>
                    </div>
                    <div className='profile__content__info'>
                        <div className="works__body">
                            <div className="works__item item-works">
                                <div className="item-works__body">
                                    <Link to="/" className="item-works__link">Vuetifyis.com</Link>
                                    <div className="item-works__text">Forked from peluprvi/vuetifyjs.com <br/> Vuetifyjs.com
                                        documentation
                                    </div>
                                    <div className="item-works__mark">Angular</div>
                                </div>
                            </div>
                            <div className="works__item item-works">
                                <div className="item-works__body">
                                    <Link to="/" className="item-works__link">Vuetifyis.com</Link>
                                    <div className="item-works__text">Forked from peluprvi/vuetifyjs.com <br/> Vuetifyjs.com
                                        documentation
                                    </div>
                                    <div className="item-works__mark">Angular</div>
                                </div>
                            </div>
                            <div className="works__item item-works">
                                <div className="item-works__body">
                                    <Link to="/" className="item-works__link">Vuetifyis.com</Link>
                                    <div className="item-works__text">Forked from peluprvi/vuetifyjs.com <br/> Vuetifyjs.com
                                        documentation
                                    </div>
                                    <div className="item-works__mark item-works__mark_yellow">Laravel</div>
                                </div>
                            </div>
                        </div>
                        <Link to={`/ProfileCalendar`}>
                            <button className='candidate-sidebar__select'>
                                Отчёты
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

