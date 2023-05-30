import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import TrackerModal from "../TrackerModal/TrackerModal";
import { apiRequest } from "../../../api/request";
import { useDispatch } from "react-redux";
import {
  modalToggle,
  setProjectBoardFetch,
} from "../../../redux/projectsTrackerSlice";

import {getCorrectDate} from '../../../components/Calendar/calendarHelper'

import category from "../../../images/category.png";
import watch from "../../../images/watch.png";
import file from "../../../images/fileModal.svg";
import arrow from "../../../images/arrowStart.png";
import link from "../../../images/link.svg";
import archive from "../../../images/archive.svg";
import del from "../../../images/delete.svg";
import edit from "../../../images/edit.svg";
import send from "../../../images/send.svg";
import plus from "../../../images/plus.svg";
import fullScreen from "../../../images/inFullScreen.svg";
import close from "../../../images/closeProjectPersons.svg";

import "./ModalTicket.scss";
import {urlForLocal, getCorrectRequestDate} from "../../../helper";
import accept from "../../../images/accept.png";

export const ModalTiсket = ({
  active,
  setActive,
  task,
  projectId,
  projectName,
  projectUsers
}) => {
  const dispatch = useDispatch();
  const [addSubtask, setAddSubtask] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [inputsValue, setInputsValue] = useState({title: task.title, description: task.description, comment: ''});
  const [comments, setComments] = useState([]);
  const [commentsEditOpen, setCommentsEditOpen] = useState({})
  const [commentsEditText, setCommentsEditText] = useState({})
  const [subCommentsCreateOpen, setSubCommentsCreateOpen] = useState({})
  const [dropListOpen, setDropListOpen] = useState(false)
  const [dropListMembersOpen, setDropListMembersOpen] = useState(false)
  const [executor, setExecutor] = useState(task.executor)
  const [members, setMembers] = useState(task.taskUsers)
  const [users, setUsers] = useState([])
  const [timerStart, setTimerStart] = useState(false)
  const [timerInfo, setTimerInfo] = useState({})
  const [currentTimerCount, setCurrentTimerCount] = useState({
    hours: 0,
    minute: 0,
    seconds: 0
  })
  const [timerId, setTimerId] = useState(null)

  function deleteTask() {
    apiRequest("/task/update-task", {
      method: "PUT",
      data: {
        task_id: task.id,
        status: 0,
      },
    }).then((res) => {
      setActive(false);
      dispatch(setProjectBoardFetch(projectId));
    });
  }

  function editTask() {
    apiRequest("/task/update-task", {
      method: "PUT",
      data: {
        task_id: task.id,
        title: inputsValue.title,
        description: inputsValue.description
      },
    }).then((res) => {
      dispatch(setProjectBoardFetch(projectId));
    });
  }

  function createComment() {
    apiRequest("/comment/create", {
      method: "POST",
      data: {
        text: inputsValue.comment,
        entity_type: 2,
        entity_id: task.id
      }
    }).then((res) => {
      let newComment = res
      newComment.created_at = new Date()
      setInputsValue((prevValue) => ({...prevValue, comment: ''}))
      setComments((prevValue) => ([...prevValue, newComment]))
      setCommentsEditOpen((prevValue) => ({...prevValue, [res.id]: false}))
      setCommentsEditText((prevValue) => ({...prevValue, [res.id]: res.text}))
    })
  }
  function deleteComment(commentId) {
    apiRequest("/comment/update", {
      method: "PUT",
      data: {
        comment_id: commentId,
        status: 0
      }
    }).then((res) => {
      setComments((prevValue) => prevValue.filter((item) => item.id !== commentId))
    })
  }

  function editComment(commentId) {

    apiRequest("/comment/update", {
      method: "PUT",
      data: {
        comment_id: commentId,
        text: commentsEditText[commentId]
      }
    }).then((res) => {
      // createSubComment()
    })
  }

  // function createSubComment() {
  //   apiRequest("/comment/create", {
  //     method: "POST",
  //     data: {
  //       text: '12312312',
  //       entity_type: 2,
  //       entity_id: task.id,
  //       parent_id: 36
  //     }
  //   }).then((res) => console.log(res))
  // }

  function startTaskTimer() {
    apiRequest("/timer/create", {
      method: "POST",
      data: {
        entity_type: 2,
        entity_id: task.id,
        created_at: getCorrectRequestDate(new Date())
      }
    }).then((res) => {
      setTimerStart(true)
      setTimerInfo(res)
      startTimer()
    })
  }

  function stopTaskTimer() {
    apiRequest("/timer/update", {
      method: "PUT",
      data: {
        timer_id: timerInfo.id,
        stopped_at: getCorrectRequestDate(new Date())
      }
    }).then((res) => {
      setTimerStart(false)
      clearInterval(timerId)
    })
  }

  function taskExecutor(person) {
    apiRequest("/task/update-task", {
      method: "PUT",
      data: {
        task_id: task.id,
        executor_id: person.user_id
      },
    }).then((res) => {
      setDropListOpen(false)
      setExecutor(res.executor)
    });
  }

  function deleteTaskExecutor() {
    apiRequest("/task/update-task", {
      method: "PUT",
      data: {
        task_id: task.id,
        executor_id: 0
      },
    }).then((res) => {
      setExecutor(null)
    });
  }

  function addMember(person) {
    apiRequest("/task/add-user-to-task", {
      method: "POST",
      data: {
        task_id: task.id,
        user_id: person.user_id
      },
    }).then((res) => {
      setDropListMembersOpen(false)
      setMembers((prevValue) => ([...prevValue, res]))
    });
  }

  function deleteMember(person) {
    apiRequest("/task/del-user", {
      method: "DELETE",
      data: {
        task_id: task.id,
        user_id: person.user_id
      },
    }).then((res) => {
      setMembers(members.filter((item) => item.user_id !== person.user_id))
    });
  }

  useEffect(() => {
    apiRequest(`/comment/get-by-entity?entity_type=2&entity_id=${task.id}`).then((res) => {
      setComments(res)
      res.forEach((item) => {
        setCommentsEditOpen((prevValue) => ({...prevValue, [item.id]: false}))
        setCommentsEditText((prevValue) => ({...prevValue, [item.id]: item.text}))
        setSubCommentsCreateOpen((prevValue) => ({...prevValue, [item.id]: false}))
      })
    })
    apiRequest(`/timer/get-by-entity?entity_type=2&entity_id=${task.id}`).then((res) => {
      let timerSeconds = 0
      res.forEach((time) => {
        timerSeconds += time.deltaSeconds
        setCurrentTimerCount({
          hours: Math.floor(timerSeconds / 60 / 60),
          minute: Math.floor(timerSeconds / 60 % 60),
          seconds: timerSeconds % 60}
        )
        updateTimerHours = Math.floor(timerSeconds / 60 / 60)
        updateTimerMinute = Math.floor(timerSeconds / 60 % 60)
        updateTimerSec = timerSeconds % 60
        if (!time.stopped_at) {
          setTimerStart(true)
          startTimer()
          setTimerInfo(time)
        }
      })
    })
  }, [])

  function startTimer () {
    setTimerId(setInterval(() => {
      run()
    }, 1000))
  }

  let updateTimerSec = currentTimerCount.seconds, updateTimerMinute = currentTimerCount.minute, updateTimerHours = currentTimerCount.hours

  function run () {
    updateTimerSec++
    if (updateTimerSec > 60) {
      updateTimerMinute++
      updateTimerSec = 0
    }
    if (updateTimerMinute === 60) {
      updateTimerMinute = 0
      updateTimerHours++
    }

    return setCurrentTimerCount({
      hours: updateTimerHours,
      minute: updateTimerMinute,
      seconds: updateTimerSec
    })
  }

  function correctTimerTime (time) {
    if (time < 10) return `0${time}`
    if (time > 10) return time
  }


  useEffect(() => {
    let ids = members.map((user) => user.user_id)
    setUsers(projectUsers.reduce((acc, cur) => {
      if (!ids.includes(cur.user_id)) acc.push(cur)
      return acc
    }, []))
  }, [members])


  return (
    <div
      className={active ? "modal-tiket active" : "modal-tiket"}
      onClick={() => setActive(false)}
    >
      <div
        className="modal-tiket__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="content">
          <h3 className="title-project">
            <img src={category} className="title-project__category"></img>
            Проект: {projectName}
            <Link
              to={`/tracker/task/${task.id}`}
              className="title-project__full"
            >
              <img src={fullScreen}></img>
            </Link>
          </h3>

          <div className="content__task">
            <span>Задача</span>
            {editOpen ? <input value={inputsValue.title} onChange={(e) => {
              setInputsValue((prevValue) => ({...prevValue, title: e.target.value}))
            }} /> :<h5>{inputsValue.title}</h5>}
            <div className="content__description">
              {editOpen ? <input value={inputsValue.description} onChange={(e) => {
                setInputsValue((prevValue) => ({...prevValue, description: e.target.value}))
              }}/> :<p>{inputsValue.description}</p>}
              {/*<img src={taskImg} className="image-task"></img>*/}
            </div>
            <div className="content__communication">
              <p className="tasks">
                <button
                  onClick={() => {
                    dispatch(modalToggle("addSubtask"));
                    setAddSubtask(true);
                  }}
                >
                  <img src={plus}></img>
                  Добавить под задачу
                </button>
              </p>
              <p className="file">
                <button>
                  <img src={file}></img>
                  Загрузить файл
                </button>
                <span>{0}</span>
                Файлов
              </p>
            </div>
            <div className="content__input">
              <input placeholder="Оставить комментарий" value={inputsValue.comment} onChange={(e) => {
                setInputsValue((prevValue) => ({...prevValue, comment: e.target.value}))
              }} />
              <img src={send} onClick={createComment}></img>
            </div>
            <div className='comments__list'>
              {comments.map((comment) => {
                return <div className='comments__list__item' key={comment.id}>
                  <div className='comments__list__item__info'>
                    <div className='comments__list__item__fio'>
                      <img src={urlForLocal(comment.user.avatar)} alt='avatar' />
                      <p>{comment.user.fio}</p>
                    </div>
                    <div className='comments__list__item__date'>
                      <span>{getCorrectDate(comment.created_at)}</span>
                      <div className={commentsEditOpen[comment.id] ? 'edit edit__open' : 'edit'} >
                        <img src={edit} alt='edit' onClick={() => {
                          if (commentsEditOpen[comment.id]) {
                            editComment(comment.id)
                          }
                          setCommentsEditOpen((prevValue) => ({...prevValue, [comment.id]: !prevValue[comment.id]}))
                        }} />
                      </div>
                      <img src={del} alt='delete' onClick={() => deleteComment(comment.id)} />
                    </div>
                  </div>
                  {commentsEditOpen[comment.id] ? <input className='comments__list__item__text' value={commentsEditText[comment.id]} onChange={(e) =>  {
                    setCommentsEditText((prevValue) => ({...prevValue, [comment.id]: e.target.value}))
                  }} /> : <p className='comments__list__item__text'>{commentsEditText[comment.id]}</p>}
                  {subCommentsCreateOpen[comment.id] ?
                      <div className='comments__list__item__answer__new'>
                        <input />
                        <img src={accept} alt='accept'
                             onClick={() => {
                               setSubCommentsCreateOpen((prevValue) => ({...prevValue, [comment.id]: !prevValue[comment.id]}))
                             }}
                        />
                      </div>
                      :
                      <span onClick={() => {
                        setSubCommentsCreateOpen((prevValue) => ({...prevValue, [comment.id]: !prevValue[comment.id]}))
                      }} className='comments__list__item__answer'>Ответить</span>
                  }
                </div>
              })

              }
            </div>
          </div>
        </div>
        <div className="workers">
          <div className="workers_box task__info">
            <span className="exit" onClick={() => setActive(false)}></span>
            <span className='nameProject'>{task.title}</span>
            <p className="workers__creator">Создатель : {task.user?.fio}</p>

            {executor ?
              <div className='executor'>
                <p>Исполнитель: {executor.fio}</p>
                <img src={urlForLocal(executor.avatar)} alt='avatar' />
                <img src={close} className='delete' onClick={() => deleteTaskExecutor()} />
              </div> :
              <div className="add-worker moreItems ">
                <button onClick={() => setDropListOpen(true)}>+</button>
                <span>Добавить исполнителя</span>
                {dropListOpen &&
                  <div className='dropdownList'>
                    <img src={close} className='dropdownList__close' onClick={() => setDropListOpen(false)} />
                    {projectUsers.map((person) => {
                      return <div className='dropdownList__person' key={person.user_id} onClick={() => taskExecutor(person)}>
                        <span>{person.user.fio}</span>
                        <img src={urlForLocal(person.user.avatar)} />
                      </div>
                    })
                    }
                  </div>
                }
              </div>
            }

            {Boolean(members.length) &&
            <div className='members'>
              <p>Участники:</p>
                <div className='members__list'>
                  {members.map((member) => {
                    return <div className='worker' key={member.user_id}>
                      <p>{member.fio}</p>
                      <img src={urlForLocal(member.avatar)} />
                      <img src={close} className='delete' onClick={() => deleteMember(member)} />
                    </div>
                  })
                  }
                </div>
            </div>
            }

            <div className="add-worker moreItems">
              <button onClick={() => setDropListMembersOpen(true)}>+</button>
              <span>Добавить участников</span>
              {dropListMembersOpen &&
              <div className='dropdownList'>
                <img src={close} className='dropdownList__close' onClick={() => setDropListMembersOpen(false)} />
                {users.length ? users.map((person) => {
                  return <div className='dropdownList__person' key={person.user_id} onClick={() => addMember(person)}>
                    <span>{person.user.fio}</span>
                    <img src={urlForLocal(person.user.avatar)} />
                  </div>
                }) : <p className='noUsers'>Нет пользователей</p>
                }
              </div>
              }
            </div>
          </div>

          <div className="workers_box-middle">
            <div className="time">
              <img src={watch}></img>
              <span>Длительность : </span>
              <p>
                {correctTimerTime(currentTimerCount.hours)}:{correctTimerTime(currentTimerCount.minute)}:{correctTimerTime(currentTimerCount.seconds)}
              </p>
            </div>

            {timerStart ?
              <button className="stop" onClick={() => stopTaskTimer()}>
                Остановить
              </button>
                :
              <button className="start" onClick={() => startTaskTimer()}>
                Начать делать <img src={arrow}></img>
              </button>
            }
          </div>

          <div className="workers_box-bottom">
            <div className={editOpen ? 'edit' : ''} onClick={() => {
              if(editOpen) {
                setEditOpen(!editOpen)
                editTask()
              } else {
                setEditOpen(!editOpen)
              }
            }}>
              <img src={edit}></img>
              <p>{editOpen ? 'сохранить' : 'редактировать'}</p>
            </div>
            <div>
              <img src={link}></img>
              <p>ссылка на проект</p>
            </div>
            <div onClick={deleteTask}>
              <img src={archive}></img>
              <p>в архив</p>
            </div>
            <div onClick={deleteTask}>
              <img src={del}></img>
              <p>удалить</p>
            </div>
          </div>
        </div>
      </div>

      <TrackerModal
        active={addSubtask}
        setActive={setAddSubtask}
        defautlInput={task.column_id}
      ></TrackerModal>
    </div>
  );
};

export default ModalTiсket;
