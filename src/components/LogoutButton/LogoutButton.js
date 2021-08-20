import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../Loader/Loader';
import { auth } from '../../redux/outstaffingSlice';
import { getRole } from '../../redux/roleSlice';

import './logoutButton.css'

export const LogoutButton = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const dispatch = useDispatch();
    const userRole = useSelector(getRole);
    const history = useHistory();

    return (
        <div className='logout-button'>
            <button onClick={()=>{
                setIsLoggingOut(true); 
                localStorage.clear(); 
                dispatch(auth(false)); 
                setIsLoggingOut(false); 
                history.push(userRole === 'ROLE_DEV' ? '/authdev' : '/auth') 
            }}>

            {
            isLoggingOut ? <Loader /> : 'Выйти'
            } </button>
        </div>
    )
}