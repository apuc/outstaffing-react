import React, { useState, useEffect } from 'react';
import style from './ReportForm.module.css';
import calendarIcon from '../../images/calendar_icon.png';
import ellipse from '../../images/ellipse.png';
import remove from '../../images/remove.png';
import addIcon from '../../images/addIcon.png';
import { currentMonthAndDay } from '../Calendar/calendarHelper';

const ReportForm = () => {
  let count = 1;

  const [formId, setFormId] = useState([count]);

  console.log('CCCCCCCCCC', count);

  const addId = () => {
    count++;
  };

  return (
    <section className="reportForm">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className={style.reportForm__block}>
              <div className={style.reportForm__blockTitle}>
                <h2>Добавить отчет</h2>
                <h3>Дата заполнения отчета:</h3>
              </div>
              <div className={style.reportForm__blockImg}>
                <img className={style.calendarIcon} src={calendarIcon} alt="" />
                {currentMonthAndDay()}
              </div>
              <div className={style.reportForm__tasks}>
                <img src={ellipse} alt="" />
                <span>Какие задачи были выполнены?</span>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-8">
            <div className={style.reportForm__text}>
              <p className={style.text1}>Краткое описание задачи</p>
              <p className={style.text2}>Количество часов</p>
            </div>

            {formId.map((id) => (
              <form id={id} key={id} className={style.reportForm__form}>
                <span>{id}.</span>
                <div className={style.input__text}>
                  <input name="text" type="text" />
                </div>
                <div className={style.input__number}>
                  <input name="number" type="number" />
                </div>
                <img src={remove} alt="" />
              </form>
            ))}
            {/* <form id="1" className={style.reportForm__form}>
              <span>1.</span>
              <div className={style.input__text}>
                <input name="text" type="text" />
              </div>
              <div className={style.input__number}>
                <input name="number" type="number" />
              </div>
              <img src={remove} alt="" />
            </form> */}

            <div className={style.reportForm__formAdd}>
              <img onClick={() => addId()} src={addIcon} alt="" />
              <span>Добавить еще </span>
            </div>
          </div>
          <div className="col-4"></div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className={style.reportForm__inptuBox}>
              <div className={style.reportForm__tasks}>
                <img src={ellipse} alt="" />
                <span>Какие сложности возникли?</span>
              </div>
              <input type="text" />
              <div className={style.reportForm__tasks}>
                <img src={ellipse} alt="" />
                <span>Что планируется сделать завтра?</span>
              </div>
              <input type="text" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className={style.reportForm__footer}>
              <button className={style.reportForm__footer__btn} type="submit">
                Отправить
              </button>
              <p className={style.reportForm__footer__text}>
                Всего за день : <span>60 часов</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportForm;
