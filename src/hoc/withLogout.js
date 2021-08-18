import React from 'react';
import { LogoutButton } from '../components/LogoutButton/LogoutButton';

export const WithLogout = (props) => {
    return (
        <div className='container'>
            {props.children}
            <LogoutButton />
        </div>
    )
}