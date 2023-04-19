import React from 'react'
import StarRating from '../../StarRating/StarRating'

export const QuizReport = () => {
  return (
	 <div className='report'>
		<div className="report__row">
			<div className="report__column">
				<StarRating color={'#52B709'} countStars={1} countActiveStars={0.5} size={61} />
				<div className="report__job-title">Junior <br />	разработчик</div>
			</div>
			<div className="report__column">
				<div className="report__value">22</div>
				<div className="report__text">Правильных ответов</div>
			</div>
			<div className="report__column">
			<div className="report__value report__value_false">02</div>
				<div className="report__text">Не правильных ответов</div>
			</div>
			<div className="report__column">
				<div className="report__status-text">Статус:</div>
				<div className="report__status">Пройдено!</div>
			</div>
		</div>
	 </div>
  )
}
