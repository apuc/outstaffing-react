import React from "react";
import "./ModalTiket.scss";

export const ModalTiket = ({ active, setActive }) => {
  return (
    <div
      className={active ? "modal-tiket active" : "modal-tiket"}
      onClick={() => setActive(false)}
    >
      <div
        className="modal-tiket__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="colum author"></div>
        <div className="colum content"></div>
        <div className="colum workers"></div>
      </div>
    </div>
  );
};

export default ModalTiket;
