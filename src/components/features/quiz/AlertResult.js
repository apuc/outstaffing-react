import React from "react";

import suucessIcon from "assets/images/quiz/success.png";

export const AlertResult = () => {
  const successTest = false;

  return (
    <div className="alert-result">
      <div className="alert-result__column">
        <img
          src={suucessIcon}
          alt="suucessIcon"
          className="alert-result__icon"
        />
        <div
          className="alert-result__text"
          style={{ color: successTest ? "#52B709" : "#5B6871" }}
        >
          Благодарим Вас за прохождение теста "Junior разработчик". Ваши
          результаты проверены, готовы пригласить Вас в команду
        </div>
      </div>
      {!successTest && (
        <div className="alert-result__column">
          <button className="alert-result__button quiz-btn">
            Запросить еще попытку
          </button>
        </div>
      )}
    </div>
  );
};
