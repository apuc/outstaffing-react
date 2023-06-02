import React from "react";
import { Link } from "react-router-dom";

import rightArrow from "assets/icons/arrows/arrowRight.svg";

import "./CardControl.scss";

export const CardControl = ({ title, path, description, img }) => {
  return (
    <Link to={`/${path}`} className="control-card">
      <div className="control-card__about">
        <img src={img} alt="itemImg" />
        <h3>{title}</h3>
      </div>
      <div className="control-card__info">
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
        <div className="control-card__infoLink">
          <img src={rightArrow} alt="arrow" />
        </div>
      </div>
    </Link>
  );
};
