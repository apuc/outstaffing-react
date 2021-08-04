import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tags: [],
  profiles: [],
  filteredCandidates: [],
  selectedItems: [],
  currentCandidate: {},
  auth: false,
};

export const outstaffingSlice = createSlice({
  name: 'outstaffing',
  initialState,
  reducers: {
    tags: (state, action) => {
      state.tags = action.payload;
    },
    profiles: (state, action) => {
      state.profiles = action.payload;
    },
    filteredCandidates: (state, action) => {
      state.filteredCandidates = action.payload;
    },
    selectedItems: (state, action) => {
      state.selectedItems = action.payload;
    },
    currentCandidate: (state, action) => {
      state.currentCandidate = action.payload;
    },
    auth: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { tags, profiles, selectedItems, auth, currentCandidate, filteredCandidates } = outstaffingSlice.actions;

export const selectProfiles = (state) => state.outstaffing.profiles;
export const selectTags = (state) => state.outstaffing.tags;
export const selectFilteredCandidates = (state) => state.outstaffing.filteredCandidates;
export const selectItems = (state) => state.outstaffing.selectedItems;
export const selectCurrentCandidate = (state) => state.outstaffing.currentCandidate;
export const selectAuth = (state) => state.outstaffing.auth;

export default outstaffingSlice.reducer;
