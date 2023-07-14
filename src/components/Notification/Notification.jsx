import React from "react";
import {useDispatch, useSelector} from "react-redux";

import { closeNotification, getNotification } from "@redux/outstaffingSlice";

import close from "assets/icons/closeProjectPersons.svg";
import copy from "assets/icons/copyNotification.svg";
import error from "assets/icons/errorNotification.svg";
import archive from "assets/icons/archiveNotification.svg";
import success from "assets/icons/successNotification.svg"

const images = {
    archive: archive,
    error: error,
    copy: copy,
    success: success
}

import './notification.scss'

export const Notification = () => {
    const dispatch = useDispatch();
    const notificationInfo = useSelector(getNotification)
    return (
        <div className='notification'>
            <div className='notification__info'>
                <img src={images[notificationInfo.type]} alt='img' />
                <h2>{notificationInfo.text}</h2>
            </div>
            <img onClick={() => dispatch(closeNotification())}
                 className='notification__close' src={close} alt='close' />
        </div>
    )
}

export default Notification
