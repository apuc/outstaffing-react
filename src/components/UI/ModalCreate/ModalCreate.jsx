import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setProject } from "../../../redux/projectsTrackerSlice";
import {apiRequest} from "../../../api/request";

import "./ModalCreate.scss";

export const ModalCreate = ({ active, setActive, title }) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  function createName() {
    if (inputValue === "") {
      return;
    } else {
      apiRequest('/project/create', {
        method: 'POST',
        data: {
          user_id: localStorage.getItem('id'),
          name: inputValue,
          status: 1,
        }
      }).then((res) => {
        dispatch(setProject(res));
        setActive(false);
        setInputValue("");
      })
    }
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
          <button className="create-project" onClick={createName}>
            Создать
          </button>
        </div>
        <span className="exit" onClick={() => setActive(false)}></span>
      </div>
    </div>
  );
};

export default ModalCreate;
