import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  teams: {},
  lastScoredMatch: null,
  currentDelay: null,
  knockouts: {},
  matches: [],
  arenas: {},
  corners: {},
};

export const fetchMatches = createAsyncThunk("matches/fetch", async () => {
  const response = await fetch(`${process.env.API_URL}/matches`);
  const matchData = await response.json();
  return matchData;
});

export const fetchArenas = createAsyncThunk("arenas/fetch", async () => {
  const response = await fetch(`${process.env.API_URL}/arenas`);
  const arenaData = await response.json();
  return arenaData;
});

export const fetchCorners = createAsyncThunk("corners/fetch", async () => {
  const response = await fetch(`${process.env.API_URL}/corners`);
  const cornerData = await response.json();
  return cornerData;
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
    builder.addCase(fetchArenas.fulfilled, (state, action) => {
      state.arenas = action.payload.arenas;
    });
    builder.addCase(fetchCorners.fulfilled, (state, action) => {
      state.corners = action.payload.corners;
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
