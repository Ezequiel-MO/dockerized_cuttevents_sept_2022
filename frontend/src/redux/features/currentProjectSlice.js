import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: JSON.parse(localStorage.getItem("currentProject")) || {},
};

export const currentProjectSlice = createSlice({
  name: "currentProject",
  initialState,
  reducers: {
    SET_CURRENT_PROJECT: (state, action) => {
      state.project = action.payload;
    },
  },
});

export const { SET_CURRENT_PROJECT } = currentProjectSlice.actions;

export const selectCurrentProject = (state) => state.currentProject.project;

export default currentProjectSlice.reducer;
