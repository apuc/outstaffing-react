import React from "react";
import { useSelector } from "react-redux";
import { selectedTest } from "../../../redux/quizSlice";

export const GetOptionTask = ({ type, answer, handleChange, inputValue }) => {
  const id = localStorage.getItem("id");
  const dataTest = useSelector(selectedTest);

  switch (type) {
    case "1":
      return (
        <div className="form-task__group">
          <textarea
            className="form-task__field"
            value={inputValue}
            onChange={handleChange}
          />
        </div>
      );
    case "3":
      return (
        <div className="form-task__group" key={answer.id}>
          <input
            className="form-task__check"
            type="checkbox"
            value={answer.answer_body}
            id={answer.id}
            onChange={handleChange}
          />
          <label htmlFor={answer.id}>{answer.answer_body}</label>
        </div>
      );

    default:
      return (
        <div className="form-task__group" key={answer.id}>
          <input
            className="form-task__check"
            type="radio"
            value={answer.answer_body}
            name={"radio"}
            id={answer.id}
            onChange={handleChange}
          />
          <label htmlFor={answer.id}>{answer.answer_body}</label>
        </div>
      );
  }
};
