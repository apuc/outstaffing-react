import React from 'react';
import {LogoutButton} from "../LogoutButton/LogoutButton";

export const ProfileHeader = () => {
    return(
        <header className='profileHeader'>
            <h2 className='profileHeader__title'>Аутстаффинг <span>Personal Profile</span></h2>
            <LogoutButton/>
        </header>
    )
}
