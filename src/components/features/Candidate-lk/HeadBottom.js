import React from "react";

import medium_male from "../../../assets/images/medium_male.png";

export const HeadBottom = () => {
  return (
    <div className="bottom-head">
      <div className="bottom-head__container">
        <div className="bottom-head__title">Мои тесты</div>
        <div className="bottom-head__img">
          <img src={medium_male} alt="" />
        </div>
      </div>
    </div>
  );
};
