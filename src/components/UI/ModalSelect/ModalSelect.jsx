import React from "react";

import "./modalSelect.scss";

export const ModalSelect = ({ active, children }) => {
  return (
    <div className={active ? "project__settings active" : "project__settings "}>
      {children}
    </div>
  );
};

export default ModalSelect;
