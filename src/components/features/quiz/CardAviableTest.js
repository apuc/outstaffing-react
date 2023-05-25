import React from "react";
import { Link } from "react-router-dom";

import rightArrow from "../../../assets/icons/arrows/arrowRight.svg";
import StarRating from "../../StarRating/StarRating";

export const CardAvailableTest = ({ title, description, path, passedTest }) => {
  return (
    <div className="card-available-test">
      <Link
        to={`/${path}`}
        className="card-available-test__container"
        style={{
          opacity: passedTest ? 0.3 : 1,
          pointerEvents: passedTest ? "none" : "all",
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

      {passedTest && (
        <div className="card-available-test__finished">
          <p>Получить отчет по тестированию</p>
          <Link to={"/quiz/report"}>Отчет по тесту</Link>
        </div>
      )}
    </div>
  );
};
