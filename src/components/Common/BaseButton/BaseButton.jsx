import React from "react";

import "./basebutton.scss";

export const BaseButton = ({ children, styles, onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={styles ? `${styles} button` : "button"}
      {...props}
    >
      {children}
    </button>
  );
};

export default BaseButton;
