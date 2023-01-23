import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {useRequest} from "../../hooks/useRequest";

import {ProfileHeader} from "../../components/ProfileHeader/ProfileHeader";
import {Footer} from "../../components/Footer/Footer";

import arrow from "../../images/right-arrow.png";
import arrowSwitchDate from "../../images/arrowViewReport.svg";

import './viewReport.scss'

const getCreatedDate = () => {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`
};

export const ViewReport = () => {
    const {apiRequest} = useRequest();

    const [taskText, setTaskText] = useState([]);
    const [difficulties, setDifficulties] = useState([])
    const [tomorrowTask, setTomorrowTask] = useState([])
    const [totalHours, setTotalHours] = useState(0);
    useEffect(() => {
        setTaskText([])
        setDifficulties([])
        setTomorrowTask([])
        apiRequest(`reports/find-by-date?user_card_id=${localStorage.getItem('cardId')}&date=2023-01-22`)
            .then(res => {
                let spendTime = 0
                for (const item of res) {
                    if(item.difficulties) {
                        setDifficulties(prevArray => [...prevArray, item.difficulties])
                    }
                    if(item.tomorrow) {
                        setTomorrowTask(prevArray => [...prevArray, item.tomorrow])
                    }
                    item.task.map((task) => {
                        const taskInfo = {
                            hours: task.hours_spent,
                            task: task.task,
                            id: task.id
                        }
                        if(task.hours_spent) {
                            spendTime += Number(task.hours_spent)
                        }
                        setTaskText(prevArray => [...prevArray, taskInfo])
                    })
                }
                setTotalHours(spendTime)
            })
    }, []);
    return (
        <div className='viewReport'>
            <ProfileHeader/>
            <div className='container'>
                <div className='viewReport__info'>
                    <h2 className='viewReport__title'>Ваши отчеты - <span>просмотр отчета за день</span></h2>
                    <Link className='viewReport__back' to={`/profile/calendar`}>
                        <img src={arrow} alt='arrow'/><p>Вернуться</p>
                    </Link>
                    <div className='viewReport__bar'>
                        <h3 className='viewReport__bar__date'>{getCreatedDate()}</h3>
                        <p className='viewReport__bar__hours'>Вами потрачено на работу : <span>{totalHours} часов</span></p>
                        {/*<div className='viewReport__bar__progressBar'>*/}
                        {/*    <span></span>*/}
                        {/*</div>*/}
                        {/*<p className='viewReport__bar__total'>122 часа из 160</p>*/}
                    </div>
                </div>
                <div className='viewReport__switchDate'>
                    <div className='viewReport__switchDate__prev switchDate'>
                        <img src={arrowSwitchDate} alt='arrow'/>
                    </div>
                    <p>{getCreatedDate()}</p>
                    <div className='viewReport__switchDate__next switchDate'>
                        <img src={arrowSwitchDate} alt='arrow'/>
                    </div>
                </div>
                {taskText.length ?
                    <div className='viewReport__content'>
                        <div className='table__container'>
                            <table className='viewReport__done'>
                                <thead>
                                <tr>
                                    <th><p>Какие задачи были выполнены?</p></th>
                                    <th><p>Время</p></th>
                                </tr>
                                </thead>
                                <tbody>
                                {taskText.length && taskText.map((task) => {
                                    return <tr key={task.id}>
                                                <td>
                                                    <p>{task.task}</p>
                                                </td>
                                                <td>
                                                    <div className='viewReport__done__hours__item'>
                                                        <span>{task.hours}</span>
                                                        <p>часа на задачу</p>
                                                    </div>
                                                </td>
                                            </tr>
                                })}
                                <tr>
                                    <td></td>
                                    <td><span>Всего: {totalHours} часов</span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='viewReport__item'>
                            <h3>Какие сложности возникли?</h3>
                            {difficulties.length && difficulties.map((item, index) => {
                                    return <p key={index}>{item}</p>
                                }
                            )}
                        </div>
                        <div className='viewReport__item'>
                            <h3>Что планируется сделать завтра?</h3>
                            {tomorrowTask.length && tomorrowTask.map((item, index) => {
                                    return <p key={index}>{item}</p>
                                }
                            )}
                        </div>
                    </div>
                    :
                    <div className='viewReport__noTask'>
                        <p>В этот день вы <span>не заполняли</span> отчет</p>
                    </div>
                }
                <Footer />
            </div>
        </div>
    )
};
