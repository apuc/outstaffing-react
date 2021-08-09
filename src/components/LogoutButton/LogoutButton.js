import React from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../redux/outstaffingSlice';

import './logoutButton.css'

export const LogoutButton = () => {
    const dispatch = useDispatch();
    return (
        <div className='logout-button' onClick={()=>{localStorage.clear(); dispatch(auth(false));}}>
            <button>Выйти</button>
        </div>
    )
}