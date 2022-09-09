import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: localStorage.getItem("userIsLogged") === "true" ? true : false,
  },
  reducers: {
    LOG_USER_IN: (state) => {
      state.isLoggedIn = true;
    },
    LOG_USER_OUT: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { LOG_USER_IN, LOG_USER_OUT } = userSlice.actions;
export const selectUserIsLoggedIn = (state) => state.user.isLoggedIn;

export default userSlice.reducer;
