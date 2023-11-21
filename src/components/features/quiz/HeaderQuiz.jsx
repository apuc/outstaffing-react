import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUserInfo } from "@redux/quizSlice";

import { urlForLocal } from "@utils/helper";

// import { apiRequest } from "@api/request";
import "./quiz.scss";

export const HeaderQuiz = ({ header }) => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("id");
  const userInfo = useSelector(selectUserInfo);


  return (
    <div>
      {userInfo?.status === 500 ? (
        <div className="error-msg">{userInfo.message}</div>
      ) : (
        <div className="header-quiz">
          <div className="header-quiz__container">
            {!userInfo ? (
              <h2>Loading...</h2>
            ) : (
              <>
                {header && (
                  <h2 className={"header-quiz__title-main"}>
                    Добрый день, {userInfo.fio}
                  </h2>
                )}
                <div className="header-quiz__body header-quiz__body_interjacent">
                  <div className="header-quiz__avatar">
                    <img
                      src={urlForLocal(userInfo.photo)}
                      alt={userInfo.photo}
                    />
                  </div>
                  <div className="header-quiz__name-user">{userInfo.fio}</div>
                  <div className="header-quiz__title">
                    {userInfo.position_name}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
