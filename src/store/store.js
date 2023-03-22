import { configureStore } from "@reduxjs/toolkit";
import outstaffingReducer from "../redux/outstaffingSlice";
import loaderReducer from "../redux/loaderSlice";
import roleReducer from "../redux/roleSlice";
import reportReducer from "../redux/reportSlice";
import quizSlice from "../redux/quizSlice";
import projectsTrackerSlice from "../redux/projectsTrackerSlice";

export const store = configureStore({
  reducer: {
    outstaffing: outstaffingReducer,
    loader: loaderReducer,
    role: roleReducer,
    report: reportReducer,
    tracker: projectsTrackerSlice,
    quiz: quizSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
