import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tickerData } from "../../utilities/stockData";

export const yahooTickerSearch = createAsyncThunk(
  "fetchTicker",
  async (ticker) => {
    const response = await tickerData(ticker);
    return { response, ticker };
  }
);

const initialState = {
  data: [],
  showData: false,
  dataLoading: false,
  dataLoaded: false,
  ticker: ""
};

export const tickerDataSlice = createSlice({
  name: "ticker",
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
      .addCase(yahooTickerSearch.pending, (state) => {
        state.dataLoading = true;
        state.dataLoaded = false;
      })
      .addCase(yahooTickerSearch.fulfilled, (state, action) => {
        state.data = action.payload.response.data;
        state.ticker = action.payload.ticker;
        state.dataLoading = false;
        state.dataLoaded = true;
      });
  },
});

export const { isLoading, isLoaded } = tickerDataSlice.actions;

export const tickerDataState = (state) => state.ticker;

export default tickerDataSlice.reducer;
