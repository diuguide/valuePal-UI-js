import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { retrieveWallet } from "../../utilities/wallet";

export const retrieveWal = createAsyncThunk(
  "fetchWallet",
  async (token) => {
    const response = await retrieveWallet(token);
    return response;
  }
);

const initialState = {
  wallet: {},
  isLoading: false,
  isLoaded: false,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    isLoading: (state) => {
      state.isLoading = true;
      state.isLoaded = false;
    },
    isLoaded: (state) => {
      state.isLoading = false;
      state.isLoaded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveWal.pending, (state) => {
        state.isLoading = true;
        state.isLoaded = false;
      })
      .addCase(retrieveWal.fulfilled, (state, action) => {
        state.wallet = action.payload;
        state.isLoading = false;
        state.isLoaded = true;
      });
  },
});

export const { isLoading, isLoaded } = walletSlice.actions;
export const walletState = (state) => state.wallet;
export default walletSlice.reducer;
