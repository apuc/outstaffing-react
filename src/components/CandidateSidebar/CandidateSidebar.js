import React from 'react'
import { Link } from 'react-router-dom'
import { Achievement } from '../Achievement/Achievement'

import { LEVELS, SKILLS } from '../constants/constants'

import maleBig from '../../images/medium_male_big.png'
import './candidateSidebar.scss'

const getYearsString = (years) => {
  let yearsString
  if (years % 10 === 1) {
    yearsString = 'год'
  } else if (years === 11 || years === 12 || years === 13 || years === 14) {
    yearsString = 'лет'
  } else if (years % 10 === 2 || years % 10 === 3 || years % 10 === 4) {
    yearsString = 'года'
  } else {
    yearsString = 'лет'
  }
  return `${years} ${yearsString}`
}

const CandidateSidebar = ({ candidate, position }) => {
  return (
    <div className='candidate-sidebar'>
      <div className='candidate-sidebar__info'>
        <div className='candidate-sidebar__position'>
          <h2>
            {candidate.specification} {SKILLS[candidate.position_id]},{' '}
            {LEVELS[candidate.level]}{' '}
          </h2>
        </div>
        <img src={candidate.photo} alt='' />
        {candidate && candidate.years_of_exp && (
          <>
            <p className='candidate-sidebar__experience-title'>Опыт работы</p>
            <p className='candidate-sidebar__experience'>
              {getYearsString(candidate.years_of_exp)}
            </p>
          </>
        )}
        <Link to={`/candidate/${candidate.id}/form`}>
          <button className='candidate-sidebar__select'>
            Выбрать к собеседованию
          </button>
        </Link>
        <Link to={`/${candidate.id}/calendar`}>
          <button className='candidate-sidebar__select'>
            Отчёты
          </button>
        </Link>
        <div className='candidate-sidebar__achievements'>
          {candidate &&
            candidate.achievements &&
            candidate.achievements.map((item) => {
              return <Achievement achievement={item.achievement} />
            })}
        </div>
      </div>
    </div>
  )
}

export default CandidateSidebar
