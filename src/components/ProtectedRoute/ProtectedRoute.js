import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

import { selectAuth } from "@redux/outstaffingSlice";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector(selectAuth);
  const existingToken = localStorage.getItem("auth_token");
  const expiresAt = localStorage.getItem("access_token_expired_at");

  // eslint-disable-next-line no-unused-vars
  const isTokenAlive =
    !isAuth &&
    existingToken &&
    expiresAt &&
    new Date(expiresAt).getTime() > new Date().getTime();

  return (
    <Route
      {...rest}
      render={
        (props) => (
          // ( isAuth || isTokenAlive) ? (
          <Component {...props} />
        )
        // ) : <Redirect to='/auth' />
      }
    />
  );
};
