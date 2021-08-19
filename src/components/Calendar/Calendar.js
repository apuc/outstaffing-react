import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentCandidate } from '../../redux/outstaffingSlice';
import { Link } from 'react-router-dom';
import style from './Calendar.module.css';
import calendarMale from '../../images/medium_male.png';
import rectangle from '../../images/rectangle_secondPage.png';
import CalendarComponent from './CalendarComponent';
import { currentMonth } from './calendarHelper';
import { Footer } from '../Footer/Footer';

const Calendar = () => {
  const candidateForCalendar = useSelector(selectCurrentCandidate);

  const [month, setMonth] = useState('');

  useEffect(() => {
    setMonth(currentMonth);
  }, [month]);

  const { name, skillsName, photo } = candidateForCalendar;

  const abbreviatedName = name && name.substring(0, name.lastIndexOf(' '));

  return (
    <section className={style.calendar}>
        <div className="row">
          <h2 className={style.calendar__title}>
            Добрый день, <span>Александр !</span>
          </h2>
          <div className="col-12 col-xl-12 d-flex justify-content-between align-items-center flex-column flex-sm-row">
            <div className={style.calendarHeader__info}>
              <img className={style.calendarHeader__info__img} src={photo} alt="img" />
              <h3 className={style.calendarHeader__info__name}>{abbreviatedName}</h3>
            </div>
            <div className={style.calendarHeader__title}>
              <h3 className={style.calendarHeader__title__text}>{skillsName} разработчик</h3>
              <img className={style.calendarHeader__title__img} src={rectangle} alt="img" />
            </div>
            <div>
              <Link to="/report">
                <button className={style.calendarHeader__btn}>Заполнить отчет за день</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-xl-12">
            <CalendarComponent />
            <p className={style.calendarFooter__text}>
              {month} : <span> 60 часов </span>
            </p>
          </div>
        </div>
        <Footer />
    </section>
  );
};

export default Calendar;
