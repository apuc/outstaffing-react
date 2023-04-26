import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getPartnerRequestId,
  getPartnerRequests,
  setPartnerRequestId,
  setPartnerRequestInfo,
} from "../../redux/outstaffingSlice";

import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import { ProfileBreadcrumbs } from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { Footer } from "../../components/Footer/Footer";
import { Navigation } from "../../components/Navigation/Navigation";
import { Loader } from "../../components/Loader/Loader";
import ModalAdd from "../../components/UI/ModalAdd/ModalAdd";

import { apiRequest } from "../../api/request";
import { getCorrectDate } from "../../components/Calendar/calendarHelper";

import { urlForLocal } from "../../helper";

import arrowSwitchDate from "../../images/arrowViewReport.png";
import backEndImg from "../../images/QualificationInfo.png";
import middle from "../../images/QualificationInfoMiddle.png";
import deleteBtn from "../../images/deleteBtn.png";

import "./partnerBid.scss";

export const PartnerBid = () => {
  if (localStorage.getItem("role_status") !== "18") {
    return <Navigate to="/profile" replace />;
  }

  const dispatch = useDispatch();
  const requestId = useSelector(getPartnerRequestId);
  const partnerRequests = useSelector(getPartnerRequests);
  const navigate = useNavigate();

  if (!requestId) {
    return <Navigate to="/profile/requests" replace />;
  }

  useEffect(() => {
    setLoader(true);
    apiRequest(`/request/get-request?request_id=${requestId}`).then((el) => {
      setRequestInfo(el);
      dispatch(setPartnerRequestInfo(el));
      setLoader(false);
    });
  }, [requestId]);

  const deleteRequest = () => {
    apiRequest("/request/update-request", {
      method: "PUT",
      data: {
        user_id: localStorage.getItem("id"),
        request_id: requestId,
        status: 0,
      },
    }).then((res) => {
      navigate("/profile/requests");
    });
  };

  const [requestInfo, setRequestInfo] = useState({});
  const [loader, setLoader] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [levels] = useState({
    1: "Junior",
    2: "Middle",
    3: "Middle+",
    4: "Senior",
  });
  return (
    <div className="partnerBid">
      <ProfileHeader />
      <Navigation />
      <ModalAdd active={modalDelete} setActive={setModalDelete}>
        <div className="title-project modal-title-delete">
          <h4>Подтверждение удаления</h4>
          <p className="title-project__decs modal-decs">
            Вы решили удалить заявку. После удаления ее нельзя будет
            восстановить. Продолжаем?
          </p>

          <div className="buttons-modal">
            <button
              className="buttons-modal__no"
              onClick={() => setModalDelete(false)}
            >
              Нет
            </button>
            <button
              className="buttons-modal__yes"
              onClick={() => deleteRequest()}
            >
              Да
            </button>
          </div>
        </div>
      </ModalAdd>

      <div className="container">
        <ProfileBreadcrumbs
          links={[
            { name: "Главная", link: "/profile" },
            { name: "Запросы и открытые позиции", link: "/profile/requests" },
            { name: "Просмотр заявки - PHP разработчик", link: "/profile/bid" },
          ]}
        />
        <h2 className="partnerBid__title">Страница заявки </h2>
        {loader && <Loader />}
        {!loader && (
          <>
            <div className="partnerBid__qualification">
              <h3>{requestInfo.title}</h3>
              <div className="partnerBid__qualification__buttons">
                <Link to="/profile/edit-request">Редактировать</Link>
                <img
                  src={deleteBtn}
                  alt="delete"
                  onClick={() => setModalDelete(true)}
                />
              </div>
            </div>
            <div className="partnerBid__switcher">
              <div
                className={
                  partnerRequests[
                    partnerRequests.findIndex((el) => el.id === requestId) - 1
                  ]?.id
                    ? "partnerBid__switcher__prev switchDate"
                    : "partnerBid__switcher__prev switchDate disable"
                }
                onClick={() => {
                  dispatch(
                    setPartnerRequestId(
                      partnerRequests[
                        partnerRequests.findIndex((el) => el.id === requestId) -
                          1
                      ].id
                    )
                  );
                }}
              >
                <img src={arrowSwitchDate} alt="arrow" />
              </div>
              <p>Дата заявки : {getCorrectDate(requestInfo.created_at)} </p>
              <div
                className={
                  partnerRequests[
                    partnerRequests.findIndex((el) => el.id === requestId) + 1
                  ]?.id
                    ? "partnerBid__switcher__next switchDate"
                    : "partnerBid__switcher__next switchDate disable"
                }
                onClick={() => {
                  dispatch(
                    setPartnerRequestId(
                      partnerRequests[
                        partnerRequests.findIndex((el) => el.id === requestId) +
                          1
                      ].id
                    )
                  );
                }}
              >
                <img src={arrowSwitchDate} alt="arrow" />
              </div>
            </div>
          </>
        )}
        {Boolean(Object.keys(requestInfo).length) && !loader && (
          <>
            <div className="table__wrapper">
              <table>
                <thead>
                  <tr>
                    <th>
                      <p>Требования к стеку разработчика</p>
                    </th>
                    <th>
                      <p>Квалификация</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>
                        {requestInfo.position.name}. &nbsp;
                        {requestInfo.skills.map((skill, index) => {
                          return (
                            <span key={skill.id}>
                              {skill.name}
                              {requestInfo.skills.length > index + 1
                                ? ","
                                : "."}
                              &nbsp;
                            </span>
                          );
                        })}
                      </p>
                    </td>
                    <td>
                      <div className="qualification__info">
                        <div className="img__wrapper">
                          <img src={backEndImg} alt="backEndImg" />
                        </div>
                        <p>{requestInfo.position.name}</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{requestInfo.descr}</p>
                    </td>
                    <td>
                      <div className="qualification__info">
                        <div className="img__wrapper">
                          <img src={middle} alt="middleImg" />
                        </div>
                        <p className="middle">{requestInfo.level}</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="partnerBid__suitable">
              <div className="partnerBid__suitable__title">
                <p>Подходящие сотрудники по запросу</p>
              </div>
              <div className="partnerBid__suitable__persons">
                {requestInfo.result_profiles.length &&
                  requestInfo.result_profiles.map((person, index) => {
                    return (
                      <div key={index} className="partnerBid__suitable__person">
                        <img src={urlForLocal(person.photo)} alt="avatar" />
                        <p>
                          {person.fio} - {person.position_title},{" "}
                          {levels[person.level]}
                        </p>
                        <Link
                          className="partnerBid__suitable__person__more"
                          to={`/candidate/${person.id}`}
                        >
                          Подробнее
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};
