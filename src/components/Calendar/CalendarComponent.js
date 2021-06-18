import React, { useState, useEffect } from 'react';
import style from './CalendarComponent.module.css';
import ellipse from '../../images/ellipse.png';
import rectangle from '../../images/rectangle__calendar.png';
import calendarIcon from '../../images/calendar_icon.png';
import moment from 'moment';
import 'moment/locale/ru';
import calendarHelper from './calendarHelper';

const CalendarComponent = () => {
  const [value, setValue] = useState(moment());
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    setCalendar(calendarHelper(value));
  }, [value]);

  function beforeToday(day) {
    return day.isBefore(new Date(), 'day');
  }

  function isToday(day) {
    return day.isSame(new Date(), 'day');
  }

  function dayStyles(day) {
    if (beforeToday(day)) return `${style.before}`;
    if (isToday(day)) return `${style.today}`;
    if (day.day() === 6 || day.day() === 0) return `${style.selected}`;
    return '';
  }

  function currentMonth(day) {
    return day.format('D MMMM');
  }

  function prevMonth() {
    return value.clone().subtract(1, 'month');
  }

  function nextMonth() {
    return value.clone().add(1, 'month');
  }

  //////////////////////////////////////////////////////////////////////////

  return (
    <div className={style.CalendarComponent}>
      <div className={style.CalendarComponent__header}>
        <h3>Мои отчеты</h3>
        <div className={style.CalendarComponent__header__box}>
          <img src={ellipse} alt="" />
          <span onClick={() => setValue(prevMonth())}>Май</span>
        </div>
        <div className={style.CalendarComponent__header__box}>
          <img src={ellipse} alt="" />
          <span onClick={() => setValue(nextMonth())}>Апрель</span>
        </div>
      </div>

      <div className={style.CalendarComponent__rectangle}>
        <img src={rectangle} alt="" />
      </div>

      <div className={style.CalendarComponent__body}>
        <div>
          <p>ПН</p>
          <p>ВТ</p>
          <p>СР</p>
          <p>ЧТ</p>
          <p>ПТ</p>
          <p>СБ</p>
          <p>ВС</p>
        </div>

        <div className={style.CalendarComponent__form}>
          {calendar.map((week) =>
            week.map((day) => (
              <button
                onClick={() => setValue(day)}
                key={day}
                className={dayStyles(day)}
                name={day.format('dddd')}
                id="btn"
              >
                <img className={style.calendarIcon} src={calendarIcon} alt="" />
                {currentMonth(day)}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
