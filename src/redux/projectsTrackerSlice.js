import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {apiRequest} from "../api/request";

const initialState = {
  projects: [],
  projectBoard: {}
};

export const setProjectBoardFetch = createAsyncThunk(
    'userInfo',
    (id) =>
        apiRequest(`/project/get-project?project_id=${id}&expand=columns`)
);

export const projectsTrackerSlice = createSlice({
  name: "projectsTracker",
  initialState,
  reducers: {
    setAllProjects: (state, action) => {
      state.projects = action.payload
    },
    setProject: (state, action) => {
      state.projects.push(action.payload);
    },
    moveProjectTask: (state, action) => {
      state.projectBoard.columns.forEach((column, index) => {
        if (column.id === action.payload.columnId) {
          column.tasks.push(action.payload.startWrapperIndex.task)
        }
        if (column.id === action.payload.startWrapperIndex.index) {
          state.projectBoard.columns[index].tasks = column.tasks.filter((task)=> task.id !== action.payload.startWrapperIndex.task.id);
        }
      })
    }
  },
  extraReducers: {
    [setProjectBoardFetch.fulfilled]: (state, action) => {
      state.projectBoard = action.payload
    }
  }
});

export const { setProject, setAllProjects, moveProjectTask } = projectsTrackerSlice.actions;

export const getProjects = (state) => state.tracker.projects;
export const getProjectBoard = (state) => state.tracker.projectBoard;

export default projectsTrackerSlice.reducer;
