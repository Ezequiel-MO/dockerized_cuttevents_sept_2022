import { createSlice } from "@reduxjs/toolkit";

export const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    hotel: "",
    schedule: JSON.parse(localStorage.getItem("schedule")) || [],
  },
  reducers: {
    SET_BUDGET_SCHEDULE: (state, action) => {
      state.schedule = action.payload;
    },
    UPDATE_BUDGET_SCHEDULE: (state, action) => {
      const { date, id, selectedOption } = action.payload;
      return {
        //return the new schedule with the updated budget
        ...state,
        schedule: state.schedule.map((item) => {
          if (item.date === date) {
            return {
              ...item,
              [id]: [selectedOption],
            };
          }
          return item;
        }),
      };
    },
    SET_SELECTED_HOTEL: (state, action) => {
      //update initialState hotel key with the action.payload
      state.hotel = action.payload;
    },
  },
});

export const {
  SET_BUDGET_SCHEDULE,
  UPDATE_BUDGET_SCHEDULE,
  SET_SELECTED_HOTEL,
} = budgetSlice.actions;

export const selectBudget = (state) => state.budget;

export default budgetSlice.reducer;
