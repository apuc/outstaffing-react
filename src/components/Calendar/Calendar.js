import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {selectCurrentCandidate} from '../../redux/outstaffingSlice'
import {Link} from 'react-router-dom'

import CalendarComponent from './CalendarComponent'
import {currentMonth} from './calendarHelper'
import {Footer} from '../Footer/Footer'

import rectangle from '../../images/rectangle_secondPage.png'

import './calendar.scss'

const Calendar = ({onSelect}) => {

  const candidateForCalendar = useSelector(selectCurrentCandidate);

  const [month, setMonth] = useState('');

  useEffect(() => {
    setMonth(currentMonth)
  }, [month]);

  const {name, skillsName, photo} = candidateForCalendar;

  const abbreviatedName = name && name.substring(0, name.lastIndexOf(' '));

  return (
      <section className='calendar'>
        <div className='row'>
          <h2 className='calendar__profile'>
            Добрый день, <span>Александр !</span>
          </h2>
          <div className='col-12 col-xl-12 d-flex justify-content-between align-items-center flex-column flex-sm-row'>
            <div className='calendar__info'>
              <img className='calendar__info-img' src={photo} alt='img'/>
              <h3 className='calendar__info-name'>{abbreviatedName}</h3>
            </div>
            <div className='calendar__title'>
              <h3 className='calendar__title-text'>{skillsName} разработчик</h3>
              <img className='calendar__title-img' src={rectangle} alt='img'/>
            </div>
            <div>
              <Link to='/report'>
                <button className='calendar__btn'>Заполнить отчет за день</button>
              </Link>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-12 col-xl-12'>
            <CalendarComponent onSelect={onSelect}/>
            <p className='calendar__hours'>
              {month} : <span> 60 часов </span>
            </p>
          </div>
        </div>
        <Footer/>
      </section>
  )
};

export default Calendar
