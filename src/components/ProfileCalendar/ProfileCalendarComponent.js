import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  setReportDate,
  setRequestDate,
  setSendRequest,
} from "../../redux/reportSlice";
import {
  calendarHelper,
  currentMonthAndDay,
  getReports,
  hourOfNum,
} from "../Calendar/calendarHelper";
import ShortReport from "../ShortReport/ShortReport";

import arrow from "../../images/arrowCalendar.png";
import rectangle from "../../images/rectangle__calendar.png";
import calendarIcon from "../../images/calendar.svg";
import moment from "moment";

import "moment/locale/ru";
import "./../Calendar/calendarComponent.scss";

export const ProfileCalendarComponent = React.memo(
  ({ value, setValueHandler, reports, totalHours }) => {
    const dispatch = useDispatch();

    const [currentDay] = useState(moment());
    const [calendar, setCalendar] = useState([]);
    const [month, setMonth] = useState("");
    const [shortReport, setShortReport] = useState(false);

    useEffect(() => {
      setCalendar(calendarHelper(value));
    }, [value]);

    useEffect(() => {
      setMonth(value.format("MMMM"));
    }, [month]);

    function isToday(day) {
      return day.isSame(new Date(), "day");
    }

    function correctDay(day) {
      if (day < 10) {
        return `0${day}`;
      }
      return day;
    }

    function dayStyles(day) {
      if (currentDay < day) return `block`;
      for (const date of reports) {
        if (
          `${new Date(day).getFullYear()}-${correctDay(
            new Date(day).getMonth() + 1
          )}-${correctDay(new Date(day).getDate())}` === date.created_at
        ) {
          return `before`;
        }
      }
      if (day.day() === 6 || day.day() === 0) return `selected`;
      if (isToday(day)) return `today`;
      return "pass";
    }

    function correctRoute(day) {
      for (const date of reports) {
        if (
          `${new Date(day).getFullYear()}-${correctDay(
            new Date(day).getMonth() + 1
          )}-${correctDay(new Date(day).getDate())}` === date.created_at
        ) {
          return "#";
        }
      }
      return "../../report";
    }

    function prevMonth() {
      return value.clone().subtract(1, "month");
    }

    function nextMonth() {
      return value.clone().add(1, "month");
    }

    return (
      <div className="calendar-component">
        <div className="calendar-component__header">
          <div className="calendar-component__header-info">
            <h3>Мои отчеты:</h3>
            <p className="calendar__hours">
              {month}&nbsp;
              <span>
                {totalHours} {hourOfNum(totalHours)}{" "}
              </span>
            </p>
          </div>
          <div className="calendar-component__header-switcher">
            <div
              className="calendar-component__header-box"
              onClick={() => {
                setValueHandler(prevMonth());
                dispatch(setRequestDate(getReports(prevMonth())));
              }}
            >
              <img src={arrow} alt="" />
              <span>{prevMonth().format("MMMM")}</span>
            </div>
            <div className="calendar-component__header-box">
              <span>{value.format("YYYY")}</span>
            </div>
            <div
              className="calendar-component__header-box"
              onClick={() => {
                setValueHandler(nextMonth());
                dispatch(setRequestDate(getReports(nextMonth())));
              }}
            >
              <span>{nextMonth().format("MMMM")}</span>
              <img src={arrow} alt="" />
            </div>
          </div>
        </div>

        <div className="calendar-component__rectangle">
          <img src={rectangle} alt="" />
        </div>

        <div className="calendar-component__body">
          <div>
            <p>Пн</p>
            <p>Вт</p>
            <p>Ср</p>
            <p>Чт</p>
            <p>Пт</p>
            <p>Сб</p>
            <p>Вс</p>
          </div>

          <div className="calendar-component__form">
            {calendar.map((week) =>
              week.map((day) => (
                <button
                  onClick={() => {
                    dispatch(setReportDate(day));
                    setShortReport(true);
                    dispatch(setSendRequest(true));
                  }}
                  key={day}
                  className={dayStyles(day)}
                  name={day.format("dddd")}
                  id="btn"
                >
                  <Link to={correctRoute(day)}>
                    <img
                      className={"calendar__icon"}
                      src={calendarIcon}
                      alt=""
                    />
                    {currentMonthAndDay(day)}
                  </Link>
                </button>
              ))
            )}
          </div>
        </div>

        {shortReport && <ShortReport />}
      </div>
    );
  }
);
