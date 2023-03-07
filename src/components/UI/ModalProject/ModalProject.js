import React from "react";

import "./ModalProject.scss";

export const ModalProject = ({ active, setActive }) => {
  return (
    <div className={active ? "modal-project active" : "modal-project"}>
      <div
        className="modal-project__content"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
};

export default ModalProject;
