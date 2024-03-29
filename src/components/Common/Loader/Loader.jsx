import React from "react";
import SVGLoader from "react-loader-spinner";

import "./loader.scss";

export const Loader = ({ width = 50, height = 50, style }) => {
  return (
    <div className="loader">
      <SVGLoader
        type="Circles"
        color={style ? style : `#fff`}
        height={height}
        width={width}
      />
    </div>
  );
};
