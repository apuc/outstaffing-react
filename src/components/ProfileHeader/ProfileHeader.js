import React, {useEffect, useState} from 'react';
import {useNavigate, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Loader} from '../Loader/Loader'
import {apiRequest} from "../../api/request";
import {auth, getProfileInfo, setProfileInfo} from "../../redux/outstaffingSlice";
import {getRole} from "../../redux/roleSlice";

import {urlForLocal} from "../../helper";

import './profileHeader.scss'
import { Navigation } from '../Navigation/Navigation';




export const ProfileHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const userRole = useSelector(getRole);
  const [user] = useState(localStorage.getItem('role_status') === '18' ? 'partner' : 'developer')


  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('role_status') === '18') {
      return
    }
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
            <NavLink to={'/profile'} className='profileHeader__title'>itguild.
              <span>
                {user === 'developer' ?
                  'для разработчиков' :
                  'для партнеров'
                }
              </span>
            </NavLink>
            <button onClick={handler} className='profileHeader__logout'>
              {isLoggingOut ? <Loader/> : 'Выйти'}
            </button>
          </div>
        </div>
      </header>
  )
};
