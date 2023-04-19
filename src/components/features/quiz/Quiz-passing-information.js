import React, { useEffect, useState } from 'react'
import timer from '../../../images/quiz/timer.png'
import accempt from '../../../images/quiz/accempt.png'
import { useTimer } from 'react-timer-hook';
import StarRating from '../../StarRating/StarRating';
import { useSelector } from 'react-redux';
import { completedTestSelector } from '../../../redux/quizSlice';


export const QuizPassingInformation = ({ expiryTimestamp, setStartTest }) => {
	const {
		seconds,
		minutes,
		isRunning,
		start,
		pause,
		resume,
		restart
	} = useTimer({
		expiryTimestamp, autoStart: false, onExpire: () => {
			console.warn('onExpire called')
		}
	});
	const completedTest = useSelector(completedTestSelector)


	const startTesting = () => {
		setStartTest(true)
		start()
	}

	useEffect(() => {
		if (completedTest) {
			const time = new Date();
			time.setSeconds(time.getSeconds() + 0);//600 - кол-во секунд для прохождения теста
			restart(time, false)
		}
	}, [completedTest])


	return (
		<div className='quiz-passing-information'>
			<div className="quiz-passing-information__container">
				<div className="quiz-passing-information__main">
					<div className="quiz-passing-information__specialization">
						<StarRating color={'#52B709'} countStars={1} countActiveStars={0.5} size={61} />
						<div className='quiz-passing-information__specialization-title'>
							Junior <br />
							разработчик
						</div>
					</div>
					<div className="quiz-passing-information__timer timer-quiz">
						<div className="quiz-passing-information__icon">
							<img src={timer} alt="" />
						</div>
						<div className="quiz-passing-information__text">
							{completedTest ? 'Время вышло' : 'Время на прохождение теста:'} <br />
							<span>{minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')} секунд</span>
						</div>
					</div>
					<div className="quiz-passing-information__attempt">
						<div className="quiz-passing-information__icon">
							<img src={accempt} alt="" />
						</div>
						<div className="quiz-passing-information__text">
							Попыток прохождения: <br />
							<span>1 попытка</span>
						</div>
					</div>
					<div>
					{(!completedTest && !isRunning) && <button className="quiz-passing-information__button btn-green" onClick={startTesting}>Начать</button>}
					</div>
				
				</div>
				
				{/* {isRunning && <button className="quiz-passing-information__button quiz-btn" onClick={pause}>Завершить</button>} */}
			</div>
		</div>
	)
}
