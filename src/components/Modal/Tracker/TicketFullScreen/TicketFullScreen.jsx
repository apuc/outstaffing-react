import React, { useEffect, useState } from "react";

import { ProfileHeader } from "../../../ProfileHeader/ProfileHeader";
import { ProfileBreadcrumbs } from "../../../ProfileBreadcrumbs/ProfileBreadcrumbs";
import { Footer } from "@components/Common/Footer/Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import TrackerModal from "../../../Modal/TrackerModal/TrackerModal";
import TrackerTaskComment from "../../../TrackerTaskComment/TrackerTaskComment";
import { Navigation } from "../../../Navigation/Navigation";
import {Loader} from "@components/Common/Loader/Loader";

import {useDispatch, useSelector} from "react-redux";
import {
  deletePersonOnProject,
  modalToggle,
  setProjectBoardFetch,
  setToggleTab,
  getProjectBoard,
  getBoarderLoader,
} from "../../../../redux/projectsTrackerSlice";
import { apiRequest } from "../../../../api/request";

import project from "../../../../assets/icons/trackerProject.svg";
import watch from "../../../../assets/icons/watch.svg";
import file from "../../../../assets/icons/fileModal.svg";
import send from "../../../../assets/icons/send.svg";
import arrow2 from "../../../../assets/icons/arrows/arrowStart.png";
import plus from "../../../../assets/icons/plus.svg";
import tasks from "../../../../assets/icons/trackerTasks.svg";
import archive from "../../../../assets/icons/archive.svg";
import arrow from "../../../../assets/icons/arrows/arrowCalendar.png";
import link from "../../../../assets/icons/link.svg";
import archive2 from "../../../../assets/icons/archive.svg";
import del from "../../../../assets/icons/delete.svg";
import edit from "../../../../assets/icons/edit.svg";
import close from "../../../../assets/icons/close.png";

import "./ticketFullScreen.scss";

import {getCorrectRequestDate, urlForLocal} from "../../../../utils/helper";

export const TicketFullScreen = ({}) => {
  const [modalAddWorker, setModalAddWorker] = useState(false);
  const ticketId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projectBoard = useSelector(getProjectBoard);
  const boardLoader = useSelector(getBoarderLoader);
  const [taskInfo, setTaskInfo] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [inputsValue, setInputsValue] = useState({});
  const [loader, setLoader] = useState(true);
  const [comments, setComments] = useState([]);
  const [personListOpen, setPersonListOpen] = useState(false)
  const [timerStart, setTimerStart] = useState(false)
  const [timerInfo, setTimerInfo] = useState({})

  useEffect(() => {
    apiRequest(`/task/get-task?task_id=${ticketId.id}`).then((taskInfo) => {
      setTaskInfo(taskInfo);
      setInputsValue({title: taskInfo.title, description: taskInfo.description, comment: ''})
      apiRequest(`/comment/get-by-entity?entity_type=2&entity_id=${taskInfo.id}`).then((res) => {
        const comments = res.reduce((acc, cur) => {
          if (!cur.parent_id) {
            acc.push({...cur, subComments: []})
          } else {
            acc.forEach((item) => {
              if (item.id === cur.parent_id) item.subComments.push(cur)
            })
          }
          return acc
        }, [])
        setComments(comments)
      })
      taskInfo.timers.forEach((time) => {
        if (!time.stopped_at) {
          setTimerStart(true)
          setTimerInfo(time)
        }
      })
      dispatch(setProjectBoardFetch(taskInfo.project_id));
      setLoader(boardLoader)
    });
  }, []);

  function deleteTask() {
    apiRequest("/task/update-task", {
      method: "PUT",
      data: {
        task_id: ticketId.id,
        status: 0,
      },
    }).then(() => {
      navigate(`/tracker/project/${taskInfo.project_id}`);
    });
  }

  function editTask() {
    apiRequest("/task/update-task", {
      method: "PUT",
      data: {
        task_id: taskInfo.id,
        title: inputsValue.title,
        description: inputsValue.description
      },
    }).then(() => {
    });
  }

  function createComment() {
    apiRequest("/comment/create", {
      method: "POST",
      data: {
        text: inputsValue.comment,
        entity_type: 2,
        entity_id: taskInfo.id
      }
    }).then((res) => {
      let newComment = res
      newComment.created_at = new Date()
      newComment.subComments = []
      setInputsValue((prevValue) => ({...prevValue, comment: ''}))
      setComments((prevValue) => ([...prevValue, newComment]))
    })
  }

  function startTaskTimer() {
    apiRequest("/timer/create", {
      method: "POST",
      data: {
        entity_type: 2,
        entity_id: taskInfo.id,
        created_at: getCorrectRequestDate(new Date())
      }
    }).then((res) => {
      setTimerStart(true)
      setTimerInfo(res)
    })
  }

  function stopTaskTimer() {
    apiRequest("/timer/update", {
      method: "PUT",
      data: {
        timer_id: timerInfo.id,
        stopped_at: getCorrectRequestDate(new Date())
      }
    }).then(() => setTimerStart(false))
  }

  function deletePerson(userId) {
    apiRequest("/project/del-user", {
      method: "DELETE",
      data: {
        project_id: projectBoard.id,
        user_id: userId
      },
    }).then(() => {
      dispatch(deletePersonOnProject(userId))
    });
  }

  function commentDelete(comment) {
    setComments((prevValue) => prevValue.filter((item) => item.id !== comment.id))
    if (comment.subComments.length) {
      comment.subComments.forEach((subComment) => {
        apiRequest("/comment/update", {
          method: "PUT",
          data: {
            comment_id: subComment.id,
            status: 0
          }
        }).then(() => {
        })
      })
    }
  }

  function addSubComment(commentId, subComment) {
    const addSubComment = comments
    addSubComment.forEach((comment) => {
      if (comment.id === commentId) {
        comment.subComments.push(subComment)
      }
    })
    setComments(addSubComment)
  }

  function subCommentDelete(subComment) {
    const deleteSubComment = comments
    deleteSubComment.forEach((comment, index) => {
      if (comment.id === subComment.parent_id) {
        deleteSubComment[index].subComments = comment.subComments.filter((item) => item.id !== subComment.id)
      }
    })
    setComments([...deleteSubComment])
  }

  const toggleTabs = (index) => {
    dispatch(setToggleTab(index));
  };

  return (
      <section className="ticket-full-screen">
        <ProfileHeader />
        <Navigation />
        <div className="container">
          <div className="tracker__content">
            <ProfileBreadcrumbs
                links={[
                  { name: "Главная", link: "/profile" },
                  { name: "Трекер", link: "/profile/tracker" },
                ]}
            />
            <h2 className="tracker__title">Управление проектами с трекером</h2>
          </div>
        </div>
        <div className="tracker__tabs">
          <div className="tracker__tabs__head">
            <Link
                to="/profile/tracker"
                className="tab active-tab"
                onClick={() => toggleTabs(1)}
            >
              <img src={project} alt="img" />
              <p>Проекты </p>
            </Link>
            <Link
                to="/profile/tracker"
                className="tab"
                onClick={() => toggleTabs(2)}
            >
              <img src={tasks} alt="img" />
              <p>Все мои задачи</p>
            </Link>
            <Link
                to="/profile/tracker"
                className="tab"
                onClick={() => toggleTabs(3)}
            >
              <img src={archive} alt="img" />
              <p>Архив</p>
            </Link>
          </div>
          {loader ? <Loader /> :
              <>
                <div className="tracker__tabs__content content-tabs">
                  <div className="tasks__head">
                    <div className="tasks__head__wrapper">
                      <h4>Проект : {projectBoard.name}</h4>

                      <TrackerModal
                          active={modalAddWorker}
                          setActive={setModalAddWorker}
                      ></TrackerModal>

                      <div className="tasks__head__persons">
                        {/*<img src={avatarTest} alt="avatar" />*/}
                        {/*<img src={avatarTest} alt="avatar" />*/}
                        <span className="countPersons">{projectBoard.projectUsers?.length}</span>
                        <span
                            className="addPerson"
                            onClick={() => {
                              setPersonListOpen(true)
                            }}
                        >
                  +
                </span>
                        <p>добавить участника</p>
                        {personListOpen &&
                            <div className='persons__list'>
                              <img className='persons__list__close' src={close} alt='close' onClick={() => setPersonListOpen(false)} />
                              <div className='persons__list__count'><span>{projectBoard.projectUsers?.length}</span>участник</div>
                              <div className='persons__list__info'>В проекте - <span>“{projectBoard.name}”</span></div>
                              <div className='persons__list__items'>
                                {projectBoard.projectUsers?.map((person) => {
                                  return <div className='persons__list__item' key={person.user_id}>
                                    <img className='avatar' src={urlForLocal(person.user.avatar)} alt='avatar' />
                                    <span>{person.user.fio}</span>
                                    <img className='delete' src={close} alt='delete' onClick={() => deletePerson(person.user_id)}/>
                                  </div>
                                })
                                }
                              </div>
                              <div className='persons__list__add'
                                   onClick={() => {
                                     dispatch(modalToggle("addWorker"));
                                     setModalAddWorker(true);
                                     setPersonListOpen(false)
                                   }}
                              >
                                <span className='addPerson'>+</span>
                                <p>Добавить участников</p>
                              </div>
                            </div>
                        }
                      </div>
                      <Link to={`/profile/tracker`} className="link">
                        <div className="tasks__head__back">
                          <p>Вернуться на проекты</p>
                          <img src={arrow} alt="arrow" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="modal-tiket__content ticket">
                  <div className="content ticket-whith">
                    <div className="content__task">
                      <span>Задача</span>
                      {editOpen ? <input value={inputsValue.title} onChange={(e) => {
                        setInputsValue((prevValue) => ({...prevValue, title: e.target.value}))
                      }} /> :<h5>{inputsValue.title}</h5>}
                      <div className="content__description">
                        {editOpen ? <input value={inputsValue.description} onChange={(e) => {
                          setInputsValue((prevValue) => ({...prevValue, description: e.target.value}))
                        }}/> :<p>{inputsValue.description}</p>}
                        {/*<img src={task} className="image-task"></img>*/}
                      </div>
                      <div className="content__communication">
                        <p className="tasks">
                          <button
                              onClick={() => {
                                dispatch(modalToggle("addSubtask"));
                                setModalAddWorker(true);
                              }}
                          >
                            <img src={plus} alt='plus'></img>
                            Добавить под задачу
                          </button>
                        </p>
                        <p className="file">
                          <button>
                            <img src={file} alt='file'></img>
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
                        <img src={send} onClick={createComment} alt='send'></img>
                      </div>
                      <div className='comments__list'>
                        {comments.map((comment) => {
                          return <TrackerTaskComment
                              key={comment.id}
                              taskId={taskInfo.id}
                              comment={comment}
                              commentDelete={commentDelete}
                              addSubComment={addSubComment}
                              subCommentDelete={subCommentDelete}
                          />
                        })

                        }
                      </div>
                    </div>
                  </div>
                  <div className="workers">
                    <div className="workers_box">
                      <p className="workers__creator">
                        Создатель : <span>{taskInfo.user?.fio}</span>
                      </p>
                      <div>
                        {Boolean(taskInfo.taskUsers?.length) &&
                            taskInfo.taskUsers.map((worker, index) => {
                              return (
                                  <div className="worker" key={index}>
                                    <img src={worker.avatar} alt='worket'></img>
                                    <p>{worker.name}</p>
                                  </div>
                              );
                            })}
                      </div>

                      <div className="add-worker moreItems">
                        <button
                            onClick={() => {
                              dispatch(modalToggle("addWorker"));
                              setModalAddWorker(true);
                            }}
                        >
                          +
                        </button>
                        <span>Добавить исполнителя</span>
                      </div>
                      <div className="add-worker moreItems">
                        <button
                            onClick={() => {
                              dispatch(modalToggle("addWorker"));
                              setModalAddWorker(true);
                            }}
                        >
                          +
                        </button>
                        <span>Добавить участников</span>
                      </div>
                    </div>

                    <div className="workers_box-middle">
                      <div className="time">
                        <img src={watch} alt='watch'></img>
                        <span>Длительность : </span>
                        <p>{"0:00:00"}</p>
                      </div>

                      {timerStart ?
                          <button className="stop" onClick={() => stopTaskTimer()}>
                            Остановить
                          </button>
                          :
                          <button className={taskInfo.executor_id === Number(localStorage.getItem('id')) ? 'start' : 'start disable'} onClick={() => startTaskTimer()}>
                            Начать делать <img src={arrow2} alt='arrow'></img>
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
                        <img src={edit} alt='edit'></img>
                        <p>{editOpen ? 'сохранить' : 'редактировать'}</p>
                      </div>
                      <div>
                        <img src={link} alt='link'></img>
                        <p>ссылка на проект</p>
                      </div>
                      <div>
                        <img src={archive2} alt='arch'></img>
                        <p>в архив</p>
                      </div>
                      <div onClick={deleteTask}>
                        <img src={del} alt='delete'></img>
                        <p>удалить</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
          }
        </div>
        <Footer />
      </section>
  );
};

export default TicketFullScreen;
