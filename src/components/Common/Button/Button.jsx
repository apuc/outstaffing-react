import React from "react";

import classes from "./button.module.scss";

export const Button = ({ children, styles, ...props }) => {
  return (
    <button
      className={styles ? `${styles} ${classes.button}` : classes.button}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
