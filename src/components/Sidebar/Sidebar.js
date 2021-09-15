import React from 'react'
import { Link } from 'react-router-dom'
import { Achievement } from '../Achievement/Achievement'

import maleBig from '../../images/medium_male_big.png'
import './sidebar.scss'

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

const Sidebar = ({ candidate }) => {
  console.log('c', candidate)
  return (
    <div className='candidateSidebar'>
      <div className='candidateSidebar__info'>
        <img src={candidate.photo} alt='' />
        {candidate && candidate.years_of_exp && (
          <>
            <p className='candidateSidebar__experience-title'>Опыт работы</p>
            <p className='candidateSidebar__experience'>
              {getYearsString(candidate.years_of_exp)}
            </p>
          </>
        )}
        <Link to={`/candidate/${candidate.id}/form`}>
          <button className='candidateSidebar__select'>
            Выбрать к собеседованию
          </button>
        </Link>
        <div className='candidateSidebar__achievements'>
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

export default Sidebar
