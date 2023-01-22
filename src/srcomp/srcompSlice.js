import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teams: {},
  lastScoredMatch: null,
  currentDelay: null,
  knockouts: {},
};

export const srcompSlice = createSlice({
  name: "srcomp",
  initialState,
  reducers: {
    updateTeamData: (state, action) => {
      const teamData = JSON.parse(action.payload);
      state.teams[teamData["tla"]] = teamData;
    },
    setLastScoredMatch: (state, action) => {
      state.lastScoredMatch = JSON.parse(action.payload);
    },
    setCurrentDelay: (state, action) => {
      state.currentDelay = JSON.parse(action.payload);
    },
    setKnockouts: (state, action) => {
      state.knockouts = JSON.parse(action.payload);
    },
  },
});

export const {
  updateTeamData,
  setLastScoredMatch,
  setCurrentDelay,
  setKnockouts,
} = srcompSlice.actions;

export default srcompSlice.reducer;
