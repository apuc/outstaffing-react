import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

import CalendarComponent from "./CalendarComponent";
import { currentMonth } from "./calendarHelper";
import { Footer } from "../Footer/Footer";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { urlForLocal } from "../../helper";
import { selectCurrentCandidate } from "../../redux/outstaffingSlice";

import rectangle from "../../assets/images/rectangle_secondPage.png";

import "./calendar.scss";

const Calendar = () => {
  if (localStorage.getItem("role_status") !== "18") {
    return <Navigate to="/profile" replace />;
  }

  const candidateForCalendar = useSelector(selectCurrentCandidate);

  const [month, setMonth] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setMonth(currentMonth);
  }, [month]);

  const { name, skillsName, photo } = candidateForCalendar;

  const abbreviatedName = name && name.substring(0, name.lastIndexOf(" "));

  return (
    <div className="container">
      <section className="calendar">
        <div className="row">
          <div className="calendar__header">
            <h2 className="calendar__profile">
              Добрый день, <span>Александр !</span>
            </h2>
            <LogoutButton />
          </div>
          <div className="col-12 col-xl-12 d-flex justify-content-between align-items-center flex-column flex-sm-row">
            <div className="calendar__info">
              {photo && (
                <img
                  className="calendar__info-img"
                  src={urlForLocal(photo)}
                  alt="img"
                />
              )}
              <h3 className="calendar__info-name">{abbreviatedName}</h3>
            </div>
            <div className="calendar__title">
              <h3 className="calendar__title-text">{skillsName} разработчик</h3>
              <img className="calendar__title-img" src={rectangle} alt="img" />
            </div>
            <div>
              <Link to="/report">
                <button className="calendar__btn">
                  Заполнить отчет за день
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-xl-12">
            <CalendarComponent
              onSelect={() => {
                navigate("/report/0");
              }}
            />
            <p className="calendar__hours">
              {month} : <span> 60 часов </span>
            </p>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
};

export default Calendar;
