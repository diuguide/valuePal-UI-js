import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tickerHistory } from "../../utilities/stockData";

export const yahooTickerHistory = createAsyncThunk(
  "fetchHistory",
  async (ticker) => {
    try {
      const response = await tickerHistory(
        ticker.api,
        ticker.interval,
        ticker.range,
        ticker.ticker
      );
      console.log("response ticker history: ", response);
      return { response, ticker };
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState = {
  data: null,
  showData: false,
  dataLoading: false,
  dataLoaded: false,
  ticker: "",
  errorMsg: "",
  showError: false,
};

export const tickerHistorySlice = createSlice({
  name: "tickerHist",
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
      .addCase(yahooTickerHistory.pending, (state) => {
        state.dataLoading = true;
        state.dataLoaded = false;
        state.showError = false;
        state.errorMsg = "";
      })
      .addCase(yahooTickerHistory.fulfilled, (state, action) => {
        if (!action.payload.response.data.spark) {
          let temp = action.payload.ticker.ticker;
          state.data = action.payload.response.data[temp];
          state.ticker = temp;
          state.dataLoading = false;
          state.dataLoaded = true;
        } else {
          state.errorMsg = "Something went wrong!";
          state.showError = true;
        }
      });
  },
});

export const { isLoading, isLoaded } = tickerHistorySlice.actions;
export const tickerHistoryState = (state) => state.tickerHist;
export default tickerHistorySlice.reducer;
