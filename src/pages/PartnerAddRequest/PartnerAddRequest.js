import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { apiRequest } from "@api/request";
import { getPartnerRequestInfo } from "@redux/outstaffingSlice";

import { ProfileHeader } from "@components/ProfileHeader/ProfileHeader";
import { ProfileBreadcrumbs } from "@components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { Footer } from "@components/Common/Footer/Footer";
import { Navigation } from "@components/Navigation/Navigation";

import arrowDown from "assets/icons/arrows/selectArrow.png";
import processImg from "assets/images/partnerProfile/partnerAddRequestFirstImg.png";
import reportImg from "assets/images/partnerProfile/partnerAddRequestSecondImg.png";
import documentsImg from "assets/images/partnerProfile/partnerAddRequestThirdInfo.png";
import deleteIcon from "assets/icons/close.png";

import "./partnerAddRequest.scss";

export const PartnerAddRequest = () => {
  if (localStorage.getItem("role_status") !== "18") {
    return <Navigate to="/profile" replace />;
  }

  const partnerRequestInfo = useSelector(getPartnerRequestInfo);
  const currentUrl = useState(window.location.pathname);
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [specializationList, setSpecializationList] = useState([]);
  const [levelList, setLevelList] = useState([]);
  const [countList] = useState([1, 2, 3, 4, 5]);
  const [openSkillsSelect, setOpenSkillsSelect] = useState(false);
  const [openSpecializationList, setOpenSpecializationListOpen] =
    useState(false);
  const [openLevelList, setOpenLevelList] = useState(false);
  const [openCountList, setOpenCountList] = useState(false);
  const [editRequest, setEditRequest] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState(
    "Выберите специализацию"
  );
  const [selectedLevel, setSelectedLevel] = useState("Выберите уровень");
  const [selectedCount, setSelectedCount] = useState(
    "Выберите кол-во сотрудников"
  );
  const [inputs, setInputs] = useState({ title: "", description: "" });

  if (
    currentUrl[0] === "/profile/edit-request" &&
    !Object.keys(partnerRequestInfo).length
  ) {
    return <Navigate to="/profile/requests" replace />;
  }

  useEffect(() => {
    apiRequest(`/profile/positions-list`).then((el) =>
      setSpecializationList(el)
    );
    apiRequest(`/profile/level-list`).then((el) => setLevelList(el));
    apiRequest(`/skills/get-skills-list`).then((el) => {
      setSkills(el);
      setFilteredSkills(el);
    });
  }, []);

  useEffect(() => {
    if (
      currentUrl[0] === "/profile/edit-request" &&
      Object.keys(partnerRequestInfo).length
    ) {
      setInputs({
        title: partnerRequestInfo.title,
        description: partnerRequestInfo.descr,
      });
      setSelectedSpecialization(partnerRequestInfo.position);
      setSelectedLevel({
        name: partnerRequestInfo.level,
        id: partnerRequestInfo.knowledge_level_id,
      });
      setSelectedCount(partnerRequestInfo.specialist_count);
      setSelectedSkills(partnerRequestInfo.skills);
      setEditRequest(true);
    }
  }, []);

  const disableBtn = () => {
    if (
      !inputs.title ||
      typeof selectedSpecialization === "string" ||
      typeof selectedLevel === "string" ||
      typeof selectedCount === "string" ||
      !inputs.description ||
      !selectedSkills.length
    ) {
      return false;
    }
    return true;
  };

  const handler = () => {
    if (currentUrl[0] === "/profile/edit-request") {
      apiRequest("/request/update-request", {
        method: "PUT",
        data: {
          user_id: localStorage.getItem("id"),
          request_id: partnerRequestInfo.id,
          title: inputs.title,
          position_id: selectedSpecialization.id,
          knowledge_level_id: selectedLevel.id,
          specialist_count: selectedCount,
          status: 1,
          descr: inputs.description,
          skill_ids: selectedSkills.map((skill) => {
            return skill.id;
          }),
        },
      }).then((res) => {
        navigate("/profile/requests");
      });
    } else {
      apiRequest("/request/create-request", {
        method: "POST",
        data: {
          user_id: localStorage.getItem("id"),
          title: inputs.title,
          position_id: selectedSpecialization.id,
          knowledge_level_id: selectedLevel.id,
          specialist_count: selectedCount,
          status: 1,
          descr: inputs.description,
          skill_ids: selectedSkills.map((skill) => {
            return skill.id;
          }),
        },
      }).then((res) => {
        navigate("/profile/requests");
      });
    }
  };

  return (
    <div className="partnerAddRequest">
      <ProfileHeader />
      <Navigation />
      <div className="container">
        <ProfileBreadcrumbs
          links={[
            { name: "Главная", link: "/profile" },
            { name: "Запросы и открытые позиции", link: "/profile/requests" },
            {
              name: `${
                editRequest ? "Редактирование заявки" : "Создание новой заявки"
              }`,
              link: "/profile/add-request",
            },
          ]}
        />
        <h2 className="partnerAddRequest__title">
          {editRequest
            ? "Страница редактирования заявки"
            : "Страница добавления заявки"}
        </h2>
        <div className="partnerAddRequest__section">
          <div className="partnerAddRequest__form">
            <div className="partnerAddRequest__form__block form__block">
              <h3 className="form__block__title">Данные открытой позиции</h3>
              <div className="form__block__section">
                <h3>Название вакансии</h3>
                <div className="form__block__section__input">
                  <input
                    value={inputs.title}
                    onChange={(e) =>
                      setInputs((prevValue) => ({
                        ...prevValue,
                        title: e.target.value,
                      }))
                    }
                    type="text"
                    placeholder="Вакансия"
                  />
                </div>
              </div>
              <div className="form__block__section">
                <h3>Выберите специализацию</h3>
                <div
                  className="form__block__section__selects"
                  onClick={() => {
                    setOpenSpecializationListOpen(!openSpecializationList);
                  }}
                >
                  <div className="form__block__section__select">
                    <span>
                      {typeof selectedSpecialization === "string"
                        ? selectedSpecialization
                        : selectedSpecialization.name}
                    </span>
                    <img
                      className={openSpecializationList ? "rotate" : ""}
                      src={arrowDown}
                    />
                  </div>
                </div>
                {openSpecializationList &&
                  Boolean(specializationList.length) && (
                    <div className="form__block__dropDown">
                      {specializationList.map((specialization, index) => {
                        return (
                          <p
                            key={specialization.id}
                            onClick={() => {
                              setOpenSpecializationListOpen(false);
                              setSelectedSpecialization(specialization);
                            }}
                          >
                            {specialization.name}
                          </p>
                        );
                      })}
                    </div>
                  )}
              </div>
              <div className="form__block__section">
                <h3>Навыки</h3>
                <div
                  className="form__block__skills"
                  onClick={() => {
                    setOpenSkillsSelect(true);
                  }}
                >
                  {Boolean(selectedSkills.length) &&
                    selectedSkills.map((skill, index) => {
                      return (
                        <div className="skill" key={`selected-${skill.id}`}>
                          <span>{skill.name}</span>
                          <img
                            src={deleteIcon}
                            alt="delete"
                            onClick={() => {
                              setSkills((prevArray) => [...prevArray, skill]);
                              setFilteredSkills((prevArray) => [
                                ...prevArray,
                                skill,
                              ]);
                              setSelectedSkills(
                                selectedSkills.filter((skill, indexSkill) => {
                                  return indexSkill !== index;
                                })
                              );
                            }}
                          />
                        </div>
                      );
                    })}
                  <input
                    type="text"
                    placeholder="Выберите навыки"
                    onChange={(e) => {
                      setFilteredSkills(
                        skills.filter((skill) => {
                          return skill.name
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase());
                        })
                      );
                    }}
                  />
                </div>
                {openSkillsSelect && Boolean(filteredSkills.length) && (
                  <div className="form__block__dropDown">
                    {filteredSkills.map((skill, index) => {
                      return (
                        <span
                          key={skill.id}
                          onClick={() => {
                            setSelectedSkills((prevArray) => [
                              ...prevArray,
                              skill,
                            ]);
                            setFilteredSkills(
                              filteredSkills.filter((skill, skillIndex) => {
                                return skillIndex !== index;
                              })
                            );
                            setSkills(
                              skills.filter((initSkill) => {
                                return initSkill.id !== skill.id;
                              })
                            );
                            setOpenSkillsSelect(false);
                          }}
                        >
                          {skill.name}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="partnerAddRequest__form__block form__block">
              <h3 className="form__block__title">Квалификация</h3>
              <div className="form__block__section">
                <h3>Выберите уровень знаний </h3>
                <div
                  className="form__block__section__select"
                  onClick={() => setOpenLevelList(!openLevelList)}
                >
                  <span>
                    {typeof selectedLevel === "string"
                      ? selectedLevel
                      : selectedLevel.name}
                  </span>
                  <img
                    className={openLevelList ? "rotate" : ""}
                    src={arrowDown}
                  />
                </div>
                {openLevelList && Boolean(Object.values(levelList).length) && (
                  <div className="form__block__dropDown">
                    {Object.values(levelList).map((level, index) => {
                      return (
                        <p
                          key={level}
                          onClick={() => {
                            setOpenLevelList(false);
                            setSelectedLevel({ name: level, id: index + 1 });
                          }}
                        >
                          {level}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="form__block__section">
                <h3>Введите необходимое описание</h3>
                <textarea
                  value={inputs.description}
                  onChange={(e) =>
                    setInputs((prevValue) => ({
                      ...prevValue,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form__block__section">
                <h3>Необходимое количество человек на позицию</h3>
                <div
                  className="form__block__section__select"
                  onClick={() => setOpenCountList(true)}
                >
                  <span>{selectedCount}</span>
                  <img
                    className={openCountList ? "rotate" : ""}
                    src={arrowDown}
                  />
                </div>
                {openCountList && (
                  <div className="form__block__dropDown">
                    {countList.map((count) => {
                      return (
                        <p
                          key={count}
                          onClick={() => {
                            setOpenCountList(false);
                            setSelectedCount(count);
                          }}
                        >
                          {count}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="form__block__buttons">
                <Link to="/profile/requests" className="form__block__cancel">
                  Отмена
                </Link>
                <button
                  onClick={() => handler()}
                  className={
                    disableBtn()
                      ? "form__block__save"
                      : "form__block__save disable"
                  }
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
          <div className="partnerAddRequest__info">
            <div className="partnerAddRequest__info__block">
              <div className="partnerAddRequest__info__block__title">
                <img src={processImg} alt="process" />
                <h4>Процесс:</h4>
              </div>
              <p>
                При аутстафе мы предоставляем вам it-специалистов при этом они
                находятся в нашем штате.
                <br />
                <br />
                Вы сможете прособеседовать наших специалистов, посмотреть
                проекты и Git.
              </p>
            </div>
            <div className="partnerAddRequest__info__block">
              <div className="partnerAddRequest__info__block__title">
                <img src={reportImg} alt="reportImg" />
                <h4>Отчетность:</h4>
              </div>
              <p>
                Вы можете обратиться к специалисту напрямую.
                <br />
                <br />
                Каждый день специалисты описывают выполненные работы и
                затраченные на это часы.
                <br />
                <br />
                Можем выделить руководителя проекта и тестировщиков.
              </p>
            </div>
            <div className="partnerAddRequest__info__block">
              <div className="partnerAddRequest__info__block__title">
                <img src={documentsImg} alt="documentsImg" />
                <h4>
                  Обмен <br />
                  документами:
                </h4>
              </div>
              <p>
                В Личном кабинете платформы получайте отчеты выполненных работ и
                счета на согласование и оплату
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
