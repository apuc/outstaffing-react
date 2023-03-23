import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: [
    {
      name: "Разработка трекера",
      count: 4,
    },
    {
      name: "Кинотеатр",
      count: 4,
    },
    {
      name: "Проект страхование",
      count: 4,
    },
  ],
};

export const projectsTrackerSlice = createSlice({
  name: "projectsTracker",
  initialState,
  reducers: {
    setProject: (state, action) => {
      state.project.push(action.payload);
    },
  },
});

export const { setProject } = projectsTrackerSlice.actions;

export const getProjects = (state) => state.tracker.project;

export default projectsTrackerSlice.reducer;
