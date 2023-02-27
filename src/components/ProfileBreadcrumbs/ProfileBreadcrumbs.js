import React from 'react'
import {Link} from "react-router-dom";

import './profileBreadcrumbs.scss'

export const ProfileBreadcrumbs = ({ links }) => {
    return (
        <div className='profileBreadcrumbs'>
            {links.map((link, index) => {
                return <Link key={index} to={link.link}>{link.name}</Link>
            })

            }
        </div>
    )
}
