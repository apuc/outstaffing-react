import React from "react";

import "./modalSettings.scss";

export const ModalSettings = ({ active, children }) => {
  return (
    <div className={active ? "project__settings active" : "project__settings "}>
      {children}
    </div>
  );
};

export default ModalSettings;
