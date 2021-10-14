import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { summaryData } from "../../utilities/stockData";

export const yahooSummary = createAsyncThunk("fetchSummmary", async () => {
  const response = await summaryData();
  return response;
});

const initialState = {
  data: [],
  showData: false,
  dataLoading: false,
  dataLoaded: false,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    isLoading: (state) => {
      state.dataLoading = true;
      state.dataLoaded = false;
    },
    isLoaded: (state) => {
      state.dataLoading = false;
      state.dataLoaded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(yahooSummary.pending, (state) => {
        state.dataLoading = true;
      })
      .addCase(yahooSummary.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.dataLoading = false;
        state.dataLoaded = true;
      });
  },
});

export const { isLoading, isLoaded } = dataSlice.actions;

export const dataState = (state) => state.data;

export default dataSlice.reducer;
