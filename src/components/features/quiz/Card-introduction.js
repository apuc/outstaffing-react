import React from "react";

import questionIcon from "assets/images/question.png";

import "./quiz.scss";

export const CardIntroduction = ({ title, description }) => {
  return (
    <div className="card-introduction">
      <div className="card-introduction__title">{title}</div>
      <div className="card-introduction__body">
        <div className="card-introduction__icon">
          <img src={questionIcon} alt="" />
        </div>
        <div className="card-introduction__text">{description}</div>
      </div>
    </div>
  );
};
