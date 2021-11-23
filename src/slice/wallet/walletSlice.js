import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  purchaseOrder,
  retrieveWallet,
  sellHoldingOrder,
  updateHoldingsTable,
} from "../../utilities/wallet";

export const retrieveWal = createAsyncThunk("fetchWallet", async (token) => {
  const response = await retrieveWallet(token);
  return response;
});

export const updateHoldingsTableFunc = createAsyncThunk(
  "updateHoldingsTable",
  async () => {
    const response = await updateHoldingsTable();
    return response;
  }
);

export const buyStockOrder = createAsyncThunk(
  "buyStock",
  async (token, order) => {
    const response = await purchaseOrder(token, order);
    return response;
  }
);

export const sellStockOrder = createAsyncThunk("sellStock", async (order) => {
  const response = await sellHoldingOrder(order.token, order.sellOrder);
  console.log("Sell STOCK RESPONSE IN SLICE: ", response);
  return response;
});

const initialState = {
  wallet: {},
  isLoading: false,
  isLoaded: false,
  purchasePanel: {
    isLoading: false,
    isLoaded: false,
    msg: {
      message: "",
      showMsg: false,
    },
  },
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
    hideErrors: (state) => {
      state.purchasePanel.msg.message = "";
      state.purchasePanel.msg.showMsg = false;
    }
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
      })
      .addCase(updateHoldingsTableFunc.pending, (state) => {
        state.isLoading = true;
        state.isLoaded = false;
      })
      .addCase(updateHoldingsTableFunc.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoaded = true;
      })
      .addCase(sellStockOrder.pending, (state) => {
        state.purchasePanel.isLoading = true;
        state.purchasePanel.isLoaded = false;
      })
      .addCase(sellStockOrder.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.purchasePanel.isLoading = false;
          state.purchasePanel.isLoaded = true;
          state.purchasePanel.msg.message = "Transaction Complete!";
          state.purchasePanel.msg.showMsg = true;
        } else if (action.payload.status === 400) {
          state.purchasePanel.isLoading = false;
          state.purchasePanel.isLoaded = true;
          state.purchasePanel.msg.message = action.payload.data;
          state.purchasePanel.msg.showMsg = true;
        }
      });
  },
});

export const { isLoading, isLoaded, hideErrors } = walletSlice.actions;
export const walletState = (state) => state.wallet;
export default walletSlice.reducer;
