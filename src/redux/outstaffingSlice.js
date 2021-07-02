import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tags: [],
  profiles: [],
  candidates: [],
  selectedItems: [],
  selectedTab: '',
  currentCandidate: {},
  auth: true,
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
    candidates: (state, action) => {
      state.candidates = action.payload;
    },
    selectedTab: (state, action) => {
      state.selectedTab = action.payload;
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

export const { tags, profiles, candidates, selectedTab, selectedItems, auth, currentCandidate } =
  outstaffingSlice.actions;

export const selectProfiles = (state) => state.outstaffing.profiles;
export const selectTags = (state) => state.outstaffing.tags;
export const selectCandidates = (state) => state.outstaffing.candidates;
export const selectTab = (state) => state.outstaffing.selectedTab;
export const selectItems = (state) => state.outstaffing.selectedItems;
export const selectCurrentCandidate = (state) => state.outstaffing.currentCandidate;
export const selectAuth = (state) => state.outstaffing.auth;

export default outstaffingSlice.reducer;
