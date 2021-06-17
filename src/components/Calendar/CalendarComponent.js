import React, { useState, useEffect } from 'react';
import style from './CalendarComponent.module.css';
import ellipse from '../../images/ellipse.png';
import rectangle from '../../images/rectangle__calendar.png';
import moment from 'moment';
import calendarHelper from './calendarHelper';
import 'moment/locale/ru';

const CalendarComponent = () => {
  const [value, setValue] = useState(moment());
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    setCalendar(calendarHelper(value));
  }, [value]);

  function isSelected(day) {
    return value.isSame(day, 'day');
  }

  // function beforeToday(day) {
  //   return day.isBefore(new Date(), 'day');
  // }

  // function isToday(day) {
  //   return day.isSame(new Date(), 'day');
  // }
  // const month = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December',
  // ];

  function currentMonth(day) {
    return day.format('MMMM');
  }

  function currentDay(day) {
    return day.format('D');
  }

  function prevMonth() {
    return value.clone().subtract(1, 'month');
  }

  function nextMonth() {
    return value.clone().add(1, 'month');
  }

  function thisMonth() {
    return value.isSame(new Date(), 'month');
  }

  console.log(thisMonth());

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
              <button onClick={() => setValue(day)} key={day} className={`${isSelected(day) ? style.selected : ''}`}>
                {currentDay(day)} {currentMonth(day)}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
