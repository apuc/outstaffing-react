import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { getReportDate } from "../../redux/reportSlice";

import { Loader } from "../../components/Loader/Loader";
import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import { ProfileBreadcrumbs } from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { Footer } from "../../components/Footer/Footer";

import { apiRequest } from "../../api/request";
import {
  getCorrectDate,
  getCreatedDate,
  hourOfNum,
} from "../../components/Calendar/calendarHelper";

import arrow from "../../images/right-arrow.png";
import arrowSwitchDate from "../../images/arrowViewReport.png";

import "./viewReport.scss";
import { Navigation } from "../../components/Navigation/Navigation";

export const ViewReport = () => {
  if (localStorage.getItem("role_status") === "18") {
    return <Navigate to="/profile" replace />;
  }
  const reportDate = useSelector(getReportDate); // :D

  const dateReport = useParams();
  const [testReportDay] = useState(new Date(dateReport.id));

  const [taskText, setTaskText] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [tomorrowTask, setTomorrowTask] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [reportDay] = useState(new Date(getCreatedDate(reportDate))); ///
  const [currentDay] = useState(new Date());
  const [loader, setLoader] = useState(false);

  function getReportFromDate(day) {
    setLoader(true);
    setTaskText([]);
    setDifficulties([]);
    setTomorrowTask([]);
    apiRequest(
      `reports/find-by-date?user_card_id=${localStorage.getItem(
        "cardId"
      )}&date=${day}`
    ).then((res) => {
      console.log(res);
      let spendTime = 0;

      for (const item of res) {
        if (item.difficulties) {
          setDifficulties((prevArray) => [...prevArray, item.difficulties]);
        }
        if (item.tomorrow) {
          setTomorrowTask((prevArray) => [...prevArray, item.tomorrow]);
        }
        item.task.map((task) => {
          const taskInfo = {
            hours: task.hours_spent,
            task: task.task,
            id: task.id,
          };
          if (task.hours_spent) {
            spendTime += Number(task.hours_spent);
          }
          setTaskText((prevArray) => [...prevArray, taskInfo]);
        });
      }
      setTotalHours(spendTime);
      setLoader(false);
    });
    testReportDay.setDate(testReportDay.getDate() - 1);
  }

  function nextDay() {
    reportDay.setDate(reportDay.getDate() + 1);
    getReportFromDate(getCreatedDate(reportDay));
  }

  function previousDay() {
    getReportFromDate(getCreatedDate(testReportDay));
  }

  useEffect(() => {
    getReportFromDate(dateReport.id);
    console.log(dateReport.id);
  }, []);

  return (
    <div className="viewReport">
      <ProfileHeader />
      <Navigation />
      <div className="container">
        <div className="viewReport__info">
          <ProfileBreadcrumbs
            links={[
              { name: "Главная", link: "/profile" },
              { name: "Ваша отчетность", link: "/profile/calendar" },
              { name: "Просмотр отчета за день", link: "/profile/view" },
            ]}
          />
          <h2 className="viewReport__title">
            Ваши отчеты - <span>просмотр отчета за день</span>
          </h2>
          <Link className="viewReport__back" to={`/profile/calendar`}>
            <img src={arrow} alt="arrow" />
            <p>Вернуться</p>
          </Link>
          <div className="viewReport__bar">
            <h3 className="viewReport__bar__date">
              {getCorrectDate(dateReport.id)}
            </h3>
            <p className="viewReport__bar__hours">
              Вами потрачено на работу :{" "}
              <span>
                {totalHours} {hourOfNum(totalHours)}
              </span>
            </p>
          </div>
        </div>
        <div className="viewReport__switchDate">
          <div
            onClick={() => {
              previousDay();
            }}
          >
            <Link to={`../view/${getCreatedDate(testReportDay)}`}>
              <div className="viewReport__switchDate__prev switchDate">
                <img src={arrowSwitchDate} alt="arrow" />
              </div>
            </Link>
          </div>

          <p>{getCorrectDate(dateReport.id)}</p>

          <div>
            <Link to={`../view/${0}`}>
              <div
                className={`viewReport__switchDate__next switchDate ${
                  getCreatedDate(currentDay) === getCreatedDate(reportDay)
                    ? "disable"
                    : ""
                }`}
                onClick={() => nextDay()}
              >
                <img src={arrowSwitchDate} alt="arrow" />
              </div>
            </Link>
          </div>
        </div>
        {loader && <Loader width={75} height={75} />}
        {Boolean(taskText.length) && (
          <div className="viewReport__content">
            <div className="table__container">
              <table className="viewReport__done">
                <thead>
                  <tr>
                    <th>
                      <p>Какие задачи были выполнены?</p>
                    </th>
                    <th>
                      <p>Время</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {taskText.length &&
                    taskText.map((task, index) => {
                      return (
                        <tr key={task.id}>
                          <td>
                            <p>
                              {index + 1}. {task.task}
                            </p>
                          </td>
                          <td>
                            <div className="viewReport__done__hours__item">
                              <span>{task.hours}</span>
                              <p className="hours">
                                {hourOfNum(task.hours)} на задачу
                              </p>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  <tr>
                    <td></td>
                    <td>
                      <span>
                        Всего: {totalHours} {hourOfNum(totalHours)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {Boolean(difficulties.length) && (
              <div className="viewReport__item">
                <h3>Какие сложности возникли?</h3>
                {difficulties.map((item, index) => {
                  return <p key={index}>{item}</p>;
                })}
              </div>
            )}
            {Boolean(tomorrowTask.length) && (
              <div className="viewReport__item">
                <h3>Что планируется сделать завтра?</h3>
                {tomorrowTask.map((item, index) => {
                  return <p key={index}>{item}</p>;
                })}
              </div>
            )}
          </div>
        )}
        {!Boolean(taskText.length) && !loader && (
          <div className="viewReport__noTask">
            <p>
              В этот день вы <span>не заполняли</span> отчет
            </p>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};
