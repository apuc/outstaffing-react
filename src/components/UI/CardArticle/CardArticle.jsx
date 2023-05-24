import React from "react";
import { Link } from "react-router-dom";

import cardCalendar from "../../../images/cardCalendar.svg";

import "./cardArticle.scss";

export const CardArticle = ({ images, title, data, id }) => {
  return (
    <div className="card-article">
      <Link to={`/blog/article/${id}`}>
        <img src={images} />
        <h5>{title}</h5>
        <div className="card-article__data">
          <img src={cardCalendar} />
          <p>{data}</p>
        </div>
      </Link>
    </div>
  );
};

export default CardArticle;
