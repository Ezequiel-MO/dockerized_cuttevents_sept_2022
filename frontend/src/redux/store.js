import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import currentProjectReducer from "./features/currentProjectSlice";
import budgetReducer from "./features/budgetSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    currentProject: currentProjectReducer,
    budget: budgetReducer,
  },
});
