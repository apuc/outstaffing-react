import React from "react";

import "./basebutton.scss"

export const BaseButton = ({ children, styles, ...props }) => {
  return (
    <button
      className={styles ? `${styles} button` : "button"}
      {...props}
    >
      {children}
    </button>
  );
};

export default BaseButton;
