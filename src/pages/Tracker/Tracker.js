import React, { useState } from "react";

import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import { Footer } from "../../components/Footer/Footer";

import ModalTiket from "../../components/UI/ModalTiket/ModalTiket";
import ModalProject from "../../components/UI/ModalProject/ModalProject";

import project from "../../images/trackerProject.svg";
import tasks from "../../images/trackerTasks.svg";
import archive from "../../images/archiveTracker.svg";
import avatarTest from "../../images/AvatarTest .png";
import selectArrow from "../../images/select.svg";
import commentsBoard from "../../images/commentsBoard.svg";
import filesBoard from "../../images/filesBoard.svg";
import search from "../../images/search.svg"

import "./tracker.scss";

export const Tracker = () => {
  const [toggleTab, setToggleTab] = useState(1);
  const [projects] = useState([
    {
      name: "Разработка трекера",
      count: 4,
    },
    {
      name: "Кинотеатр",
      count: 4,
    },
    {
      name: "Проект страхование",
      count: 4,
    },
  ]);
  const [tabTaskMok, setTabTaskMok] = useState([
    {
      name: "Открытые",
      open: false,
      tasks: [
        {
          task: "PR - 2245",
          description: "Сверстать часть таблицы. Сверстать часть таблицы",
          comments: 12,
          files: 0,
          avatarCreated: avatarTest,
          avatarDo: avatarTest,
          id: 1
        },
        {
          task: "PR - 2245",
          description: "Сверстать часть таблицы. Сверстать часть таблицы",
          comments: 12,
          files: 0,
          avatarCreated: avatarTest,
          avatarDo: avatarTest,
          id: 2
        },
      ],
    },
    {
      name: "В процессе",
      open: false,
      tasks: [
        {
          task: "PR - 2245",
          description: "Сверстать часть таблицы. Сверстать часть таблицы",
          comments: 12,
          files: 0,
          avatarCreated: avatarTest,
          avatarDo: avatarTest,
          id: 3
        },
      ],
    },
    {
      name: "На проверке",
      open: false,
      tasks: [
        {
          task: "PR - 2245",
          description: "Сверстать часть таблицы. Сверстать часть таблицы",
          comments: 12,
          files: 0,
          avatarCreated: avatarTest,
          avatarDo: avatarTest,
          id: 4
        },
        {
          task: "PR - 2245",
          description: "Сверстать часть таблицы. Сверстать часть таблицы",
          comments: 12,
          files: 0,
          avatarCreated: avatarTest,
          avatarDo: avatarTest,
          id: 5
        },
        {
          task: "PR - 2245",
          description: "Сверстать часть таблицы. Сверстать часть таблицы",
          comments: 12,
          files: 0,
          avatarCreated: avatarTest,
          avatarDo: avatarTest,
          id: 6
        },
        {
          task: "PR - 2245",
          description: "Сверстать часть таблицы. Сверстать часть таблицы",
          comments: 12,
          files: 0,
          avatarCreated: avatarTest,
          avatarDo: avatarTest,
          id: 9
        },
      ],
    },
    {
      name: "Готово",
      open: false,
      tasks: [
        {
          task: "PR - 2245",
          description: "Сверстать часть таблицы. Сверстать часть таблицы",
          comments: 12,
          files: 0,
          avatarCreated: avatarTest,
          avatarDo: avatarTest,
          id: 7
        },
        {
          task: "PR - 2245",
          description: "Сверстать часть таблицы. Сверстать часть таблицы",
          comments: 12,
          files: 0,
          avatarCreated: avatarTest,
          avatarDo: avatarTest,
          id: 8
        },
      ],
    },
  ]);

  const [completeTasks] = useState([
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: '07/мар/23',
      avatarDo: avatarTest,
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: '07/мар/23',
      avatarDo: avatarTest,
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: '07/мар/23',
      avatarDo: avatarTest,
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: '07/мар/23',
      avatarDo: avatarTest,
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: '07/мар/23',
      avatarDo: avatarTest,
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: '07/мар/23',
      avatarDo: avatarTest,
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: '07/мар/23',
      avatarDo: avatarTest,
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: '07/мар/23',
      avatarDo: avatarTest,
    },
    {
      name: "PR - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: '07/мар/23',
      avatarDo: avatarTest,
    },
    {
      name: "PK - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: '07/мар/23',
      avatarDo: avatarTest,
    },
    {
      name: "PE - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: '07/мар/23',
      avatarDo: avatarTest,
    },
    {
      name: "PA - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: '07/мар/23',
      avatarDo: avatarTest,
    },
    {
      name: "PB - 2245",
      description: "Верстать часть таблицы. Сверстать часть таблицы",
      dateComplete: '07/мар/23',
      avatarDo: avatarTest,
    },
    {
      name: "PC - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: '07/мар/23',
      avatarDo: avatarTest,
    },
    {
      name: "PD - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: '07/мар/23',
      avatarDo: avatarTest,
    },
    {
      name: "PA - 2245",
      description: "Сверстать часть таблицы. Сверстать часть таблицы",
      dateComplete: '07/мар/23',
      avatarDo: avatarTest,
    },
  ])

  const [filterCompleteTasks, setFilterCompleteTasks] = useState(completeTasks)

  const [modalActiveTicket, setModalActiveTicket] = useState(false);
  const [modalActiveProject, setModalActiveProject] = useState(false);
  const [startWrapperIndex, setStartWrapperIndex] = useState(null)
  const [wrapperHover, setWrapperHover] = useState([false, false, false, false])

  const toggleTabs = (index) => {
    setToggleTab(index);
  };

  function toggleMoreTasks (wrapperIndex) {
    setTabTaskMok(prevArray => prevArray.map((elem, index) => {
      if (wrapperIndex === index) {
        return {...elem, open: !elem.open}
      } else {
        return elem
      }
    }))
  }

  function dragStartHandler(e, task, wrapperIndex) {
    setStartWrapperIndex({task: task, index: wrapperIndex})
    setTimeout(() => {
      e.target.classList.add('tasks__board__item__hide')
    },0)
  }

  function dragEndHandler(e) {
    setWrapperHover(prevArray => prevArray.map((elem) => {
      return false
    }))
    e.target.classList.remove('tasks__board__item__hide')
  }

  function dragOverHandler(e) {
    e.preventDefault()
  }

  function dragEnterHandler(wrapperIndex) {
    if (wrapperIndex === startWrapperIndex.index) {
      return
    }
    setWrapperHover(prevArray => prevArray.map((elem, index) => {
      if (index === wrapperIndex) {
        return true
      } else {
        return false
      }
    }))
  }

  function dragDropHandler(e, wrapperIndex) {
    e.preventDefault()
    if (startWrapperIndex.index === wrapperIndex) {
      return
    }
    setWrapperHover(prevArray => prevArray.map((elem) => {
      return false
    }))
    setTabTaskMok(prevArray  => prevArray.map((elem, index) => {
      if (index === wrapperIndex) {
        return {...elem, tasks: [...elem.tasks, startWrapperIndex.task]}
      } else if (index === startWrapperIndex.index) {
        return {...elem, tasks: elem.tasks.filter((item) => {
          return item.id !== startWrapperIndex.task.id
            }
          )}
      } else {
        return elem
      }
    }))
  }

  function filterArchiveTasks(e) {
    setFilterCompleteTasks(completeTasks.filter((item) => {
      if (!e.target.value) {
        return item
      }
      if (item.name.toLowerCase().startsWith(e.target.value.toLowerCase()) || item.description.toLowerCase().startsWith(e.target.value.toLowerCase())) {
        return item
      }
    }))
  }

  return (
    <div className="tracker">
      <ProfileHeader />
      <div className="container">
        <div className="tracker__content">
          <h2 className="tracker__title">Трекер</h2>
          <div className="tracker__tabs">
            <div className="tracker__tabs__head">
              <div
                className={toggleTab === 1 ? "tab active-tab" : "tab"}
                onClick={() => toggleTabs(1)}
              >
                <img src={project} alt="img" />
                <p>Проекты </p>
              </div>
              <div
                className={toggleTab === 2 ? "tab active-tab" : "tab"}
                onClick={() => toggleTabs(2)}
              >
                <img src={tasks} alt="img" />
                <p>Задачи</p>
              </div>
              <div
                className={toggleTab === 3 ? "tab active-tab" : "tab"}
                onClick={() => toggleTabs(3)}
              >
                <img src={archive} alt="img" />
                <p>Архив</p>
              </div>
            </div>
            <div className="tracker__tabs__content">
              <div
                className={
                  toggleTab === 1
                    ? "tracker__tabs__content__projects active__content"
                    : "tracker__tabs__content__projects"
                }
              >
                {projects.map((project, index) => {
                  return (
                    <div className="project" key={index}>
                      <h3>{project.name}</h3>
                      <div className="project__info">
                        <p>Открытые задачи</p>
                        <span className="count">{project.count}</span>
                        <span className="add">+</span>
                      </div>
                    </div>
                  );
                })}
                <ModalProject
                  active={modalActiveProject}
                  setActive={setModalActiveProject}
                />
                <button onClick={() => setModalActiveProject(true)}>
                  <span>+</span>Создать проект
                </button>
              </div>
              <div
                className={
                  toggleTab === 2
                    ? "tracker__tabs__content__tasks tasks active__content"
                    : "tracker__tabs__content__projects"
                }
              >
                <div className="tasks__head">
                  <h4>Проект : Разработка трекера</h4>
                  <span className="tasks__head__add">+</span>
                  <div className="tasks__head__persons">
                    <img src={avatarTest} alt="avatar" />
                    <img src={avatarTest} alt="avatar" />
                    <img src={avatarTest} alt="avatar" />
                    <img src={avatarTest} alt="avatar" />
                    <span>+9</span>
                  </div>
                  <div className="tasks__head__select">
                    <span>Учавствую</span>
                    <img src={selectArrow} alt="arrow" />
                  </div>
                  <div className="tasks__head__select">
                    <span>Мои</span>
                    <img src={selectArrow} alt="arrow" />
                  </div>
                </div>
                <ModalTiket
                  active={modalActiveTicket}
                  setActive={setModalActiveTicket}
                />

                <div className="tasks__container">
                  {tabTaskMok.map((section, wrapperIndex) => {
                    return (
                      <div
                        key={wrapperIndex}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDragEnter={(e) => dragEnterHandler(wrapperIndex)}
                        onDrop={(e) => dragDropHandler(e, wrapperIndex)}
                        className={`tasks__board ${section.tasks.length >= 3 ? 'tasks__board__more' : ''} ${wrapperHover[wrapperIndex] ? 'tasks__board__hover' : ''}`}
                      >
                        <div className="board__head">
                          <span className={wrapperIndex === 3 ? "done" : ""}>
                            {section.name}
                          </span>
                          <div>
                            <span className="add">+</span>
                            <span className="more">...</span>
                          </div>
                        </div>
                        {section.tasks.map((task, index) => {
                          if (index > 2) {
                            if (!section.open) {
                              return
                            }
                          }
                          return (
                            <div
                              key={index}
                              className="tasks__board__item"
                              draggable={true}
                              onDragStart={(e) => dragStartHandler(e, task, wrapperIndex)}
                              onDragEnd={(e) => dragEndHandler(e)}
                              onClick={() => setModalActiveTicket(true)}
                            >
                              <div className="tasks__board__item__title">
                                <p>{task.task}</p>
                                <span>...</span>
                              </div>
                              <p className="tasks__board__item__description">
                                {task.description}
                              </p>
                              <div className="tasks__board__item__info">
                                <div className="tasks__board__item__info__more">
                                  <img src={commentsBoard} alt="commentsImg" />
                                  <span>{task.comments} коментариев</span>
                                </div>
                                <div className="tasks__board__item__info__more">
                                  <img src={filesBoard} alt="filesImg" />
                                  <span>{task.files} файлов</span>
                                </div>
                                <div className="tasks__board__item__info__avatars">
                                  <img src={task.avatarCreated} alt="avatar" />
                                  <img src={task.avatarDo} alt="avatar" />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        {section.tasks.length > 3 && (
                          <span className={section.open ? 'lessItems openItems' : 'moreItems openItems'} onClick={() => toggleMoreTasks(wrapperIndex)}>{section.open ? '-' : '+'}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                className={
                  toggleTab === 3
                      ? "tracker__tabs__content__archive tasks active__content"
                      : "tracker__tabs__content__projects"
                }
              >
                <div className='archive__title'>
                  <h3>Архив:</h3>
                  <p>{filterCompleteTasks.length} задач(а)</p>
                  <div className='archive__search'>
                    <input type='text' onChange={(event) => filterArchiveTasks(event)} />
                    <img src={search} alt='search' />
                  </div>
                </div>
                <div className='archive__tasksWrapper'>
                  {filterCompleteTasks.map((task, index) => {
                    return <div className='archive__completeTask' key={index}>
                              <div className='archive__completeTask__description'>
                                <p>{task.description}</p>
                                <p className='date'>{task.dateComplete}</p>
                              </div>
                              <div className='archive__completeTask__info'>
                                <img src={task.avatarDo} alt='avatar' />
                                <p>{task.name}</p>
                              </div>
                           </div>
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
