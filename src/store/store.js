import { configureStore } from "@reduxjs/toolkit";

import loaderReducer from "../redux/loaderSlice";
import outstaffingReducer from "../redux/outstaffingSlice";
import projectsTrackerSlice from "../redux/projectsTrackerSlice";
import quizSlice from "../redux/quizSlice";
import reportReducer from "../redux/reportSlice";
import roleReducer from "../redux/roleSlice";

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
