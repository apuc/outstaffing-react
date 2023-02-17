import React, {useEffect, useState} from 'react';
import {useNavigate, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Loader} from '../Loader/Loader'
import {apiRequest} from "../../api/request";
import {auth, getProfileInfo, setProfileInfo} from "../../redux/outstaffingSlice";
import {getRole} from "../../redux/roleSlice";

import {urlForLocal} from "../../helper";

import './profileHeader.scss'




export const ProfileHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const userRole = useSelector(getRole);
  const profileInfo = useSelector(getProfileInfo);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    apiRequest(`/profile/${localStorage.getItem('cardId')}`)
        .then((profileInfo) =>
            dispatch(setProfileInfo(profileInfo))
        );

  }, [dispatch]);

  const handler = () => {
    setIsLoggingOut(true);
    localStorage.clear();
    dispatch(auth(false));
    setIsLoggingOut(false);
    navigate(userRole === 'ROLE_DEV' ? '/authdev' : '/auth')
  };

  return (
      <header className='profileHeader'>
        <div className='profileHeader__head'>
          <div className='profileHeader__container'>
            <h2 className='profileHeader__title'>itguild.<span>для разработчиков</span></h2>
            <button onClick={handler} className='profileHeader__logout'>
              {isLoggingOut ? <Loader/> : 'Выйти'}
            </button>
          </div>
        </div>
        <div className='profileHeader__info'>
          <div className='profileHeader__container'>
            <nav className='profileHeader__nav'>
              <NavLink end to={'/profile/summary'}>Резюме</NavLink>
              <NavLink end to={'/profile'}>Отчетность</NavLink>
              <NavLink end to={'/profile/tracker'}>Трекер</NavLink>
              <NavLink end to={'/profile/payouts'}>Выплаты</NavLink>
              <NavLink end to={'/profile/settings'}>Настройки</NavLink>
            </nav>

            <div className='profileHeader__personalInfo'>
              <h3 className='profileHeader__personalInfoName'>{profileInfo?.fio}</h3>
              <NavLink end to={'/profile'}>
                <img src={profileInfo.photo ? urlForLocal(profileInfo.photo) : ""} className='profileHeader__personalInfoAvatar' alt='avatar'/>
              </NavLink>
            </div>
          </div>
        </div>
      </header>
  )
};
