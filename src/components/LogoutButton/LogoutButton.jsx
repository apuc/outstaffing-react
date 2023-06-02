import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getRole } from "@redux/roleSlice";

import { useLogout } from "@hooks/useLogout";

import { Loader } from "@components/Common/Loader/Loader";

import "./logoutButton.scss";

export const LogoutButton = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const userRole = useSelector(getRole);
  const navigate = useNavigate();
  const { logout } = useLogout();

  return (
    <button
      className="logout-button"
      onClick={() => {
        setIsLoggingOut(true);
        logout();
        setIsLoggingOut(false);
        navigate(userRole === "ROLE_DEV" ? "/authdev" : "/auth");
      }}
    >
      {isLoggingOut ? <Loader /> : "Выйти"}
    </button>
  );
};
