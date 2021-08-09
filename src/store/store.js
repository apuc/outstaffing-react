import { configureStore } from '@reduxjs/toolkit';
import outstaffingReducer from '../redux/outstaffingSlice';
import loaderReducer from '../redux/loaderSlice';

export const store = configureStore({
  reducer: {
    outstaffing: outstaffingReducer,
    loader: loaderReducer,
  },
});
