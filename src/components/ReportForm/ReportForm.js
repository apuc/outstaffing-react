import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPost } from '../../server/server'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { Loader } from '../Loader/Loader'
import { auth } from '../../redux/outstaffingSlice'
import { getRole } from '../../redux/roleSlice'
import calendarIcon from '../../images/calendar_icon.png'
import ellipse from '../../images/ellipse.png'
import remove from '../../images/remove.png'
import addIcon from '../../images/addIcon.png'
import { currentMonthAndDayReportPage } from '../Calendar/calendarHelper'

import './reportForm.scss'

const getCreatedDate = () => {
  const date = new Date();
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = date.getFullYear()

  return `${yyyy}-${mm}-${dd}`
}

const ReportForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const role = useSelector(getRole)
  
  const [isFetching, setIsFetching] = useState(false)

  const [inputs, setInputs] = useState([ { task: '', hours_spent: '', minutes_spent: 0 } ]);
  const [troublesInputValue, setTroublesInputValue] = useState('');
  const [scheduledInputValue, setScheduledInputValue] = useState('');

  const addInput = () => {
    setInputs((prev) => [...prev, { task: '', hours_spent: '', minutes_spent: 0 }])
  }

  const deleteInput = (indexRemove) => {
    if (indexRemove !== 1) {
      setInputs((prev) => prev.filter((el, index) => index !== indexRemove))
    }
  }

  return (
    <section className='report-form'>
      <div className='row'>
        <div className='col-xl-12'>
          <div className='report-form__block'>
            <div className='report-form__block-title'>
              <h2>Добавить отчет</h2>
              <h3>Дата заполнения отчета:</h3>
            </div>
            <div className='report-form__block-img'>
              <img
                className='report-form__calendar-icon'
                src={calendarIcon}
                alt=''
              />
              {currentMonthAndDayReportPage()}
            </div>
            <div className='report-form__task-list'>
              <img src={ellipse} alt='' />
              <span>Какие задачи были выполнены?</span>
            </div>
          </div>
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
                  {index+1}.
                </div>
                <div className='report-form__task-input report-form__task-input--description'>
                  <input name='text' type='text' onChange={ e => setInputs(inputs.map( (input, inputIndex) => {
                    return index === inputIndex
                      ? {
                        ...input,
                        task: e.target.value
                      }
                      : input
                  }))} />
                </div>
                <div className='report-form__task-input report-form__task-input--hours'>
                  <input name='number' type='number' min='1' onChange={ e => setInputs(inputs.map( (input, inputIndex) => {
                    return index === inputIndex
                      ? {
                        ...input,
                        hours_spent: Number(e.target.value)
                      }
                      : input
                  }))} />
                </div>
                <div className='report-form__task-remove'>
                  <img onClick={() => deleteInput(index)} src={remove} alt='' />
                </div>
              </form>
            )
          })}

          <div className='report-form__form-add'>
            <img onClick={addInput} src={addIcon} alt='' />
            <span>Добавить еще </span>
          </div>
        </div>
        <div className='col-4'></div>
      </div>

      <div className='row'>
        <div className='col-12'>
          <div className='report-form__input-box'>
            <div className='report-form__troubles'>
              <img src={ellipse} alt='' />
              <span>Какие сложности возникли?</span>
            </div>
            <input type='text' value={troublesInputValue} onChange={e => setTroublesInputValue(e.target.value)} />
            <div className='report-form__scheduled'>
              <img src={ellipse} alt='' />
              <span>Что планируется сделать завтра?</span>
            </div>
            <input type='text' value={scheduledInputValue} onChange={e => setScheduledInputValue(e.target.value)} />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <div className='report-form__footer'>
            <button className='report-form__footer-btn' onClick={() => {
              fetchPost({
                link: `${process.env.REACT_APP_API_URL}/api/reports/create`,
                history,
                role,
                body: {
                  tasks: inputs,
                  difficulties: troublesInputValue,
                  tomorrow: scheduledInputValue,
                  created_at: getCreatedDate(),
                  status: 1,
                },
                logout: () => dispatch(auth(false))
              }).then((res) =>
                res.json().then((resJSON) => {
                  setInputs( () => [] )
                  setTroublesInputValue('');
                  setScheduledInputValue('');
                  setIsFetching(false)
                  setInputs(() => [ { task: '', hours_spent: '', minutes_spent: 0 } ]);
                })
              )
            }}>
              {isFetching ? <Loader /> : 'Отправить'}
            </button>
            <p className='report-form__footer-text'>
              Всего за день : <span>60 часов</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReportForm
