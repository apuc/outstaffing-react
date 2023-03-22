import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../../../redux/projectsTrackerSlice";

import "./ModalCreate.scss";

export const ModalCreate = ({ active, setActive, title }) => {
  const [inputValue, setInputValue] = useState("");

  const projectInfo = useSelector(addProject);
  const dispatch = useDispatch();

  function createName() {
    let newItem = {
      name: inputValue,
      count: 0,
    };
    dispatch(addProject(newItem));
    // console.log(newItem);
    setActive(false);
  }

  return (
    <div
      className={active ? "modal-project active" : "modal-project"}
      onClick={() => setActive(false)}
    >
      <div
        className="modal-project__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="title-project">
          <h4>{title}</h4>
          <div className="input-container">
            <input
              className="name-project"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            ></input>
          </div>
        </div>
        <button className="create-project" onClick={createName}>
          Создать
        </button>
      </div>
    </div>
  );
};

export default ModalCreate;
