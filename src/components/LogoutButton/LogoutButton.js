import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Loader} from '../Loader/Loader'
import {auth} from '../../redux/outstaffingSlice'
import {getRole} from '../../redux/roleSlice'

import './logoutButton.scss'

export const LogoutButton = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch = useDispatch();
  const userRole = useSelector(getRole);
  const navigate = useNavigate();

  return (
      <button
          className='logout-button'
          onClick={() => {
            setIsLoggingOut(true);
            localStorage.clear();
            dispatch(auth(false));
            setIsLoggingOut(false);
            navigate(userRole === 'ROLE_DEV' ? '/authdev' : '/auth')
          }}
      >
        {isLoggingOut ? <Loader/> : 'Выйти'}
      </button>
  )
};
