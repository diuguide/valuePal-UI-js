import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tickerData } from "../../utilities/stockData";

export const yahooTickerSearch = createAsyncThunk("fetchTicker", async (ticker) => {
    console.log("ticker inside slice:", ticker);
    const response = await tickerData(ticker);
    return response;
  });

  const initialState = {
    data: [],
    showData: false,
    dataLoading: false,
    dataLoaded: false,
  };

  export const tickerDataSlice = createSlice({
    name: "tickerData",
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
        })
        .addCase(yahooTickerSearch.fulfilled, (state, action) => {
          state.data = action.payload.data;
          state.dataLoading = false;
          state.dataLoaded = true;
        });
    },
  });
  
  export const { isLoading, isLoaded } = tickerDataSlice.actions;
  
  export const tickerDataState = (state) => state.tickerData;
  
  export default tickerDataSlice.reducer;