import React from "react";

import "./modalLayout.scss";

export const ModalLayout = ({
  active,
  setActive,
  children,
  styles,
  type,
  ...props
}) => {
  return (
    <div
      className={active ? `modal-layout active` : "modal-layout"}
      onClick={(event) => {
        if (event.target.className === "modal-layout active") {
          setActive(false);
        }
      }}
      {...props}
    >
      <div
        className={
          styles
            ? `modal-layout__content ${styles}`
            : `modal-layout__content ${type}`
        }
      >
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
