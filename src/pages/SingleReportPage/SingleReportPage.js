import React from 'react'
import { WithLogout } from '../../HOC/withLogout'
import arrowLeft from '../../images/right-arrow.png'

import SVG from 'react-inlinesvg'

import dateArrowIcon from '../../images/dateArrow.svg'
import calendarIcon from '../../images/calendar.svg'

import { TaskItem } from '../../components/TaskItem/TaskItem'

import './singleReportPage.scss'
import {useNavigate} from "react-router";
import {LogoutButton} from "../../components/LogoutButton/LogoutButton";

const tasks = [
  {
    index: 1,
    text: 'Задача «67 – Навигационная система – Главное меню – Обновить иконки» заблокирована из-за отсутствия новых иконок',
    hours: 3
  },
  {
    index: 2,
    text: 'Задача «83 – Навигационная система – Поиск по почтовому индексу – Добавить экран поиска по почтовому индексу» не может быть завершена, т.к. работа над задачей «82 – Навигационная система – Разработать модуль поиска по почтовому индексу» ещё не начата',
    hours: 3
  }
];

const SingleReportPage = () => {

  const navigate= useNavigate();

  return (

      <div className='single-report-page'>
        <div onClick={()=> {navigate(-1)}} className='single-report-page__back'>
          <div className='single-report-page__back-arrow'>
            <img src={arrowLeft} alt='arrowLeft'/>
          </div>
          <div className='single-report-page__back-text'>
            Вернуться к списку
          </div>
        </div>

        <div className='single-report-page__title'>
          <div className='single-report-page__title-text'>Отчет за день</div>
          <div className='single-report-page__title-date'>
            <div className='single-report-page__title-date--prev'>
              <button>
                <SVG src={dateArrowIcon} />
              </button>
            </div>
            <div className='single-report-page__title-date--actual'>
              <SVG src={calendarIcon} />
              <p>15 июня</p>
            </div>
            <div className='single-report-page__title-date--next single-report-page__title-date--enabled'>
              <button>
                <SVG src={dateArrowIcon} />
              </button>
            </div>
          </div>
        </div>

        <div className='single-report-page__tasks'>
          <div className='single-report-page__tasks-title'>
            <div className='single-report-page__marker'></div>
            <h3>Какие задачи были выполнены?</h3>
          </div>
          {tasks.map((task) => {
            return (
              <div className='single-report-page__tasks-item'>
                <TaskItem {...task} />
              </div>
            )
          })}
        </div>

        <div className='single-report-page__troubles'>
          <div className='single-report-page__troubles-title'>
            <div className='single-report-page__marker'></div>
            <h3>Какие сложности возникли?</h3>
          </div>
          <div className='single-report-page__troubles-item'>
            91 – Навигационная система – Поиск адреса – Разобраться, почему
            находятся несколько пересечений Невского пр. и Казанской ул.
          </div>
        </div>

        <div className='single-report-page__scheduled'>
          <div className='single-report-page__scheduled-title'>
            <div className='single-report-page__marker'></div>
            <h3>Что планируется сделать завтра?</h3>
          </div>
          <div className='single-report-page__scheduled-item'>
            91 – Навигационная система – Поиск адреса – Разобраться, почему
            находятся несколько пересечений Невского пр. и Казанской ул.
          </div>
        </div>

        <div className='single-report-page__footer'>
          <div className='single-report-page__footer-rectangle'></div>
          <div className='single-report-page__hours'>
            <div className='single-report-page__hours-value'></div>
            <div className='single-report-page__hours-text'></div>
          </div>
        </div>
        <LogoutButton />
      </div>

  )
};

export default SingleReportPage
