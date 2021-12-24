import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userData } from "../../utilities/auth";
import {
  purchaseOrder,
  sellHoldingOrder,
  updateHoldings,
  getUserOrders
} from "../../utilities/wallet";

export const getUserData = createAsyncThunk("getUserData", async (token) => {
  const response = await userData(token);
  return response;
});

export const updateHoldingsTableFunc = createAsyncThunk(
  "updateHoldingsTable",
  async () => {
    const response = await updateHoldings();
    return response;
  }
);

export const userOrders = createAsyncThunk("getUserOrders", async (token) => {
  const response = await getUserOrders(token);
  return response;
});

export const buyStockOrder = createAsyncThunk("buyStock", async (order) => {
  const response = await purchaseOrder(order.token, order.buyOrder);
  return response;
});

export const sellStockOrder = createAsyncThunk("sellStock", async (order) => {
  const response = await sellHoldingOrder(order.token, order.sellOrder);
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
  user: {
    username: "",
    firstName: "",
    email: "",
  },
  order: {
    isLoading: false,
    isLoaded: false,
    orders: {}
  }
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
    },
  },
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(buyStockOrder.pending, (state) => {
        state.purchasePanel.isLoading = true;
        state.purchasePanel.isLoaded = false;
      })
      .addCase(buyStockOrder.fulfilled, (state, action) => {
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
      })
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
        state.isLoaded = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoaded = true;
        state.wallet = action.payload.wallet;
        state.user.username = action.payload.username;
        state.user.firstName = action.payload.firstName;
        state.user.email = action.payload.email;
      })
      .addCase(userOrders.pending, (state) => {
        state.order.isLoading = true;
        state.order.isLoaded = false;
      })
      .addCase(userOrders.fulfilled, (state, action) => {
        state.order.isLoading = false;
        state.order.isLoaded = true;
        state.order.orders = action.payload;
      });
  },
});

export const { isLoading, isLoaded, hideErrors } = walletSlice.actions;
export const walletState = (state) => state.wallet;
export default walletSlice.reducer;
