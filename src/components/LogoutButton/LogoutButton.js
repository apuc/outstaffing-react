import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader/Loader';
import { auth } from '../../redux/outstaffingSlice';

import './logoutButton.css'

export const LogoutButton = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const dispatch = useDispatch();
    return (
        <div className='logout-button'>
            <button onClick={()=>{setIsLoggingOut(true); localStorage.clear(); dispatch(auth(false)); setIsLoggingOut(false); }}>
            {
            isLoggingOut ? <Loader /> : 'Выйти'
            } </button>
        </div>
    )
}