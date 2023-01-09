import React, {useEffect, useState} from 'react';
import {auth, getProfileInfo, setProfileInfo} from "../../redux/outstaffingSlice";
import {useDispatch, useSelector} from "react-redux";
import {Loader} from '../Loader/Loader'
import {getRole} from "../../redux/roleSlice";
import {useHistory, NavLink} from "react-router-dom";
import {fetchGet} from "../../server/server";

import './profileHeader.scss'

export const ProfileHeader = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const dispatch = useDispatch();
    const userRole = useSelector(getRole);
    const profileInfo = useSelector(getProfileInfo)
    const history = useHistory();

    useEffect(() => {
        fetchGet({
            link: `${process.env.REACT_APP_API_URL}/api/profile/${localStorage.getItem('cardId')}`,
        }).then((profileInfo) => {
            dispatch(setProfileInfo(profileInfo))
        })
    }, [])
    return(
        <header className='profileHeader'>
            <div className='profileHeader__head'>
                <div className='profileHeader__container'>
                    <h2 className='profileHeader__title'>itguild.<span>для разработчиков</span></h2>
                    <button onClick={() => {
                        setIsLoggingOut(true);
                        localStorage.clear();
                        dispatch(auth(false));
                        setIsLoggingOut(false);
                        history.push(userRole === 'ROLE_DEV' ? '/authdev' : '/auth')
                    }}
                        className='profileHeader__logout'>
                        {isLoggingOut ? <Loader/> : 'Выйти'}{' '}
                    </button>
                </div>
            </div>
            <div className='profileHeader__info'>
                <div className='profileHeader__container'>
                    <nav className='profileHeader__nav'>
                        <NavLink to={'/summary'}>Резюме</NavLink>
                        <NavLink to={'/profile'}>Отчетность</NavLink>
                        <a>Трекер</a>
                        <a>Выплаты</a>
                        <a>Настройки</a>
                    </nav>
                    <div className='profileHeader__personalInfo'>
                        <h3 className='profileHeader__personalInfoName'>{profileInfo.fio}</h3>
                        <img src={profileInfo.photo} className='profileHeader__personalInfoAvatar' />
                    </div>
                </div>
            </div>
        </header>
    )
}
