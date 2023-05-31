import React, { useEffect, useState } from "react";

import "./StarRating.scss";

const StarRating = ({
  countStars = 1,
  countActiveStars = 1,
  color = "#52B709",
  size = 61,
}) => {
  const [shadedStars, setShadedStars] = useState([]);
  const [noShadedStars, setNoShadedStars] = useState([]);
  const percent =
    Math.abs(countActiveStars) >= countStars
      ? 100
      : (countActiveStars * 100) / countStars;
  useEffect(() => {
    for (let index = 0; index < countStars; index++) {
      setShadedStars((prev) => [...prev, "★"]);
      setNoShadedStars((prev) => [...prev, "☆"]);
    }
  }, []);

  const ratingStyle = {
    "--size": size + "px",
  };
  const activeStyle = {
    "--width": percent + "%",
    "--color": color,
    "--content": shadedStars.join(""),
  };
  const bodyStyle = {
    "--content": noShadedStars.join(""),
    "--color": color,
  };

  return (
    <div className="rating" style={ratingStyle}>
      <div
        className="rating__body"
        style={bodyStyle}
        data-content={noShadedStars.join("")}
      >
        <div
          className="rating__active"
          style={activeStyle}
          data-content={shadedStars.join("")}
        ></div>
        <div className="rating__items">
          <input
            type="radio"
            className="rating__item"
            value={1}
            name="star"
          ></input>
          <input
            type="radio"
            className="rating__item"
            value={2}
            name="star"
          ></input>
          <input
            type="radio"
            className="rating__item"
            value={3}
            name="star"
          ></input>
          <input
            type="radio"
            className="rating__item"
            value={4}
            name="star"
          ></input>
          <input
            type="radio"
            className="rating__item"
            value={5}
            name="star"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default React.memo(StarRating);
