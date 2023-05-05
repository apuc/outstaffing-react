import React, { useEffect, useState } from "react";

import { ProfileHeader } from "../../ProfileHeader/ProfileHeader";
import { ProfileBreadcrumbs } from "../../ProfileBreadcrumbs/ProfileBreadcrumbs";
import { Footer } from "../../Footer/Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import TrackerModal from "../TrackerModal/TrackerModal";
import { Navigation } from "../../Navigation/Navigation";

import { useDispatch } from "react-redux";
import { modalToggle, setToggleTab } from "../../../redux/projectsTrackerSlice";
import { apiRequest } from "../../../api/request";

import project from "../../../images/trackerProject.svg";
import watch from "../../../images/watch.png";
import file from "../../../images/fileModal.svg";
import task from "../../../images/tasksMock.png";
import send from "../../../images/send.svg";
import arrow2 from "../../../images/arrowStart.png";
import plus from "../../../images/plus.svg";
import tasks from "../../../images/trackerTasks.svg";
import archive from "../../../images/archiveTracker.svg";
import selectArrow from "../../../images/select.svg";
import avatarTest from "../../../images/AvatarTest .png";
import arrow from "../../../images/arrowCalendar.png";
import link from "../../../images/link.svg";
import archive2 from "../../../images/archive.svg";
import del from "../../../images/delete.svg";
import edit from "../../../images/edit.svg";

import "./ticketFullScreen.scss";

export const TicketFullScreen = ({}) => {
  const [modalAddWorker, setModalAddWorker] = useState(false);
  const ticketId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [projectInfo, setProjectInfo] = useState({});
  const [taskInfo, setTaskInfo] = useState({});

  useEffect(() => {
    apiRequest(`/task/get-task?task_id=${ticketId.id}`).then((taskInfo) => {
      setTaskInfo(taskInfo);
      apiRequest(`/project/get-project?project_id=${taskInfo.project_id}`).then(
        (project) => {
          setProjectInfo(project);
        }
      );
    });
  }, []);

  function deleteTask() {
    apiRequest("/task/update-task", {
      method: "PUT",
      data: {
        task_id: ticketId.id,
        status: 0,
      },
    }).then((res) => {
      navigate(`/tracker/project/${taskInfo.project_id}`);
    });
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
        <div className="tracker__tabs__content content-tabs">
          <div className="tasks__head">
            <div className="tasks__head__wrapper">
              <h4>Проект : {projectInfo.name}</h4>

              <TrackerModal
                active={modalAddWorker}
                setActive={setModalAddWorker}
              ></TrackerModal>

              <div className="tasks__head__persons">
                <img src={avatarTest} alt="avatar" />
                <img src={avatarTest} alt="avatar" />
                <span className="countPersons">+9</span>
                <span
                  className="addPerson"
                  onClick={() => {
                    dispatch(modalToggle("addWorker"));
                    setModalAddWorker(true);
                  }}
                >
                  +
                </span>
                <p>добавить участника в проект</p>
              </div>
              <div className="tasks__head__select">
                <span>Учавствую</span>
                <img src={selectArrow} alt="arrow" />
              </div>
              <div className="tasks__head__select">
                <span>Мои</span>
                <img src={selectArrow} alt="arrow" />
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
              <h5>{taskInfo.title}</h5>
              <div className="content__description">
                <p>{taskInfo.description}</p>
                <img src={task} className="image-task"></img>
                <p>{taskInfo.description}</p>
              </div>
              <div className="content__communication">
                <p className="tasks">
                  <button
                    onClick={() => {
                      dispatch(modalToggle("addSubtask"));
                      setModalAddWorker(true);
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
                <input placeholder="Оставить комментарий"></input>
                <img src={send}></img>
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
                        <img src={worker.avatar}></img>
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
                <span>Добавить участников</span>
              </div>
            </div>

            <div className="workers_box-middle">
              <div className="time">
                <img src={watch}></img>
                <span>Длительность : </span>
                <p>{"8:30:22"}</p>
              </div>

              <button className="start">
                Начать делать <img src={arrow2}></img>
              </button>
            </div>

            <div className="workers_box-bottom">
              <div>
                <img src={edit}></img>
                <p>редактировать</p>
              </div>
              <div>
                <img src={link}></img>
                <p>ссылка на проект</p>
              </div>
              <div>
                <img src={archive2}></img>
                <p>в архив</p>
              </div>
              <div onClick={deleteTask}>
                <img src={del}></img>
                <p>удалить</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default TicketFullScreen;
