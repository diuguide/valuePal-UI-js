import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userData } from "../../utilities/auth";
import { tickerData } from "../../utilities/stockData";
import {
  purchaseOrder,
  sellHoldingOrder,
  updateHoldings,
  getUserOrders,
  getUserHoldings,
  getUserCash,
  createHoldingRow
} from "../../utilities/wallet";

export const getUserData = createAsyncThunk("getUserData", async (token) => {
  const response = await userData(token);
  const resCash = await getUserCash(token);
  return { response, resCash };
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

export const userHoldings = createAsyncThunk(
  "getUserHoldings",
  async (token) => {
    const response = await getUserHoldings(token);
    const responseCall = await updatePrices(response);
    return createHoldingRow(response, responseCall);
  }
);

const updatePrices = async (response) => {
  let temp = [];
  response.data.forEach((el) => {
    temp.push(el.ticker);
  });
  let responseCall = await tickerData(temp);
  return responseCall;
} 

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
    totalCash:0,
    assetValue:0
  },
  order: {
    isLoading: false,
    isLoaded: false,
    orders: {},
    msg: {
      message: "",
      showMsg: false,
    },
  },
  holding: {
    isLoading: false,
    isLoaded: false,
    holdings: [],
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
          state.purchasePanel.msg.message = `Order #${action.payload.data.id} Complete! Sold ${action.payload.data.quantity} shares of ${action.payload.data.ticker} @ $${action.payload.data.price}`;
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
          state.purchasePanel.msg.message = `Order #${action.payload.data.id} Complete! Purchased ${action.payload.data.quantity} shares of ${action.payload.data.ticker} @ $${action.payload.data.price}`;
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
        state.user.totalCash = action.payload.resCash.data.totalCash;
        state.wallet = action.payload.response.holdings;
        state.user.username = action.payload.response.username;
        state.user.firstName = action.payload.response.firstName;
        state.user.email = action.payload.response.email;
      })
      .addCase(userOrders.pending, (state) => {
        state.order.isLoading = true;
        state.order.isLoaded = false;
      })
      .addCase(userOrders.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.order.isLoading = false;
          state.order.isLoaded = true;
          state.order.orders = action.payload.data;
        } else if (action.payload.status === 400) {
          state.order.isLoading = false;
          state.order.isLoaded = true;
          state.order.msg.message = action.payload.data;
          state.order.msg.showMsg = true;
        }
      })
      .addCase(userHoldings.pending, (state) => {
        state.holding.isLoading = true;
        state.holding.isLoaded = false;
      })
      .addCase(userHoldings.fulfilled, (state, action) => {
        console.log("complete purchase: ", action.payload);
        if (action.payload.length > 0) {
          state.holding.isLoading = false;
          state.holding.isLoaded = true;
          state.holding.holdings = action.payload;
        } else {
          state.holding.isLoading = false;
          state.holding.isLoaded = true;
          state.holding.msg.message = action.payload.data;
          state.holding.msg.showMsg = true;
        }
      });
  },
});

export const { isLoading, isLoaded, hideErrors } = walletSlice.actions;
export const walletState = (state) => state.wallet;
export default walletSlice.reducer;
