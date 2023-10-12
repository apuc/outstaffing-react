import moment from "moment";
import "moment/locale/ru";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { getProfileInfo } from "@redux/outstaffingSlice";
import {
  getRequestDates,
  setReportDate,
  setRequestDate,
} from "@redux/reportSlice";

import { urlForLocal } from "@utils/helper";

import { apiRequest } from "@api/request";

import { getReports } from "@components/Calendar/calendarHelper";
import { Footer } from "@components/Common/Footer/Footer";
import { Loader } from "@components/Common/Loader/Loader";
import { Navigation } from "@components/Navigation/Navigation";
import { ProfileBreadcrumbs } from "@components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { ProfileHeader } from "@components/ProfileHeader/ProfileHeader";

import { ProfileCalendarComponent } from "./ProfileCalendarComponent";
import "./profileCalendar.scss";

export const ProfileCalendar = () => {
  if (localStorage.getItem("role_status") === "18") {
    return <Navigate to="/profile" replace />;
  }
  const dispatch = useDispatch();
  const profileInfo = useSelector(getProfileInfo);
  const requestDates = useSelector(getRequestDates);
  const [value, setValue] = useState(moment());
  const [reports, setReports] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [loader, setLoader] = useState(true);
  const [startRangeDays, setStartRangeDays] = useState(false);
  const [startDate, setStartDate] = useState(null);

  function setValueHandler(value) {
    setValue(value);
  }

  function setStartDateRange (date) {
    setStartDate(date)
  }

  function toggleStartRangeDays() {
    setStartRangeDays(!startRangeDays);
  }

  useEffect(() => {
    dispatch(setRequestDate(getReports(moment())));
  }, []);

  useEffect(() => {
    setLoader(true);
    if (!requestDates) {
      return;
    }
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
      setTotalHours(spendTime);
      setReports(reports);
      setLoader(false);
    });
  }, [requestDates]);

  return (
    <div className="profile__calendar">
      <ProfileHeader />
      <Navigation />
      <div className="container">
        <ProfileBreadcrumbs
          links={[
            { name: "Главная", link: "/profile" },
            { name: "Ваша отчетность", link: "/profile/calendar" },
          ]}
        />
        <h2 className="summary__title">Ваши отчеты</h2>
        <div className="summary__info">
          <div className="summary__person">
            <img
              src={urlForLocal(profileInfo.photo)}
              className="summary__avatar"
              alt="avatar"
            />
            <p className="summary__name">
              {profileInfo.fio}, {profileInfo.specification} разработчик
            </p>
          </div>
          <Link to="/report">
            <button
              className="calendar__btn"
              onClick={() => {
                dispatch(setReportDate(""));
              }}
            >
              Заполнить отчет за день
            </button>
          </Link>
        </div>
        {loader ? (
          <div className="loader__wrapper">
            <Loader height={80} width={80} />
          </div>
        ) : (
          <div className="row calendar__wrapper">
            <div className="col-12 col-xl-12">
              <ProfileCalendarComponent
                setValueHandler={setValueHandler}
                value={value}
                reports={reports}
                totalHours={totalHours}
                startRangeDays={startRangeDays}
                toggleRangeDays={toggleStartRangeDays}
                startDate={startDate}
                setStartDateRange={setStartDateRange}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
