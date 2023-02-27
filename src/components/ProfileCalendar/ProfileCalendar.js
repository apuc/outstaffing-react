import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {getReports} from '../Calendar/calendarHelper'
import {Link, Navigate} from 'react-router-dom'
import moment from "moment";

import {ProfileCalendarComponent} from "./ProfileCalendarComponent";
import {Loader} from "../Loader/Loader";
import {ProfileHeader} from "../ProfileHeader/ProfileHeader";
import {ProfileBreadcrumbs} from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs"
import { Footer } from '../Footer/Footer'

import {urlForLocal} from "../../helper";

import {apiRequest} from "../../api/request";
import { getProfileInfo } from '../../redux/outstaffingSlice'
import {getRequestDates, setReportDate, setRequestDate} from "../../redux/reportSlice";

import 'moment/locale/ru'
import './profileCalendar.scss'


export const ProfileCalendar = () => {
    if(localStorage.getItem('role_status') === '18') {
        return <Navigate to="/profile" replace/>
    }
    const dispatch = useDispatch();
    const profileInfo = useSelector(getProfileInfo)
    const requestDates = useSelector(getRequestDates)
    const [value, setValue] = useState(moment())
    const [reports, setReports] = useState([]);
    const [totalHours, setTotalHours] = useState(0);
    const [loader, setLoader] = useState(true)

    function setValueHandler (value) {
        setValue(value)
    }

    useEffect(() => {
        dispatch(setRequestDate(getReports(moment())))
    },[]);

    useEffect( () => {
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

    return (
        <div className='profile__calendar'>
            <ProfileHeader/>
            <div className='container'>
                <ProfileBreadcrumbs links={[{name: 'Главная', link: '/profile'},{name: 'Ваша отчетность', link: '/profile/calendar'}]} />
                <h2 className='summary__title'>Ваши отчеты</h2>
                <div className='summary__info'>
                    <div className='summary__person'>
                        <img src={urlForLocal(profileInfo.photo)} className='summary__avatar'  alt='avatar'/>
                        <p className='summary__name'>{profileInfo.fio}, {profileInfo.specification} разработчик</p>
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
                            <ProfileCalendarComponent setValueHandler={setValueHandler} value={value} reports={reports} totalHours={totalHours} />
                        </div>
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
};
