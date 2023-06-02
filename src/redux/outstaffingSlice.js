import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tags: [],
  profiles: [],
  filteredCandidates: null,
  selectedItems: [],
  currentCandidate: {},
  auth: false,
  positionId: null,
  profileInfo: {},
  reportsDates: "",
  partnerEmployees: [],
  partnerRequestId: null,
  partnerRequests: [],
  partnerRequestInfo: {},
};

export const outstaffingSlice = createSlice({
  name: "outstaffing",
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
    setPositionId: (state, action) => {
      state.positionId = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setProfileInfo: (state, action) => {
      state.profileInfo = action.payload;
    },
    setReportsDates: (state, action) => {
      state.reportsDates = action.payload;
    },
    setPartnerEmployees: (state, action) => {
      state.partnerEmployees = action.payload;
    },
    setPartnerRequestId: (state, action) => {
      state.partnerRequestId = action.payload;
    },
    setPartnerRequests: (state, action) => {
      state.partnerRequests = action.payload;
    },
    setPartnerRequestInfo: (state, action) => {
      state.partnerRequestInfo = action.payload;
    },
  },
});

export const {
  tags,
  profiles,
  selectedItems,
  auth,
  currentCandidate,
  filteredCandidates,
  setPositionId,
  setUserInfo,
  setProfileInfo,
  setReportsDates,
  setPartnerEmployees,
  setPartnerRequestId,
  setPartnerRequests,
  setPartnerRequestInfo,
} = outstaffingSlice.actions;

export const selectProfiles = (state) => state.outstaffing.profiles;
export const selectTags = (state) => state.outstaffing.tags;
export const selectFilteredCandidates = (state) =>
  state.outstaffing.filteredCandidates;
export const selectItems = (state) => state.outstaffing.selectedItems;
export const selectCurrentCandidate = (state) =>
  state.outstaffing.currentCandidate;
export const selectAuth = (state) => state.outstaffing.auth;
export const getPositionId = (state) => state.outstaffing.positionId;
export const getProfileInfo = (state) => state.outstaffing.profileInfo;
export const getPartnerRequestInfo = (state) =>
  state.outstaffing.partnerRequestInfo;
export const selectUserInfo = (state) => state.outstaffing.userInfo;
export const getReportsDates = (state) => state.outstaffing.reportsDates;
export const getPartnerEmployees = (state) =>
  state.outstaffing.partnerEmployees;
export const getPartnerRequestId = (state) =>
  state.outstaffing.partnerRequestId;
export const getPartnerRequests = (state) => state.outstaffing.partnerRequests;

export default outstaffingSlice.reducer;
