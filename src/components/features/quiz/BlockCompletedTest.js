import React from "react";
import { Link } from "react-router-dom";

import compltedImage from "assets/images/quiz/compltedImage.png";

export const BlockCompletedTest = () => {
  const id = localStorage.getItem("id");
  return (
    <div className="block-completed-test">
      <div className="block-completed-test__container">
        <div className="block-completed-test__img">
          <img src={compltedImage} alt="" />
        </div>
        <div className="block-completed-test__title">
          Спасибо! <br />
          Ваши ответы получены
        </div>
        <div className="block-completed-test__text">
          В течении дня в вашем кабинете будет отображены данные о прохождении
          тестирования
        </div>
        <Link
          to={"/profile-candidate/" + id}
          className="block-completed-test__button quiz-btn"
        >
          В кабинет
        </Link>
      </div>
    </div>
  );
};
