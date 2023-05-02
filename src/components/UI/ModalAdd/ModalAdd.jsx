import React from "react";

import "./modalAdd.scss";

export const ModalAdd = ({ children, active, setActive }) => {
  return (
    <div
      className={active ? "modal-add active" : "modal-add"}
      onClick={() => setActive(false)}
    >
      <div className="modal-add__content" onClick={(e) => e.stopPropagation()}>
        {children}
        <span className="exit" onClick={() => setActive(false)}></span>
      </div>
    </div>
  );
};

export default ModalAdd;
