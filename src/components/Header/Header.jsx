import React from "react";

import { LogoutButton } from "../LogoutButton/LogoutButton";

import "./header.scss";

export const Header = () => {
  return (
    <div className="container header">
      <h2>
        <span>Аутстаффинг</span> it-персонала
      </h2>
      <LogoutButton />
    </div>
  );
};
