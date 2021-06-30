import { configureStore } from '@reduxjs/toolkit';
import outstaffingReducer from '../redux/outstaffingSlice';

export const store = configureStore({
  reducer: {
    outstaffing: outstaffingReducer,
  },
});
