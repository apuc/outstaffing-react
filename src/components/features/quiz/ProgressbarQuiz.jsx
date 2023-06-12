import React from "react";

import "./quiz.scss";

export const Progressbar = ({ indexQuestion, width }) => {
  return (
    <div className="progressbar">
      <div className="progressbar__body">
        <div className="progressbar__value">{indexQuestion}</div>
        <div className="progressbar__strip">
          <div style={{ width: width + "%" }}></div>
        </div>
      </div>
    </div>
  );
};
