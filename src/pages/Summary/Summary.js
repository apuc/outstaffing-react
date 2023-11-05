import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { getProfileInfo } from "@redux/outstaffingSlice";

import { urlForLocal } from "@utils/helper";

import { apiRequest } from "@api/request";

import { Footer } from "@components/Common/Footer/Footer";
import { Navigation } from "@components/Navigation/Navigation";
import { ProfileBreadcrumbs } from "@components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { ProfileHeader } from "@components/ProfileHeader/ProfileHeader";

import rightArrow from "assets/icons/arrows/arrowRight.svg";
import arrow from "assets/icons/arrows/left-arrow.png";
import gitImgItem from "assets/icons/gitItemImg.svg";
import avatarMok from "assets/images/avatarMok.png";

import "./summary.scss";

export const Summary = () => {
  if (localStorage.getItem("role_status") === "18") {
    return <Navigate to="/profile" replace />;
  }
  const profileInfo = useSelector(getProfileInfo);
  const [openGit, setOpenGit] = useState(false);
  const [gitInfo, setGitInfo] = useState([]);

  useEffect(() => {
    apiRequest(
      `/profile/portfolio-projects?card_id=${localStorage.getItem("cardId")}`
    ).then((responseGit) => setGitInfo(responseGit));
  }, []);
  return (
    <div className="summary">
      <ProfileHeader />
      <Navigation />
      <div className="container">
        <div className="summary__content">
          <ProfileBreadcrumbs
            links={[
              { name: "Главная", link: "/profile" },
              { name: "Данные и резюме", link: "/profile/summary" },
            ]}
          />
          <h2 className="summary__title">
            Ваше резюме {openGit && <span>- Git</span>}
          </h2>
          {openGit && (
            <div className="summary__back" onClick={() => setOpenGit(false)}>
              <img src={arrow} alt="arrow" />
              <p>Вернуться</p>
            </div>
          )}
          <div className={openGit ? "summary__info openGit" : "summary__info"}>
            <div className="summary__person">
              <img
                src={
                  profileInfo?.photo
                    ? urlForLocal(profileInfo.photo)
                    : avatarMok
                }
                className="summary__avatar"
                alt="avatar"
              />
              <p className="summary__name">
                {profileInfo?.fio ? profileInfo?.fio : profileInfo?.username},{" "}
                {profileInfo.specification} разработчик
              </p>
            </div>
            {!openGit && (
              <button className="summary__git" onClick={() => setOpenGit(true)}>
                Git
              </button>
            )}
          </div>
        </div>
        {!openGit && (
          <div className="summary__skills skills__section">
            <div className="summary__sections__head">
              <h3>Основной стек</h3>
              <button>Редактировать раздел</button>
            </div>
            <div className="skills__section__items">
              <div className="skills__section__items__wrapper">
                {profileInfo.skillValues &&
                  profileInfo.skillValues.map((skill, index) => (
                    <span key={skill.id} className="skill_item">
                      {skill.skill.name}
                      {profileInfo.skillValues.length > index + 1 && ","}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        )}
        {profileInfo.vc_text && !openGit && (
          <div className="summary__experience">
            <div className="experience__block">
              <div className="summary__sections__head">
                <h3>Описание опыта работы</h3>
                <button>Редактировать раздел</button>
              </div>
              <div
                className="experience__content"
                dangerouslySetInnerHTML={{ __html: profileInfo.vc_text }}
              ></div>
            </div>
          </div>
        )}
        {openGit && (
          <div className="summary__sectionGit">
            <div className="summary__sections__head">
              <h3>Страница портфолио кода разработчика</h3>
              <button>Редактировать раздел</button>
            </div>
            <div className="summary__sectionGitItems">
              {Boolean(gitInfo.length) &&
                gitInfo.map((itemGit) => {
                  return (
                    <a
                      href={itemGit.link}
                      target="_blank"
                      rel="noreferrer"
                      key={itemGit.id}
                      className="summary__sectionGitItem gitItem"
                    >
                      <div className="gitItem__info">
                        <div className="gitItem__info__about">
                          <img src={gitImgItem} alt="gitImg" />
                          <div className="gitItem__info__name">
                            <h4>{itemGit.title}</h4>
                            <p>{itemGit.description}</p>
                          </div>
                        </div>
                        <div className="gitItem__info__specification">
                          <span className="gitItem__lineSkill" />
                          <p>{itemGit.main_stack}</p>
                        </div>
                      </div>
                      <a
                        className="gitItem__link"
                        href={itemGit.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={rightArrow} alt="arrowRight" />
                      </a>
                    </a>
                  );
                })}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
