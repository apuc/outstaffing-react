import React from "react";
import { Link } from "react-router-dom";

import StarRating from "@components/StarRating/StarRating";

import rightArrow from "assets/icons/arrows/arrowRight.svg";

export const CardAvailableTest = ({ title, description, path, status }) => {
  return (
    <div className="card-available-test">
      <Link
        to={`/${path}`}
        aria-disabled={true}
        className="card-available-test__container"
        style={{
          // opacity: status !== 1 ? 0.3 : 1,
          // pointerEvents: status !== 1 ? "none" : "all",
        }}
      >
        <div className="card-available-test__top-head">
          <StarRating />
          <h3 className="card-available-test__title">{title}</h3>
        </div>
        <div className="card-available-test__info">
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
          <div className="card-available-test__infoLink">
            <img src={rightArrow} alt="arrow" />
          </div>
        </div>
      </Link>
      {status === 2 && (
        <div className="card-available-test__finished">
          <p>Получить отчет по тестированию</p>
          <Link to={"/quiz/report"}>Отчет по тесту</Link>
        </div>
      )}
    </div>
  );
};
