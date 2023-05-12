import React, { useEffect, useState } from "react";

import { apiRequest } from "../../api/request";
import {
  getCorrectDate,
  getCreatedDate,
  hourOfNum,
} from "../../components/Calendar/calendarHelper";
import {
  getReportDate,
  getSendRequest,
  setSendRequest,
} from "../../redux/reportSlice";
import { useDispatch, useSelector } from "react-redux";

import "./shortReport.scss";

export const ShortReport = ({}) => {
  const reportDate = useSelector(getReportDate);

  const sendReport = useSelector(getSendRequest);
  const dispatch = useDispatch();

  const [taskText, setTaskText] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [tomorrowTask, setTomorrowTask] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
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
  }

  if (sendReport) {
    dispatch(setSendRequest(false));
    getReportFromDate(getCreatedDate(reportDate));
  }

  return (
    <div>
      <div className="viewReport__info short-report">
        <h2 className="viewReport__title">
          Ваши отчеты - <span>просмотр отчета за день</span>
        </h2>
        <div className="viewReport__bar">
          <h3 className="viewReport__bar__date">
            {getCorrectDate(reportDate)}
          </h3>
          <p className="viewReport__bar__hours">
            Вами потрачено на работу :{" "}
            <span>
              {totalHours} {hourOfNum(totalHours)}
            </span>
          </p>
        </div>
      </div>
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
    </div>
  );
};

export default ShortReport;
