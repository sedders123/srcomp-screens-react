import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  teams: {},
  lastScoredMatch: null,
  currentDelay: null,
  knockouts: {},
  matches: [],
};

export const fetchMatches = createAsyncThunk("matches/fetch", async () => {
  const response = await fetch(`${process.env.API_URL}/matches`);
  const matchData = await response.json();
  return matchData;
});

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
  extraReducers: (builder) => {
    builder.addCase(fetchMatches.fulfilled, (state, action) => {
      state.lastScoredMatch = action.payload.last_scored;
      state.matches = action.payload.matches;
    });
  },
});

export const {
  updateTeamData,
  setLastScoredMatch,
  setCurrentDelay,
  setKnockouts,
} = srcompSlice.actions;

export default srcompSlice.reducer;
