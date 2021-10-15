import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newsData } from "../../utilities/stockData";

export const yahooNewsFeed = createAsyncThunk("fetchNews", async () => {
  const response = await newsData();
  return response;
});

const initialState = {
  data: [],
  showData: false,
  dataLoading: false,
  dataLoaded: false,
};

export const newsDataSlice = createSlice({
  name: "newsData",
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
      .addCase(yahooNewsFeed.pending, (state) => {
        state.dataLoading = true;
      })
      .addCase(yahooNewsFeed.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.dataLoading = false;
        state.dataLoaded = true;
      });
  },
});

export const { isLoading, isLoaded } = newsDataSlice.actions;

export const newsDataState = (state) => state.newsData;

export default newsDataSlice.reducer;
