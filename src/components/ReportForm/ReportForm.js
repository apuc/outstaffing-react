import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import DatePicker, { registerLocale } from "react-datepicker"
import {getCorrectDate, getCreatedDate} from '../Calendar/calendarHelper'
import ru from "date-fns/locale/ru"
registerLocale("ru", ru);

import {Loader} from '../Loader/Loader'
import {Footer} from "../Footer/Footer";
import {ProfileHeader} from "../ProfileHeader/ProfileHeader";
import {ProfileBreadcrumbs} from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs"

import {apiRequest} from "../../api/request";

import {getReportDate} from '../../redux/reportSlice'

import calendarIcon from '../../images/calendar_icon.png'
import ellipse from '../../images/ellipse.png'
import remove from '../../images/remove.png'
import addIcon from '../../images/addIcon.png'
import arrow from "../../images/right-arrow.png";

import './reportForm.scss'
import "react-datepicker/dist/react-datepicker.css";

const ReportForm = () => {
  if(localStorage.getItem('role_status') === '18') {
    return <Navigate to="/profile" replace/>
  }
  const navigate= useNavigate();
  const reportDate = useSelector(getReportDate);

  useEffect(() => {
    initListeners()
  }, [])

  const [isFetching, setIsFetching] = useState(false);
  const [reportSuccess, setReportSuccess] = useState('');
  const [startDate, setStartDate] = useState(reportDate ? new Date (reportDate._d) : new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const [inputs, setInputs] = useState([{task: '', hours_spent: '', minutes_spent: 0}]);
  const [troublesInputValue, setTroublesInputValue] = useState('');
  const [scheduledInputValue, setScheduledInputValue] = useState('');

  const addInput = () => {
    setInputs((prev) => [...prev, {task: '', hours_spent: '', minutes_spent: 0}])
  };

  const initListeners = () => {
    document.addEventListener('click', closeByClickingOut)
  }

  const closeByClickingOut = (event) => {
    const path = event.path || (event.composedPath && event.composedPath())

    if (event && !path.find((div) => div.classList && (div.classList.contains('report-form__block-img') || div.classList.contains('react-datepicker-popper')))) {
      setDatePickerOpen(false)
    }
  }

  const totalHours = inputs.reduce((a, b) => a + b.hours_spent, 0);

  const deleteInput = (indexRemove) => {
    setInputs((prev) => prev.filter((el, index) => index !== indexRemove))
  };

  const handler = () => {
    if(!inputs[0].task || !inputs[0].hours_spent) {
      setReportSuccess('Заполните задачи');
      setTimeout(() => setReportSuccess(''), 1000)
      return
    }
    apiRequest('/reports/create', {
      method: 'POST',
      data: {
        tasks: inputs,
        difficulties: troublesInputValue,
        tomorrow: scheduledInputValue,
        created_at: getCreatedDate(startDate),
        status: 1,
      },
    }).then((res) => {
      setReportSuccess('Отчет отправлен');
      setTimeout(() => {
        setReportSuccess('')
        navigate('/profile/calendar');
      }, 1000)
      setInputs(() => []);
      setTroublesInputValue('');
      setScheduledInputValue('');
      setIsFetching(false);
      setInputs(() => [{task: '', hours_spent: '', minutes_spent: 0}]);
    })
  };

  return (
      <section className='report-form'>
        <ProfileHeader/>
        <div className='container'>
          <ProfileBreadcrumbs links={[{name: 'Главная', link: '/profile'},
            {name: 'Ваша отчетность', link: '/profile/calendar'},
            {name: 'Страница добавления нового отчета', link: '/report'}]}
          />
          <h2 className='summary__title'>Ваши отчеты - <span>добавить отчет</span></h2>
          <div>
            <div className='report__head'>
              <Link className='calendar__back' to={`/profile/calendar`}>
                <img src={arrow} alt=''/><p>Вернуться</p>
              </Link>
            </div>
          </div>

          <div className='report-form__content'>
            <div className='report-form__block'>
              <div className='report-form__block-title'>
                <h2>Добавление отчета за день</h2>
                <h3>Дата заполнения отчета:</h3>
              </div>
              <div className='report-form__block-img' onClick={() => setDatePickerOpen(true)}>
                <img
                    className='report-form__calendar-icon'
                    src={calendarIcon}
                    alt=''
                />
                {getCorrectDate(startDate)}
              </div>
              <DatePicker
                  className='datePicker'
                  open={datePickerOpen}
                  locale="ru"
                  selected={startDate}
                  onChange={(date) => {
                    setDatePickerOpen(false)
                    setStartDate(date)
                  }}
              />
              <div className='report-form__task-list'>
                <img src={ellipse} alt=''/>
                <span>Какие задачи были выполнены?</span>
              </div>
            </div>

            <div className='row'>
              <div className='col-8'>
                <div className='report-form__task-header'>
                  <p className='report-form__task-title--description'>
                    Краткое описание задачи
                  </p>
                  <p className='report-form__task-title--hours'>Количество часов</p>
                </div>

                {inputs.map((input, index) => {
                  return (
                      <form id={'input'} key={`input__${index}`} className='report-form__task-form'>
                        <div className='report-form__task-number'>
                          {index + 1}.
                        </div>
                        <div className='report-form__task-input report-form__task-input--description'>
                          <input name='text' type='text' onChange={e => setInputs(inputs.map((input, inputIndex) => {
                            return index === inputIndex
                                ? {
                                  ...input,
                                  task: e.target.value
                                }
                                : input
                          }))}/>
                        </div>
                        <div className='report-form__task-input report-form__task-input--hours'>
                          <input name='number' type='number' min='1'
                                 onChange={e => setInputs(inputs.map((input, inputIndex) => {
                                   return index === inputIndex
                                       ? {
                                         ...input,
                                         hours_spent: Number(e.target.value)
                                       }
                                       : input
                                 }))}/>
                        </div>
                        {index > 0 &&
                        <div className='report-form__task-remove'>
                          <img onClick={() => deleteInput(index)} src={remove} alt=''/>
                        </div>
                        }
                      </form>
                  )
                })}

                <div className='report-form__form-add'>
                  <img onClick={addInput} src={addIcon} alt=''/>
                  <span>Добавить еще </span>
                </div>
              </div>
            </div>

        <div className='row'>
          <div className='col-12'>
            <div className='report-form__input-box'>
              <div className='report-form__troubles'>
                <img src={ellipse} alt=''/>
                <span>Какие сложности возникли?</span>
              </div>
              <input type='text' value={troublesInputValue} onChange={e => setTroublesInputValue(e.target.value)}/>
              <div className='report-form__scheduled'>
                <img src={ellipse} alt=''/>
                <span>Что планируется сделать завтра?</span>
              </div>
              <input type='text' value={scheduledInputValue} onChange={e => setScheduledInputValue(e.target.value)}/>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <div className='report-form__footer'>
              <button className='report-form__footer-btn' onClick={() => handler()}>
                {isFetching ? <Loader/> : 'Отправить'}
              </button>
              <p className='report-form__footer-text'>
                Всего за день : <span>{totalHours} часов</span>
              </p>
              {reportSuccess &&
              <p className={`report-form__footer-done ${reportSuccess === 'Заполните задачи' ? 'errorText' : ''}`}>{reportSuccess}</p>
              }
            </div>
          </div>
            </div>
          </div>
        </div>
        <Footer/>
      </section>
  )
};

export default ReportForm
