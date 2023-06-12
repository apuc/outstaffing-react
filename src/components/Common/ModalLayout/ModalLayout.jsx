import React from "react";

import "./modalLayout.scss";

export const ModalLayout = ({
  active,
  setActive,
  children,
  styles,
  ...props
}) => {
  return (
    <div
      className={active ? `modal-layout active` : "modal-layout"}
      onClick={() => setActive(false)}
      {...props}
    >
      <div
        className={
          styles ? `modal-layout__content ${styles}` : "modal-layout__content"
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
