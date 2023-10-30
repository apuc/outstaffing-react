import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getProfileInfo, setProfileInfo } from "@redux/outstaffingSlice";

import { urlForLocal } from "@utils/helper";

import { apiRequest } from "@api/request";

import avatarMok from "assets/images/avatarMok.png";

export const Navigation = () => {
  const dispatch = useDispatch();

  const profileInfo = useSelector(getProfileInfo);
  const [user] = useState(
    localStorage.getItem("role_status") === "18" ? "partner" : "developer"
  );

  const [navInfo] = useState({
    developer: [
      {
        path: "/summary",
        name: "Резюме",
      },
      {
        path: "/calendar",
        name: "Отчетность",
      },
      {
        path: "/tracker",
        name: "Трекер",
      },
      {
        path: "/payouts",
        name: "Выплаты",
      },
      {
        path: "/settings",
        name: "Настройки",
      },
    ],
    partner: [
      {
        path: "/catalog",
        name: "Каталог",
      },
      {
        path: "/requests",
        name: "Запросы",
      },
      {
        path: "/categories",
        name: "Персонал",
      },
      {
        path: "/tracker",
        name: "Трекер",
      },
      {
        path: "/treaties",
        name: "Договора",
      },
      {
        path: "/settings",
        name: "Настройки",
      },
    ],
  });

  useEffect(() => {
    if (localStorage.getItem("role_status") === "18") {
      return;
    }
    apiRequest(`/user/me`).then((profileInfo) =>
      dispatch(setProfileInfo(profileInfo.userCard))
    );
  }, [dispatch]);

  return (
    <div className="profileHeader__info">
      <div className="profileHeader__container">
        <nav className="profileHeader__nav">
          {navInfo[user].map((link, index) => {
            return (
              <NavLink key={index} end to={`/profile${link.path}`}>
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="profileHeader__personalInfo">
          <h3 className="profileHeader__personalInfoName">
            {user === "developer" ? profileInfo?.fio : ""}
          </h3>
          <NavLink end to={"/profile"}>
            <img
              src={
                profileInfo.photo ? urlForLocal(profileInfo.photo) : avatarMok
              }
              className="profileHeader__personalInfoAvatar"
              alt="avatar"
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
