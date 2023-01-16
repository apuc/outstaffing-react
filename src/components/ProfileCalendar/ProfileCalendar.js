import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getProfileInfo } from '../../redux/outstaffingSlice'
import { setReportDate } from '../../redux/reportSlice';
import arrow from "../../images/right-arrow.png";
import { Link } from 'react-router-dom'
import moment from "moment";
import rectangle from '../../images/rectangle_secondPage.png'
import {currentMonth, getReports} from '../Calendar/calendarHelper'
import {ProfileCalendarComponent} from "./ProfileCalendarComponent";
import { ProfileHeader } from "../Profile/ProfileHeader";
import { Footer } from '../Footer/Footer'

import './profileCalendar.scss'
import {useRequest} from "../../hooks/useRequest";
export const ProfileCalendar = () => {
    const dispatch = useDispatch();
    const profileInfo = useSelector(getProfileInfo);
    const [month, setMonth] = useState('');
    const [reports, setReports] = useState([]);
    const [totalHours, setTotalHours] = useState(0);
    const [requestDates, setRequestDates] = useState('');

    const {apiRequest} = useRequest();

    useEffect(() => {
        setRequestDates(getReports(moment()))
    });

    useEffect(async () => {
        if (!requestDates) {
            return
        }
        apiRequest(`/reports/reports-by-date?${requestDates}&user_id=${localStorage.getItem('id')}`)
            .then((reports) => {
                let spendTime = 0;
                reports.map((report) => {
                    if (report.spendTime) {
                        spendTime += Number(report.spendTime)
                    }
                });
                setTotalHours(spendTime);
                setReports(reports)
            })
    }, [requestDates]);

    useEffect(() => {
        setMonth(currentMonth)
    }, [month]);

    return (
        <div className='profile__calendar'>
            <ProfileHeader/>
            <div className='container'>
                <h2 className='summary__title'>Ваши отчеты</h2>
                <div className='summary__info'>
                    <div className='summary__person'>
                        <img src={profileInfo.photo} className='summary__avatar'  alt='avatar'/>
                        <p className='summary__name'>{profileInfo.fio} {profileInfo.specification}</p>
                    </div>
                    <Link to='/profile/report'>
                        <button className="calendar__btn">Заполнить отчет за день</button>
                    </Link>
                </div>
                <div className='row'>
                    <div className='col-12 col-xl-12'>
                        <ProfileCalendarComponent reportsDates={reports} />
                        <p className='calendar__hours'>
                            {month} : <span> {totalHours} часов </span>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
};
