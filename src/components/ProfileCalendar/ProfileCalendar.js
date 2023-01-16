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
import { Footer } from '../Footer/Footer'

import './profileCalendar.scss'
import {useRequest} from "../../hooks/useRequest";
export const ProfileCalendar = () => {
    const dispatch = useDispatch();
    const profileInfo = useSelector(getProfileInfo);
    const [month, setMonth] = useState('');
    const [reports, setReports] = useState([]);
    const [totalHours, setTotalHours] = useState(0);
    const [value, setValue] = useState(moment());
    const [requestDates, setRequestDates] = useState('');

    const {apiRequest} = useRequest();

    useEffect(() => {
        setRequestDates(getReports(value))
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
        <section className='calendar'>
            <div className='profile__calendar'>
                <Link className='calendar__back' to={`/profile`}>
                    <div><img src={arrow} alt=''/>Вернуться назад</div>
                </Link>
                <h2 className='calendar__profile'>
                    Добрый день, <span>{profileInfo.fio}</span>
                </h2>
                <div className='col-12 col-xl-12 d-flex justify-content-between align-items-center flex-column flex-sm-row'>
                    <div className='calendar__info'>
                        <img className='calendar__info-img' src={profileInfo.photo} alt='img' />
                        <h3 className='calendar__info-name'>{}</h3>
                    </div>
                    <div className='calendar__title'>
                        <h3 className='calendar__title-text'>{profileInfo.position_name}</h3>
                        <img className='calendar__title-img' src={rectangle} alt='img' />
                    </div>
                    <div>
                        <Link to='/report'>
                            <button className='calendar__btn' onClick={() => {
                                dispatch(setReportDate(value))
                            }}>Заполнить отчет за день</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-12 col-xl-12'>
                    <ProfileCalendarComponent reportsDates={reports} />
                    <p className='calendar__hours'>
                        {month} : <span> {totalHours} часов </span>
                    </p>
                </div>
            </div>
            <Footer />
        </section>
    )
};
