import React, { useState, useEffect } from 'react'
// import ellipse from '../../images/ellipse.png'
import rectangle from '../../images/rectangle__calendar.png'
import calendarIcon from '../../images/calendar_icon.png'
import moment from 'moment'
import 'moment/locale/ru'
import { calendarHelper, currentMonthAndDay} from '../Calendar/calendarHelper'
import { setReportDate } from '../../redux/reportSlice';
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

import './../Calendar/calendarComponent.scss'

export const ProfileCalendarComponent = ({reportsDates}) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(moment())
    const [calendar, setCalendar] = useState([])

    useEffect(() => {
        setCalendar(calendarHelper(value))
    }, [value])

    // function beforeToday(day) {
    //     return day.isBefore(new Date(), 'day')
    // }

    function isToday(day) {
        return day.isSame(new Date(), 'day')
    }

    function dayStyles(day) {
        if (value < day) return ``
        if (day.day() === 6 || day.day() === 0) return `selected`
        function correctDay(day) {
            if (day < 10) {
                return `0${day}`
            } return day
        }
        for (const date of reportsDates) {
            if (`${new Date(day).getFullYear()}-${new Date(day).getMonth() + 1}-${correctDay(new Date(day).getDate())}` === date.date) {
                return `before`
            }
        }
        if (isToday(day)) return `today`
        return 'pass'
    }

    // function prevMonth() {
    //     return value.clone().subtract(1, 'month')
    // }
    //
    // function nextMonth() {
    //     return value.clone().add(1, 'month');
    // }

    return (
        <div className='calendar-component'>
            <div className='calendar-component__header'>
                <h3>Мои отчеты</h3>
                {/*<div className='calendar-component__header-box'>*/}
                {/*    <img src={ellipse} alt='' />*/}
                {/*    <span onClick={() => setValue(prevMonth())}>{prevMonth().format('MMMM')}</span>*/}
                {/*</div>*/}
                {/*<div className='calendar-component__header-box'>*/}
                {/*    <img src={ellipse} alt='' />*/}
                {/*    <span onClick={() => setValue(nextMonth())}>{nextMonth().format('MMMM')}</span>*/}
                {/*</div>*/}
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
                            <Link to='/profile/report' key={day}>
                                <button
                                    onClick={() => {
                                        dispatch(setReportDate(day))
                                    }}
                                    key={day}
                                    className={dayStyles(day)}
                                    name={day.format('dddd')}
                                    id='btn'
                                >
                                    <img className={'calendar__icon'} src={calendarIcon} alt='' />
                                    {currentMonthAndDay(day)}
                                </button>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

