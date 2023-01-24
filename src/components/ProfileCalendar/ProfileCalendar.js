import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {currentMonth, getReports} from '../Calendar/calendarHelper'
import { Link } from 'react-router-dom'
import moment from "moment";

import {ProfileCalendarComponent} from "./ProfileCalendarComponent";
import {Loader} from "../Loader/Loader";
import {ProfileHeader} from "../ProfileHeader/ProfileHeader";
import { Footer } from '../Footer/Footer'

import {useRequest} from "../../hooks/useRequest";
import { getProfileInfo } from '../../redux/outstaffingSlice'
import {setReportDate} from "../../redux/reportSlice";

import './profileCalendar.scss'

export const ProfileCalendar = () => {
    const dispatch = useDispatch();
    const profileInfo = useSelector(getProfileInfo);
    const [month, setMonth] = useState('');
    const [reports, setReports] = useState([]);
    const [totalHours, setTotalHours] = useState(0);
    const [requestDates, setRequestDates] = useState('');
    const [loader, setLoader] = useState(false)

    const {apiRequest} = useRequest();

    useEffect(() => {
        setRequestDates(getReports(moment()))
    });

    useEffect(async () => {
        setLoader(true)
        if (!requestDates) {
            return
        }
        apiRequest(`/reports/reports-by-date?${requestDates}&user_card_id=${localStorage.getItem('cardId')}`)
            .then((reports) => {
                let spendTime = 0;
                for (const report of reports) {
                    report.task.map((task) => {
                        if(task.hours_spent) {
                            spendTime += Number(task.hours_spent)
                        }
                    })
                }
                setTotalHours(spendTime);
                setReports(reports)
                setLoader(false)
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
                    <Link to='/report'>
                        <button className="calendar__btn" onClick={() => {
                            dispatch(setReportDate(''))
                        }}>Заполнить отчет за день</button>
                    </Link>
                </div>
                {loader ?
                    <Loader height={80}  width={80} />
                    :
                    <div className='row'>
                        <div className='col-12 col-xl-12'>
                            <ProfileCalendarComponent reportsDates={reports} />
                            <p className='calendar__hours'>
                                {month} : <span> {totalHours} часов </span>
                            </p>
                        </div>
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
};
