import React, {useEffect, useState} from 'react';
import {useNavigate, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Loader} from '../Loader/Loader'

import {auth, getProfileInfo, setProfileInfo} from "../../redux/outstaffingSlice";
import {getRole} from "../../redux/roleSlice";



import './profileHeader.scss'
import {useRequest} from "../../hooks/useRequest";


export const ProfileHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {apiRequest} = useRequest();

  const userRole = useSelector(getRole);
  const profileInfo = useSelector(getProfileInfo);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    apiRequest(`/api/profile/${localStorage.getItem('cardId')}`)
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
              <NavLink to={'/summary'}>Резюме</NavLink>
              <NavLink to={'/profile'}>Отчетность</NavLink>
              <NavLink to={'/profile'}>Трекер</NavLink>
              <NavLink to={'/profile'}>Выплаты</NavLink>
              <NavLink to={'/profile'}>Настройки</NavLink>
            </nav>

            <div className='profileHeader__personalInfo'>
              <h3 className='profileHeader__personalInfoName'>{profileInfo.fio}</h3>
              <img src={profileInfo.photo} className='profileHeader__personalInfoAvatar' alt='avatar'/>
            </div>
          </div>
        </div>
      </header>
  )
};
