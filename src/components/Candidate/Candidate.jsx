import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SkillSection from "@components/SkillSection/SkillSection";
import Sidebar from "@components/CandidateSidebar/CandidateSidebar";
import { ProfileHeader } from "@components/ProfileHeader/ProfileHeader";
import { ProfileBreadcrumbs } from "@components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { Footer } from "@components/Common/Footer/Footer";
import { Navigation } from "@components/Navigation/Navigation";

import {
  currentCandidate,
  selectCurrentCandidate,
} from "@redux/outstaffingSlice";

import { apiRequest } from "@api/request";
import { createMarkup } from "@utils/helper";
import { LEVELS, SKILLS } from "@utils/constants";

import gitImgItem from "assets/icons/gitItemImg.svg";
import rectangle from "assets/images/rectangle_secondPage.png";
import front from "assets/images/partnerProfile/front-end.webp";
import back from "assets/images/partnerProfile/back-end.webp";
import design from "assets/images/partnerProfile/design.webp";
import rightArrow from "assets/icons/arrows/arrowRight.svg";

import "./candidate.scss";

const Candidate = () => {
  if (localStorage.getItem("role_status") !== "18") {
    return <Navigate to="/profile" replace />;
  }
  const { id: candidateId } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const currentCandidateObj = useSelector(selectCurrentCandidate);

  const [activeSnippet, setActiveSnippet] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    apiRequest(`/profile/${candidateId}`, {
      params: Number(candidateId),
    }).then((el) => dispatch(currentCandidate(el)));
  }, [dispatch, candidateId]);

  const { position_id, skillValues, vc_text: text } = currentCandidateObj;

  const setStyles = () => {
    const styles = {
      classes: "",
      header: "",
      img: "",
    };

    switch (Number(position_id)) {
      case 1: {
        styles.classes = "back";
        styles.header = "Backend";
        styles.img = back;

        break;
      }
      case 2: {
        styles.classes = "des";
        styles.header = "Frontend";
        styles.img = front;
        break;
      }
      case 3: {
        styles.classes = "front";
        styles.header = "Design";
        styles.img = design;
        break;
      }
      default:
        break;
    }

    return styles;
  };

  const { header, img, classes } = setStyles();

  return (
    <div className="candidate__wrapper">
      <ProfileHeader />
      <Navigation />
      <div className="container candidate">
        <ProfileBreadcrumbs
          links={[
            { name: "Главная", link: "/profile" },
            {
              name: "Каталог свободных специалистов",
              link: "/profile/catalog",
            },
            {
              name: `${currentCandidateObj.specification} ${
                SKILLS[currentCandidateObj.position_id]
              }, ${LEVELS[currentCandidateObj.level]}`,
              link: `/candidate/${currentCandidateObj.id}`,
            },
          ]}
        />

        <div className="row">
          <div className="col-12 candidate__header">
            <div className="candidate__header__left">
              <h3>
                {currentCandidateObj.specification} &nbsp;{" "}
                {SKILLS[currentCandidateObj.position_id]} &nbsp;{" "}
                {LEVELS[currentCandidateObj.level]}
              </h3>
              <div
                className="candidate__arrow"
                onClick={() => navigate("/profile/catalog")}
              >
                <div className="candidate__arrow-img">
                  <img src={rightArrow} alt="" />
                </div>
                <div className="candidate__arrow-sp">
                  <span>Вернуться к списку</span>
                </div>
              </div>
            </div>

            <div className="candidate__icon">
              <h3>{header}</h3>
              <img className={classes} src={img} alt="" />
            </div>
          </div>
        </div>
        <div className="candidate__main">
          <div className="row">
            <div className="col-12 col-xl-4">
              <Sidebar
                candidate={currentCandidateObj}
                position
                activeSnippet={activeSnippet}
                setActiveSnippet={setActiveSnippet}
              />
            </div>
            {activeSnippet ? (
              <div className="col-12 col-xl-8">
                <div className="candidate__main-description">
                  <img src={rectangle} alt="" />
                  <p className="candidate__hashtag"># Описание опыта</p>
                  {text ? (
                    <div
                      className="candidate__text"
                      dangerouslySetInnerHTML={createMarkup(text)}
                    ></div>
                  ) : (
                    <p className="candidate__text-secondary">
                      {currentCandidateObj.vc_text
                        ? currentCandidateObj.vc_text
                        : "Описание отсутствует..."}
                    </p>
                  )}

                  <SkillSection skillsArr={skillValues} />
                </div>
              </div>
            ) : (
              <div className="col-12 col-xl-8">
                <div className="candidate__works works">
                  <div className="works__body">
                    <div className="works__body__info">
                      <p>Страница портфолио кода разработчика</p>
                    </div>
                    <div className="works__item item-works">
                      <Link to="/" className="item-works__body">
                        <div className="item-works__body__head">
                          <div className="item-works__body__info">
                            <img src={gitImgItem} alt="img" />
                            <div className="item-works__body__project">
                              <h5>cybershop-api</h5>
                              <p>Реактивная социальная сеть</p>
                            </div>
                          </div>
                          <div className="item-works__body__head__arrow">
                            <img src={rightArrow} alt="arrow" />
                          </div>
                        </div>
                        <span>JavaScript </span>
                      </Link>
                    </div>
                    <div className="works__item item-works">
                      <Link to="/" className="item-works__body">
                        <div className="item-works__body__head">
                          <div className="item-works__body__info">
                            <img src={gitImgItem} alt="img" />
                            <div className="item-works__body__project">
                              <h5>cybershop-api</h5>
                              <p>Реактивная социальная сеть</p>
                            </div>
                          </div>
                          <div className="item-works__body__head__arrow">
                            <img src={rightArrow} alt="arrow" />
                          </div>
                        </div>
                        <span>JavaScript </span>
                      </Link>
                    </div>
                    <div className="works__item item-works">
                      <Link to="/" className="item-works__body">
                        <div className="item-works__body__head">
                          <div className="item-works__body__info">
                            <img src={gitImgItem} alt="img" />
                            <div className="item-works__body__project">
                              <h5>cybershop-api</h5>
                              <p>Реактивная социальная сеть</p>
                            </div>
                          </div>
                          <div className="item-works__body__head__arrow">
                            <img src={rightArrow} alt="arrow" />
                          </div>
                        </div>
                        <span>JavaScript </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Candidate;
