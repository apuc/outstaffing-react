import React from 'react'

import './achievement.scss'

export const Achievement = ({ achievement }) => {
  return (
    <div className='achievement'>
      <div className='achievement__icon'>
        <img src={achievement.img} alt='achievement' />
      </div>
      <div className='achievement__popup'>
        <div className='achievement__title'>{achievement.title}</div>
        <div className='achievement__description'>
          {achievement.description}
        </div>
      </div>
    </div>
  )
}
