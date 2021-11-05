import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tickerHistory } from "../../utilities/stockData";

export const yahooTickerHistory = createAsyncThunk(
  "fetchHistory",
  async (ticker) => {
    const response = await tickerHistory(
      ticker.api,
      ticker.interval,
      ticker.range,
      ticker.ticker
    );
    return { response, ticker };
  }
);

const initialState = {
  data: [],
  showData: false,
  dataLoading: false,
  dataLoaded: false,
  ticker: "",
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
      })
      .addCase(yahooTickerHistory.fulfilled, (state, action) => {
        let temp = action.payload.ticker.ticker;
        console.log("TEMP: ", temp);
        console.log("Action.payload: ", action.payload.response.data[temp]);
        state.data = action.payload.response.data[temp];
        state.ticker = temp;
        state.dataLoading = false;
        state.dataLoaded = true;
      });
  },
});

export const { isLoading, isLoaded } = tickerHistorySlice.actions;
export const tickerHistoryState = (state) => state.tickerHist;
export default tickerHistorySlice.reducer;
