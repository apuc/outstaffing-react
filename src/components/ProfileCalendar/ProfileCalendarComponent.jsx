import moment from "moment";
import "moment/locale/ru";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  setReportDate,
  setRequestDate,
  setSendRequest,
} from "@redux/reportSlice";

import { getCorrectYYMMDD } from "@utils/helper";

import { apiRequest } from "@api/request";

import "@components/Calendar/calendarComponent.scss";
import {
  calendarHelper,
  currentMonthAndDay,
  getCorrectDate,
  getReports,
  hourOfNum,
} from "@components/Calendar/calendarHelper";
import ShortReport from "@components/ShortReport/ShortReport";

import arrow from "assets/icons/arrows/arrowCalendar.png";
import calendarIcon from "assets/icons/calendar.svg";
import rectangle from "assets/images/rectangle__calendar.png";
import close from "assets/icons/closeProjectPersons.svg";

// eslint-disable-next-line react/display-name
export const ProfileCalendarComponent = React.memo(
  ({ value, setValueHandler, reports, totalHours }) => {
    const dispatch = useDispatch();

    const [currentDay] = useState(moment());
    const [calendar, setCalendar] = useState([]);
    const [month, setMonth] = useState("");
    const [shortReport, setShortReport] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startRangeDays, setStartRangeDays] = useState(false)
    const [totalRangeHours, setTotalRangeHours] = useState(0);
    const [selectedRangeDays, setSelectedRangeDays] = useState({})

    useEffect(() => {
      setCalendar(calendarHelper(value));
      calendarHelper(value).map((array) => {
          setSelectedRangeDays((prevState) => ({...prevState, [array[0]]: false}))
      })
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

    function reportsByDate(endDay) {
      const requestDates = `fromDate=${getCorrectYYMMDD(startDate._d)}&toDate=${getCorrectYYMMDD(endDay._d)}`;
      apiRequest(
        `/reports/reports-by-date?${requestDates}&user_card_id=${localStorage.getItem(
          "cardId"
        )}`
      ).then((reports) => {
        let spendTime = 0;
        for (const report of reports) {
          report.task.map((task) => {
            if (task.hours_spent) {
              spendTime += Number(task.hours_spent);
            }
          });
        }
        setTotalRangeHours(spendTime);
      });
    }

    function rangeDays (day) {
        if (!startDate) {
            setStartDate(day)
        } else {
            setEndDate(day)
            reportsByDate(day)
        }
    }

    function onMouseRangeDays (day) {
        let selectRange = {}
        for (let curDay in selectedRangeDays) {
            if (day > startDate && new Date(curDay) > startDate && new Date(curDay) < day) {
                selectRange[curDay] = true
            } else {
                selectRange[curDay] = false
            }
        }
        setSelectedRangeDays(selectRange)
    }

    function resetRangeDays () {
        setStartDate(null)
        setEndDate(null)
        setTotalRangeHours(0)
        calendarHelper(value).map((array) => {
            setSelectedRangeDays((prevState) => ({...prevState, [array[0]]: false}))
        })
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
                    if(startRangeDays) {
                        rangeDays(day)
                    } else {
                        dispatch(setReportDate(day));
                        setShortReport(true);
                        dispatch(setSendRequest(true));
                    }
                  }}
                  onMouseEnter={() => {
                      if (startRangeDays && startDate && !endDate) {
                          onMouseRangeDays(day)
                      }
                  }}
                  key={day}
                  className={startRangeDays ?
                      `selectDays ${startDate === day || endDate === day ? 'selectedDay' : ''} ${endDate ? 'disable' : ''} ${selectedRangeDays[day] ? 'selectedDay' : ''}`
                      : dayStyles(day)}
                  name={day.format("dddd")}
                  id="btn"
                >
                  <Link to={startRangeDays ? '#' : correctRoute(day)}>
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
        <div className="selectDateRange">
          <span
            className="select"
            onClick={() => {
                if (startRangeDays) resetRangeDays()
                setStartRangeDays(!startRangeDays)
            }}
          >
            {endDate
              ? `${getCorrectDate(startDate)} - ${getCorrectDate(endDate)}`
              : "Выбрать диапазон"}
          </span>
          <span>
            {totalRangeHours
              ? `${totalRangeHours} ${hourOfNum(totalRangeHours)}`
              : "0 часов"}
          </span>
            {endDate &&
                <img className='close' src={close} alt='close' onClick={() => {
                    resetRangeDays()
                }} />
            }
        </div>
        {shortReport && <ShortReport />}
      </div>
    );
  }
);
