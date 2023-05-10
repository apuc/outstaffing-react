import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../api/request";

const initialState = {
  projects: [],
  projectBoard: {},
  toggleTab: 1,
  modalType: "",
  titleColumn: "",
  boardLoader: false,
};

export const setProjectBoardFetch = createAsyncThunk("userInfo", (id) =>
  apiRequest(`/project/get-project?project_id=${id}&expand=columns`)
);

export const projectsTrackerSlice = createSlice({
  name: "projectsTracker",
  initialState,
  reducers: {
    setAllProjects: (state, action) => {
      state.projects = action.payload;
    },
    setProject: (state, action) => {
      state.projects.push(action.payload);
    },
    setToggleTab: (state, action) => {
      state.toggleTab = action.payload;
    },
    deleteProject: (state, action) => {
      state.projects.forEach((project) => {
        if (project.id === action.payload.id) {
          project.status = 10;
        }
      });
    },
    activeLoader: (state) => {
      state.boardLoader = true;
    },
    moveProjectTask: (state, action) => {
      state.projectBoard.columns.forEach((column, index) => {
        if (column.id === action.payload.columnId) {
          column.tasks.push(action.payload.startWrapperIndex.task);
          apiRequest(`/task/update-task`, {
            method: "PUT",
            data: {
              task_id: action.payload.startWrapperIndex.task.id,
              column_id: column.id,
            },
          }).then((res) => {});
        }
        if (column.id === action.payload.startWrapperIndex.index) {
          state.projectBoard.columns[index].tasks = column.tasks.filter(
            (task) => task.id !== action.payload.startWrapperIndex.task.id
          );
        }
      });
    },
    editProjectName: (state, action) => {
      state.projects.forEach((project) => {
        if (project.id === action.payload.id) {
          project.name = action.payload.name;
        }
      });
    },
    modalToggle: (state, action) => {
      state.modalType = action.payload;
    },
    setColumnTitle: (state, action) => {
      state.titleColumn = action.payload;
    },
  },
  extraReducers: {
    [setProjectBoardFetch.fulfilled]: (state, action) => {
      state.projectBoard = action.payload;
      state.boardLoader = false;
    },
  },
});

export const {
  setProject,
  deleteProject,
  setAllProjects,
  moveProjectTask,
  setToggleTab,
  modalToggle,
  activeLoader,
  editProjectName,
  setColumnTitle,
} = projectsTrackerSlice.actions;

export const getProjects = (state) => state.tracker.projects;
export const getProjectBoard = (state) => state.tracker.projectBoard;
export const getToggleTab = (state) => state.tracker.toggleTab;
export const getValueModalType = (state) => state.tracker.modalType;
export const getColumnTitle = (state) => state.tracker.titleColumn;
export const getBoarderLoader = (state) => state.tracker.boardLoader;

export default projectsTrackerSlice.reducer;
