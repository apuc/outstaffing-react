import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { auth } from "../redux/outstaffingSlice";
import { getRole } from "../redux/roleSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const userRole = useSelector(getRole);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    dispatch(auth(false));
    navigate(userRole === "ROLE_DEV" ? "/authdev" : "/auth");
  };

  return { logout };
};
