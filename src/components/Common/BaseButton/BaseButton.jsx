import React from "react";

import classes from "./basebutton.module.scss";

export const BaseButton = ({ children, styles, ...props }) => {
  return (
    <button
      className={styles ? `${styles} ${classes.button}` : classes.button}
      {...props}
    >
      {children}
    </button>
  );
};

export default BaseButton;
