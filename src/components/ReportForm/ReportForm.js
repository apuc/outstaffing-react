import React, { useState } from 'react';
import style from './ReportForm.module.css';
import calendarIcon from '../../images/calendar_icon.png';
import ellipse from '../../images/ellipse.png';
import remove from '../../images/remove.png';
import addIcon from '../../images/addIcon.png';
import { currentMonthAndDayReportPage } from '../Calendar/calendarHelper';
import InputsComponent from '../InputsComponent/InputsComponent';

const ReportForm = () => {
  const [inputs, setInputs] = useState([1]);

  const addInput = () => {
    const lastElement = inputs[inputs.length - 1];

    setInputs((prev) => [...prev, lastElement + 1]);
  };

  const deleteInput = (id) => {
    if (id !== 1) {
      setInputs((prev) => prev.filter((el) => el !== id));
    }
  };

  return (
    <section className="reportForm">
        <div className="row">
          <div className="col-xl-12">
            <div className={style.reportForm__block}>
              <div className={style.reportForm__blockTitle}>
                <h2>Добавить отчет</h2>
                <h3>Дата заполнения отчета:</h3>
              </div>
              <div className={style.reportForm__blockImg}>
                <img className={style.calendarIcon} src={calendarIcon} alt="" />
                {currentMonthAndDayReportPage()}
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
            <InputsComponent deleteInput={deleteInput} inputsArr={inputs} remove={remove} />
            <div className={style.reportForm__formAdd}>
              <img onClick={addInput} src={addIcon} alt="" />
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
    </section>
  );
};

export default ReportForm;
