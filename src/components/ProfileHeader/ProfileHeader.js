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
  const [user] = useState(localStorage.getItem('role_status') === '18' ? 'partner' : 'developer')
  const [navInfo] = useState({
    developer: [
      {
        path: '/summary',
        name: 'Резюме'
      },
      {
        path: '/calendar',
        name: 'Отчетность'
      },
      {
        path: '/tracker',
        name: 'Трекер'
      },
      {
        path: '/payouts',
        name: 'Выплаты'
      },
      {
        path: '/settings',
        name: 'Настройки'
      },
    ],
    partner: [
      {
        path: '/requests',
        name: 'Запросы'
      },
      {
        path: '/employees',
        name: 'Персонал'
      },
      {
        path: '/tracker',
        name: 'Трекер'
      },
      {
        path: '/treaties',
        name: 'Договора'
      },
      {
        path: '/settings',
        name: 'Настройки'
      },
    ]
  })

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
        <div className='profileHeader__info'>
          <div className='profileHeader__container'>
            <nav className='profileHeader__nav'>
              {
                navInfo[user].map((link, index) => {
                  return <NavLink key={index} end to={`/profile${link.path}`}>{link.name}</NavLink>
                })
              }
            </nav>

            <div className='profileHeader__personalInfo'>
              <h3 className='profileHeader__personalInfoName'>
                {user === 'developer' ?
                    profileInfo?.fio :
                    ''
                }
              </h3>
              <NavLink end to={'/profile'}>
                <img src={profileInfo.photo ? urlForLocal(profileInfo.photo) : ""} className='profileHeader__personalInfoAvatar' alt='avatar'/>
              </NavLink>
            </div>
          </div>
        </div>
      </header>
  )
};
