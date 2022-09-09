import { useDispatch, useSelector } from "react-redux";
import {
  LOG_USER_IN,
  LOG_USER_OUT,
  selectUserIsLoggedIn,
} from "../redux/features/userSlice";

export const useUserLog = () => {
  const dispatch = useDispatch();
  const userIsLoggedIn = useSelector(selectUserIsLoggedIn);
  const logUserIn = () => dispatch(LOG_USER_IN());
  const logUserOut = () => dispatch(LOG_USER_OUT());

  return {
    userIsLoggedIn,
    logUserIn,
    logUserOut,
  };
};
