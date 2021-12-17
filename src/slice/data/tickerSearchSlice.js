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
  ticker: "",
  errorMsg: "",
  showError: false,
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
        state.showError = false;
        state.errorMsg = "";
        state.dataLoading = true;
        state.dataLoaded = false;
      })
      .addCase(yahooTickerSearch.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload.response.data[0];
          state.ticker = action.payload.ticker;
          state.dataLoading = false;
          state.dataLoaded = true;
        } else {
          state.errorMsg = "Not a valid Ticker!";
          state.showError = true;
        }
      });
  },
});

export const { isLoading, isLoaded } = tickerDataSlice.actions;

export const tickerDataState = (state) => state.ticker;

export default tickerDataSlice.reducer;
