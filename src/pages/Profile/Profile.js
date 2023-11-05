import React, { useState } from "react";
import { useSelector } from "react-redux";

import { getProfileInfo } from "@redux/outstaffingSlice";

import { urlForLocal } from "@utils/helper";

import { CardControl } from "@components/CardControl/CardControl";
import { Footer } from "@components/Common/Footer/Footer";
import { Navigation } from "@components/Navigation/Navigation";
import { ProfileBreadcrumbs } from "@components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { ProfileHeader } from "@components/ProfileHeader/ProfileHeader";

import paymentIcon from "assets/icons/paymentIcon.png";
import settingIcon from "assets/icons/settingIcon.png";
import summaryIcon from "assets/icons/summaryIcon.png";
import timerIcon from "assets/icons/timerIcon.png";
import avatarMok from "assets/images/avatarMok.png";
import reportsIcon from "assets/images/reports.png";

import "./profile.scss";

export const Profile = () => {
  const profileInfo = useSelector(getProfileInfo);
  const [user] = useState(
    localStorage.getItem("role_status") === "18" ? "partner" : "developer"
  );
  const [profileItemsInfo] = useState({
    developer: [
      {
        path: "profile/calendar",
        img: reportsIcon,
        title: "Ваша отчетность",
        description: "<span></span>Отработанных в этом месяце часов",
      },
      {
        path: "profile/summary",
        img: summaryIcon,
        title: "Данные и резюме",
        description: "Ваше резюме<br/><span>заполнено</span>",
      },
      {
        path: "profile/tracker",
        img: timerIcon,
        title: "Трекер времени",
        description: "Сколько времени занимает<br/> выполнение задач",
      },
      {
        path: "profile/payouts",
        img: paymentIcon,
        title: "Выплаты",
        description: "У вас <span>подтвержден</span><br/> статус самозанятого",
      },
      {
        path: "profile/settings",
        img: settingIcon,
        title: "Настройки аккаунта",
        description: "Перейдите чтобы начать<br/> редактирование",
      },
    ],
    partner: [
      {
        path: "profile/requests",
        img: reportsIcon,
        title: "Запросы и открытые позиции",
        description:
          "<span>У вас 2 вакансии<br/></span>открытые от лица компании",
      },
      {
        path: "profile/categories",
        img: summaryIcon,
        title: "Данные персонала",
        description: "Наши специалисты <br/><span>уже работающие у вас</span>",
      },
      {
        path: "profile/tracker",
        img: timerIcon,
        title: "Трекер времени",
        description: "Контроль времени и<br/> выполнение задач",
      },
      {
        path: "profile/treaties",
        img: paymentIcon,
        title: "Договора и отчетность",
        description: "Ключевые условия<br/> договора",
      },
      {
        path: "profile/settings",
        img: settingIcon,
        title: "Настройки аккаунта",
        description: "Перейдите чтобы начать<br/> редактирование",
      },
    ],
  });

  return (
    <div className="profile">
      <ProfileHeader />
      <Navigation />
      <div className="container">
        <ProfileBreadcrumbs links={[{ name: "Главная", link: "/profile" }]} />
        <h2 className="profile__title">
          {user === "developer" ? (
            <span>
              <p>Добрый день,&nbsp;</p>
              {profileInfo?.fio ? profileInfo?.fio : profileInfo?.username}
            </span>
          ) : (
            "ООО НДВ Консалтинг"
          )}
        </h2>
        <div className="summary__info">
          <div className="summary__person">
            <img
              src={
                profileInfo?.photo ? urlForLocal(profileInfo.photo) : avatarMok
              }
              className="summary__avatar"
              alt="avatar"
            />
            <p className="summary__name">
              {user === "developer" ? (
                <span>
                  {profileInfo?.fio ? profileInfo?.fio : profileInfo?.username},{" "}
                  {profileInfo?.specification} разработчик
                </span>
              ) : (
                "ООО НДВ Консалтинг"
              )}
            </p>
          </div>
        </div>
        <div className="profile__items">
          {profileItemsInfo[user].map((item, index) => {
            return (
              <CardControl
                description={item.description}
                img={item.img}
                path={item.path}
                title={item.title}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};
