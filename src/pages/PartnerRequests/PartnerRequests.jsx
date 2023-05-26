import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setPartnerRequestId,
  setPartnerRequests,
} from "../../redux/outstaffingSlice";
import { apiRequest } from "../../api/request";

import { Navigation } from "../../components/Navigation/Navigation";
import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import { ProfileBreadcrumbs } from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { SliderWorkers } from "../../components/SliderWorkers/SliderWorkers";
import { Loader } from "../../components/Loader/Loader";
import { Footer } from "../../components/Footer/Footer";
import Button from "../../components/Common/Button/Button";

import cursorImg from "../../assets/icons/cursorImg.svg";

import "./partnerRequests.scss";

export const PartnerRequests = () => {
  if (localStorage.getItem("role_status") !== "18") {
    return <Navigate to="/profile" replace />;
  }

  const dispatch = useDispatch();
  const [requests, setRequests] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    apiRequest(
      `/request/get-request-list?user_id=${localStorage.getItem(
        "id"
      )}&search_depth=3`
    ).then((el) => {
      setRequests(el);
      setLoader(false);
    });
  }, []);
  return (
    <div className="partnerRequests">
      <ProfileHeader />
      <Navigation />
      <div className="container">
        <ProfileBreadcrumbs
          links={[
            { name: "Главная", link: "/profile" },
            { name: "Запросы и открытые позиции", link: "/profile/requests" },
          ]}
        />
        <h2 className="partnerRequests__title">Запросы</h2>
        {loader && <Loader />}
        {Boolean(requests.length) && !loader && (
          <div className="partnerRequests__section">
            <div className="partnerRequests__section__items">
              {requests.map((item, index) => {
                return (
                  <Link
                    key={index}
                    to={"/profile/bid"}
                    className="partnerRequests__section__item"
                    onClick={() => {
                      dispatch(setPartnerRequestId(item.id));
                      dispatch(setPartnerRequests(requests));
                    }}
                  >
                    <p className="partnerRequests__section__item__name">
                      {item.position.name}
                    </p>
                    <p className="partnerRequests__section__item__count">
                      Подходящие кандидаты
                      <span>{item.result_count}</span>
                    </p>
                  </Link>
                );
              })}
            </div>
            <div className="partnerRequests__section__info">
              <h3>Инструкция: подачи заявки</h3>
              <p>
                Оператор компании заводит заявку и указывает необходимые
                параметры — количество сотрудников, стек, уровень специалиста
              </p>
              <Button>
                <Link to={"/profile/add-request"}>
                  <span>+</span>
                  Создать запрос
                </Link>
              </Button>
            </div>
          </div>
        )}
        {!Boolean(requests.length) && !loader && (
          <div className="partnerRequests__noItems">
            <div className="partnerRequests__noItems__create">
              <div className="partnerRequests__noItems__create__link">
                <img src={cursorImg} alt="cursor" />
                <p>У вас еще нет запросов на сотрудников</p>
                <Button>
                  <Link to={"/profile/add-request"}>
                    <span>+</span>
                    Создать запрос
                  </Link>
                </Button>
              </div>
              <div className="partnerRequests__noItems__create__instruction">
                <h3>Инструкция: подачи заявки</h3>
                <p>
                  Оператор компании заводит заявку и указывает необходимые
                  параметры — количество сотрудников, стек, уровень специалиста
                </p>
              </div>
            </div>
            <div className="partnerRequests__noItems__freeEmployees">
              <SliderWorkers
                title={"Свободные разработчики"}
                titleInfo={"в нашей базе"}
              />
              <p className="catalogLink">
                Перейти в полный <Link to={"/profile/catalog"}>КАТАЛОГ</Link>{" "}
                сотрудников
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
