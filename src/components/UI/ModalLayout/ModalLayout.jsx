import React from "react";

export const ModalLayout = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? "modal-add active" : "modal-add"}
      onClick={() => setActive(false)}
    >
      <div className="modal-add__content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
