import { useDispatch } from "react-redux";

import { closeNotification, setNotification } from "../redux/outstaffingSlice";

export const useNotification = () => {
  const dispatch = useDispatch();

  const showNotification = (notification) => {
    dispatch(setNotification(notification));
    setTimeout(() => {
      dispatch(closeNotification());
    }, 2500);
  };
  return { showNotification };
};
