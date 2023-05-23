import React from "react";
import "./FrequentlyAskedQuestionsItem.scss";
import { FREQUENTLY_ASKED_QUESTION_ROUTE } from "../../constants/router-path";
import { Link } from "react-router-dom";
import questionIcon from "./../../images/faq/question.svg";

export const FrequentlyAskedQuestionsItem = ({ rubric }) => {
  return (
    <div className="frequently-asked-questions-item">
      <div className="frequently-asked-questions-item__head">
        <div className="frequently-asked-questions-item__icon-question"><img src={questionIcon} alt="" /></div>
        <div className="frequently-asked-questions-item__title">
          {rubric?.title}
        </div>
      </div>
      {rubric?.questions?.map((question) => (
        <Link
          key={question.id}
          to={FREQUENTLY_ASKED_QUESTION_ROUTE + "/" + question.id}
          className="frequently-asked-questions-item__body"
        >
          <p>{question.title}</p>
        </Link>
      ))}
    </div>
  );
};
