import React from 'react'

import './taskItem.scss'

export const TaskItem = ({ index, text, hours }) => {
  return (
    <div className='task-item'>
      <div className='task-item__index'>{index}.</div>
      <div className='task-item__text'>{text}</div>
      <div className='task-item__hours'>
        <div className='task-item__hours-value'>{hours}</div>
        <div className='task-item__hours-text'>Количество часов</div>
      </div>
    </div>
  )
}
