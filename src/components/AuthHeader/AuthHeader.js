import React from "react";

import "./authHeader.scss";

export const AuthHeader = ({}) => {
  return (
    <div className="auth-header">
      <div className="auth-header__logo">
        <h3>itguild.</h3>
      </div>
      <div className="auth-header__navigation"></div>
    </div>
  );
};

export default AuthHeader;
