import { configureStore } from '@reduxjs/toolkit';
import outstaffingReducer from '../redux/outstaffingSlice';
import loaderReducer from '../redux/loaderSlice';
import roleReducer from '../redux/roleSlice';
import reportReducer from '../redux/reportSlice';

export const store = configureStore({
  reducer: {
    outstaffing: outstaffingReducer,
    loader: loaderReducer,
    role: roleReducer,
    report: reportReducer,
  },
});
