import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRole} from "../redux/roleSlice";
import {useNavigate} from "react-router-dom";
import {auth} from "../redux/outstaffingSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const userRole = useSelector(getRole);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    dispatch(auth(false));
    console.log('logout')
    navigate(userRole === 'ROLE_DEV' ? '/authdev' : '/auth')
  };

  return {logout}
};