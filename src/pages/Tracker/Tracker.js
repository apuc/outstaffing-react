import React, {useState} from 'react';

import {ProfileHeader} from "../../components/ProfileHeader/ProfileHeader";
import {Footer} from '../../components/Footer/Footer'

import project from '../../images/trackerProject.svg'
import tasks from '../../images/trackerTasks.svg'
import archive from '../../images/archiveTracker.svg'
import avatarTest from '../../images/AvatarTest .png'
import selectArrow from '../../images/select.svg'
import commentsBoard from '../../images/commentsBoard.svg'
import filesBoard from '../../images/filesBoard.svg'

import './tracker.scss'

export const Tracker = () => {

    const [toggleTab, setToggleTab] = useState(1)
    const [projects] = useState([
        {
            name: 'Разработка трекера',
            count: 4
        },
        {
            name: 'Кинотеатр',
            count: 4
        },
        {
            name: 'Проект страхование',
            count: 4
        }
    ])
    const [tabTaskMok] = useState([
        {
            name: 'Открытые',
            tasks: [
                {
                    task: 'PR - 2245',
                    description: 'Сверстать часть таблицы. Сверстать часть таблицы',
                    comments: 12,
                    files: 0,
                    avatarCreated: avatarTest,
                    avatarDo: avatarTest
                },
                {
                    task: 'PR - 2245',
                    description: 'Сверстать часть таблицы. Сверстать часть таблицы',
                    comments: 12,
                    files: 0,
                    avatarCreated: avatarTest,
                    avatarDo: avatarTest
                }
            ]
        },
        {
            name: 'В процессе',
            tasks: [
                {
                    task: 'PR - 2245',
                    description: 'Сверстать часть таблицы. Сверстать часть таблицы',
                    comments: 12,
                    files: 0,
                    avatarCreated: avatarTest,
                    avatarDo: avatarTest
                }
            ]
        },
        {
            name: 'На проверке',
            tasks: [
                {
                    task: 'PR - 2245',
                    description: 'Сверстать часть таблицы. Сверстать часть таблицы',
                    comments: 12,
                    files: 0,
                    avatarCreated: avatarTest,
                    avatarDo: avatarTest
                },
                {
                    task: 'PR - 2245',
                    description: 'Сверстать часть таблицы. Сверстать часть таблицы',
                    comments: 12,
                    files: 0,
                    avatarCreated: avatarTest,
                    avatarDo: avatarTest
                },
                {
                    task: 'PR - 2245',
                    description: 'Сверстать часть таблицы. Сверстать часть таблицы',
                    comments: 12,
                    files: 0,
                    avatarCreated: avatarTest,
                    avatarDo: avatarTest
                }
            ]
        },
        {
            name: 'Готово',
            tasks: [
                {
                    task: 'PR - 2245',
                    description: 'Сверстать часть таблицы. Сверстать часть таблицы',
                    comments: 12,
                    files: 0,
                    avatarCreated: avatarTest,
                    avatarDo: avatarTest
                },
                {
                    task: 'PR - 2245',
                    description: 'Сверстать часть таблицы. Сверстать часть таблицы',
                    comments: 12,
                    files: 0,
                    avatarCreated: avatarTest,
                    avatarDo: avatarTest
                }
            ]
        }
    ])

    const toggleTabs = (index) => {
        setToggleTab(index)
    }
    return (
        <div className='tracker'>
            <ProfileHeader />
            <div className='container'>
                <div className='tracker__content'>
                    <h2 className='tracker__title'>Трекер</h2>
                    <div className='tracker__tabs'>
                        <div className='tracker__tabs__head'>
                            <div className={toggleTab === 1 ? 'tab active-tab' : 'tab'} onClick={() => toggleTabs(1)}>
                                <img src={project} alt='img' />
                                <p>Проекты </p>
                            </div>
                            <div className={toggleTab === 2 ? 'tab active-tab' : 'tab'} onClick={() => toggleTabs(2)}>
                                <img src={tasks} alt='img' />
                                <p>Задачи</p>
                            </div>
                            <div className={toggleTab === 3 ? 'tab active-tab' : 'tab'} onClick={() => toggleTabs(3)}>
                                <img src={archive} alt='img' />
                                <p>Архив</p>
                            </div>
                        </div>
                        <div className='tracker__tabs__content'>
                            <div className={toggleTab === 1 ? 'tracker__tabs__content__projects active__content' : 'tracker__tabs__content__projects'}>
                                {projects.map((project, index) => {
                                    return <div className='project'>
                                                <h3>{project.name}</h3>
                                                <div className='project__info'>
                                                    <p>Открытые задачи</p>
                                                    <span className='count'>{project.count}</span>
                                                    <span className='add'>+</span>
                                                </div>
                                            </div>
                                })
                                }
                                <button><span>+</span>Создать проект</button>
                            </div>
                            <div className={toggleTab === 2 ? 'tracker__tabs__content__tasks tasks active__content' : 'tracker__tabs__content__projects'}>
                                <div className='tasks__head'>
                                    <h4>Проект : Разработка трекера</h4>
                                    <span className='tasks__head__add'>+</span>
                                    <div className='tasks__head__persons'>
                                        <img src={avatarTest} alt='avatar' />
                                        <img src={avatarTest} alt='avatar' />
                                        <img src={avatarTest} alt='avatar' />
                                        <img src={avatarTest} alt='avatar' />
                                        <span>+9</span>
                                    </div>
                                    <div className='tasks__head__select'>
                                        <span>Учавствую</span>
                                        <img src={selectArrow} alt='arrow' />
                                    </div>
                                    <div className='tasks__head__select'>
                                        <span>Мои</span>
                                        <img src={selectArrow} alt='arrow' />
                                    </div>
                                </div>
                                <div className='tasks__container'>
                                    {tabTaskMok.map((section, index) => {
                                            return <div key={index} className={section.tasks.length >= 3 ? 'tasks__board tasks__board__more' : 'tasks__board'}>
                                                        <div className='board__head'>
                                                            <span>{section.name}</span>
                                                            <div>
                                                                <span className='add'>+</span>
                                                                <span className='more'>...</span>
                                                            </div>
                                                        </div>
                                                        {section.tasks.map((task, index) => {
                                                            return <div key={index} className='tasks__board__item'>
                                                                        <div className='tasks__board__item__title'>
                                                                            <p>{task.task}</p>
                                                                            <span>...</span>
                                                                        </div>
                                                                        <p className='tasks__board__item__description'>
                                                                            {task.description}
                                                                        </p>
                                                                        <div className='tasks__board__item__info'>
                                                                            <div className='tasks__board__item__info__more'>
                                                                                <img src={commentsBoard} alt='commentsImg' />
                                                                                <span>{task.comments} коментариев</span>
                                                                            </div>
                                                                            <div className='tasks__board__item__info__more'>
                                                                                <img src={filesBoard} alt='filesImg' />
                                                                                <span>{task.files} файлов</span>
                                                                            </div>
                                                                            <div className='tasks__board__item__info__avatars'>
                                                                                <img src={task.avatarCreated} alt='avatar' />
                                                                                <img src={task.avatarDo} alt='avatar' />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                        })
                                                        }
                                                        {section.tasks.length >= 3 &&
                                                        <span className='moreItems'>+</span>
                                                        }
                                                    </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
};
