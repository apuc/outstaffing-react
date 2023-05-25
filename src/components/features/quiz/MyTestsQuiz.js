import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setSelectedTest } from "../../../redux/quizSlice";
import { urlForLocal } from "../../../helper";

import calendarImage from "./../../../assets/icons/calendar.svg";

import "./quiz.scss";

export const MyTestsQuiz = ({ listTests }) => {
  const formationEndingOfScore = (score) => {
    const lastNumber = score % 10;
    if (score === 11 || score === 12 || score === 13 || score === 14) {
      return "баллов";
    } else if (lastNumber === 2 || lastNumber === 3 || lastNumber === 4) {
      return "балла";
    } else if (lastNumber === 1) {
      return "балл";
    } else {
      return "баллов";
    }
  };

  const dispatch = useDispatch();
  const recordSelectedTest = (item) => dispatch(setSelectedTest(item));

  return (
    <div className="my-tests">
      <div className="my-tests__container">
        <div className="my-tests__title">Мои тесты</div>
        <div className="my-tests__items">
          {listTests.map((item) => {
            switch (item.status) {
              case 1:
                return (
                  <article
                    className="my-tests__item item-test"
                    key={item.questionnaire_title}
                  >
                    <h3 className="item-test__name-test">
                      {item.questionnaire_title}
                    </h3>
                    <div className="item-test__body test-data">
                      <Link
                        to={"/quiz/interjacent"}
                        className="quiz-btn"
                        onClick={() => recordSelectedTest(item)}
                      >
                        Пройти
                      </Link>
                    </div>
                  </article>
                );
              case 2:
                return (
                  <article
                    className="my-tests__item item-test"
                    key={item.questionnaire_title}
                  >
                    <h3 className="item-test__name-test">
                      {item.questionnaire_title}
                    </h3>
                    <div className="item-test__body test-data">
                      <div className="test-data__calendar ">
                        <img src={urlForLocal(calendarImage)} alt="" />
                        {item.testing_date}
                      </div>
                      <div className="test-data__hr"></div>
                      <div className="test-data__score quiz-text">
                        {item.score} {formationEndingOfScore(item.score)}
                      </div>
                    </div>
                  </article>
                );
              case 3:
                return (
                  <article
                    className="my-tests__item item-test"
                    key={item.questionnaire_title}
                  >
                    <h3 className="item-test__name-test">
                      {item.questionnaire_title}
                    </h3>
                    <div className="item-test__body test-data">
                      <div className="quiz-btn">На проверке</div>
                    </div>
                  </article>
                );
              default:
                break;
            }
          })}
        </div>
      </div>
    </div>
  );
};
