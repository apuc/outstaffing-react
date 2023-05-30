import React from "react";

import iconSpecialization from "assets/images/partnerProfile/personalBackEnd.svg";

export const SelectedCategory = ({ setSelectedCategory }) => {
  return (
    <div className="selected-category">
      <div className="selected-category__container">
        <div className="selected-category__title">
          Ваша выбранная <br /> категория
        </div>
        <div className="selected-category__category">
          <div className="selected-category__image">
            <img src={iconSpecialization} alt="" />
          </div>
          <div className="selected-category__title-category">
            Backend <br /> разработчики
          </div>
        </div>
        <button
          onClick={() => setSelectedCategory(true)}
          className="selected-category__button"
        >
          Заменить специализацию{" "}
        </button>
      </div>
    </div>
  );
};
