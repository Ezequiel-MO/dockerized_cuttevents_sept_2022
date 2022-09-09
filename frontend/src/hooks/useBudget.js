import { useDispatch, useSelector } from "react-redux";
import {
  SET_BUDGET_SCHEDULE,
  UPDATE_BUDGET_SCHEDULE,
  SET_SELECTED_HOTEL,
  selectBudget,
} from "../redux/features/budgetSlice";

export const useBudget = () => {
  const dispatch = useDispatch();
  const budget = useSelector(selectBudget);
  const { schedule, hotel } = budget;

  const setBudgetSchedule = (schedule) =>
    dispatch(SET_BUDGET_SCHEDULE(schedule));
  const updateBudgetSchedule = (schedule) =>
    dispatch(UPDATE_BUDGET_SCHEDULE(schedule));
  const setSelectedHotel = (hotel) => dispatch(SET_SELECTED_HOTEL(hotel));

  return {
    schedule,
    hotel,
    setBudgetSchedule,
    updateBudgetSchedule,
    setSelectedHotel,
  };
};
