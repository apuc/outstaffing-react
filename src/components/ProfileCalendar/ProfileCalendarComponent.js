import React, { useState, useEffect } from 'react'
import ellipse from '../../images/ellipse.png'
import rectangle from '../../images/rectangle__calendar.png'
import calendarIcon from '../../images/calendar_icon.png'
import moment from 'moment'
import {calendarHelper, currentMonth, currentMonthAndDay, getReports} from '../Calendar/calendarHelper'
import {setReportDate, setRequestDate} from '../../redux/reportSlice';
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

import 'moment/locale/ru'
import './../Calendar/calendarComponent.scss'

export const ProfileCalendarComponent = React.memo(({value, setValueHandler, reports, totalHours}) => {
    const dispatch = useDispatch();
    const [currentDay] = useState(moment())
    const [calendar, setCalendar] = useState([])
    const [month, setMonth] = useState('');

    useEffect(() => {
        setCalendar(calendarHelper(value))
    }, [value])

    useEffect(() => {
        setMonth(value.format('MMMM'))
    }, [month]);

    function isToday(day) {
        return day.isSame(new Date(), 'day')
    }

    function correctDay(day) {
        if (day < 10) {
            return `0${day}`
        } return day
    }

    function dayStyles(day) {
        if (currentDay < day) return `block`
        for (const date of reports) {
            if (`${new Date(day).getFullYear()}-${correctDay(new Date(day).getMonth() + 1)}-${correctDay(new Date(day).getDate())}` === date.created_at) {
                return `before`
            }
        }
        if (day.day() === 6 || day.day() === 0) return `selected`
        if (isToday(day)) return `today`
        return 'pass'
    }

    function correctRoute(day) {
        for (const date of reports) {
            if (`${new Date(day).getFullYear()}-${correctDay(new Date(day).getMonth() + 1)}-${correctDay(new Date(day).getDate())}` === date.created_at) {
                return `../view`
            }
        }
        return '../../report'
    }

    function prevMonth() {
        return value.clone().subtract(1, 'month')
    }

    function nextMonth() {
        return value.clone().add(1, 'month');
    }

    return (
        <div className='calendar-component'>
            <div className='calendar-component__header'>
                <h3>Мои отчеты</h3>
                <div className='calendar-component__header-box'>
                    <img src={ellipse} alt='' />
                    <span onClick={() => {
                        setValueHandler(prevMonth())
                        dispatch(setRequestDate(getReports(prevMonth())))
                    }}>
                        {prevMonth().format('MMMM')}
                    </span>
                </div>
                <div className='calendar-component__header-box'>
                    <span>{value.format('YYYY')}</span>
                </div>
                <div className='calendar-component__header-box'>
                    <img src={ellipse} alt='' />
                    <span onClick={() => {
                        setValueHandler(nextMonth())
                        dispatch(setRequestDate(getReports(nextMonth())))

                    }}>
                        {nextMonth().format('MMMM')}
                    </span>
                </div>
            </div>

            <div className='calendar-component__rectangle'>
                <img src={rectangle} alt='' />
            </div>

            <div className='calendar-component__body'>
                <div>
                    <p>Пн</p>
                    <p>Вт</p>
                    <p>Ср</p>
                    <p>Чт</p>
                    <p>Пт</p>
                    <p>Сб</p>
                    <p>Вс</p>
                </div>

                <div className='calendar-component__form'>
                    {calendar.map((week) =>
                        week.map((day) => (
                                <button
                                    onClick={() => {
                                        dispatch(setReportDate(day))
                                    }}
                                    key={day}
                                    className={dayStyles(day)}
                                    name={day.format('dddd')}
                                    id='btn'
                                >
                                    <Link to={correctRoute(day)}>
                                        <img className={'calendar__icon'} src={calendarIcon} alt='' />
                                        {currentMonthAndDay(day)}
                                    </Link>
                                </button>
                        ))
                    )}
                </div>
            </div>
            <p className='calendar__hours'>
                {month} : <span> {totalHours} часов </span>
            </p>
        </div>
    )
})

