import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useLogout} from "../../hooks/useLogout";

import {Loader} from '../Loader/Loader'

import {getRole} from '../../redux/roleSlice'

import './logoutButton.scss'


export const LogoutButton = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const userRole = useSelector(getRole);
  const navigate = useNavigate();
  const {logout} = useLogout();

  return (
      <button
          className='logout-button'
          onClick={() => {
            setIsLoggingOut(true);
            logout();
            setIsLoggingOut(false);
            navigate(userRole === 'ROLE_DEV' ? '/authdev' : '/auth')
          }}
      >
        {isLoggingOut ? <Loader/> : 'Выйти'}
      </button>
  )
};
