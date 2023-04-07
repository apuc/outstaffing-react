import React from "react";

import AuthHeader from "../../AuthHeader/AuthHeader";
import SideBar from "../../SideBar/SideBar";
import { Footer } from "../../Footer/Footer";
import { ProfileBreadcrumbs } from "../../ProfileBreadcrumbs/ProfileBreadcrumbs";

import mockWorker from "../../../images/mokPerson.png";
import arrow from "../../../images/arrow_left.png";

import "./freeDevelopers.scss";
import { Link } from "react-router-dom";

export const FreeDevelopers = ({}) => {
  return (
    <section className="free-dev">
      <AuthHeader />
      <SideBar />
      <div className="container free-dev_page">
        <ProfileBreadcrumbs
          links={[
            { name: "Главная", link: "/auth" },
            { name: "Свободные разработчики", link: "/worker" },
          ]}
        />

        <h2>
          Свободные разработчики <span>для Вашей команды</span>
        </h2>

        <Link to={"/auth"} className="link">
          <img src={arrow}></img>Вернуться
        </Link>

        <div className="free-dev__title">
          <div className="free-dev__title-box">
            <img src={mockWorker}></img>
            <div className="free-dev__title-name">
              <h3>Дмитрий, PHP Back end - разработчик, Middle</h3>
              <div></div>
            </div>
          </div>
          <button>Код разработчика</button>
        </div>

        <div className="free-dev__body">
          <div className="free-dev__body-title">
            <p>Описание опыта работы</p>
          </div>

          <div className="free-dev__body-text">
            <h5>
              Godesigner - сервис для фриланс дизайнеров, копирайтеров и их
              заказчиков
            </h5>
            <p>Стек – PHP (li3), HTML, CSS, JavaScript, MYSQL, Nginx.</p>
            <ul>
              <li> Расширение функционала старых модулей проекта</li>
              <li>создание и проектирование новых модулей сайта</li>
              <li>написание backend части проекта</li>
              <li>усовершенствование и расширение функционала админ-панели</li>
              <li>работа с визуальной составляющей</li>
              <li>создание алгоритма рассылки писем по электронной почте</li>
              <li>
                использование API сторонних сервисов, мессенджеров (WhatsApp)
              </li>
            </ul>
            <p>Время разработки: 2 года.</p>
          </div>
        </div>

        <Footer />
      </div>
    </section>
  );
};

export default FreeDevelopers;
