import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentProject,
  SET_CURRENT_PROJECT,
} from "../redux/features/currentProjectSlice";

export const useCurrentProject = () => {
  const dispatch = useDispatch();
  const currentProject = useSelector(selectCurrentProject);
  const setCurrentProject = (project) => dispatch(SET_CURRENT_PROJECT(project));

  return {
    currentProject,
    setCurrentProject,
  };
};
