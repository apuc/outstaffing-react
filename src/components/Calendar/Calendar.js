import React from 'react';
import style from './Calendar.module.css';
import calendarMale from '../../images/medium_male.png';

const Calendar = () => {
  return (
    <section className={style.calendar}>
      <div className="container">
        <div className="row">
          <h2 className={style.calendar__title}>
            Добрый день, <span>Александр!</span>
          </h2>
          <div className="col-xl-12">
            <div className={style.calendarHeader__info}>
              <img className={style.calendarHeader__info__img} src={calendarMale} alt="img" />
              <h3 className={style.calendarHeader__info__name}>header</h3>
            </div>
            <div className={style.calendarHeader__title}></div>
            <div className={style.calendarHeader__btn}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calendar;
