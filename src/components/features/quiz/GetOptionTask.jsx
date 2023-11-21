import React from "react";

export const GetOptionTask = ({ type, answer, handleChange }) => {
  const {answer_body,id} = answer
  return (
    <div className="form-task__group" key={id}>
      <input
        className="form-task__check"
        type={+type === 3 ? "checkbox" : "radio"}
        value={answer_body}
        name={+type === 3 ? "checkbox" : "radio"}
        id={id}
        onChange={handleChange}
      />
      <label htmlFor={id}>{answer_body}</label>
    </div>
  );
};
