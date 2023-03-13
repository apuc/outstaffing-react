import React from "react";

import "./ModalProject.scss";

export const ModalProject = ({ active, setActive }) => {
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
          <h4>Укажите название проекта: </h4>
          <div className="input-container">
            <input className="name-project"></input>
          </div>
        </div>
        <button className="create-project">Создать</button>
      </div>
    </div>
  );
};

export default ModalProject;
