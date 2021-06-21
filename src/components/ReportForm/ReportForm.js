import React from 'react';
import style from './ReportForm.module.css';
import calendarIcon from '../../images/calendar_icon.png';
import ellipse from '../../images/ellipse.png';

const ReportForm = () => {
  return (
    <section className="reportForm">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className={style.reportForm__header}>
              <div className={style.reportForm__headerTitle}>
                <h2>Добавить отчет</h2>
                <h3>Дата заполнения отчета:</h3>
              </div>
              <div className={style.reportForm__headerImg}>
                <img className={style.calendarIcon} src={calendarIcon} alt="" />
                15 июня
              </div>
              <div className={style.reportForm__tasks}>
                <img src={ellipse} alt="" />
                <span>Какие задачи были выполнены?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportForm;
