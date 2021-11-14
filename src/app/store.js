import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "../slice/error/errorSlice";
import authReducer from "../slice/auth/authSlice";
import dataReducer from "../slice/data/dataSlice";
import newsDataReducer from "../slice/data/newsDataSlice";
import tickerDataReducer from "../slice/data/tickerSearchSlice";
import tickerHistoryReducer from "../slice/data/tickerHistorySlice";
import walletReducer from "../slice/wallet/walletSlice";

export const store = configureStore({
  reducer: {
    error: errorReducer,
    auth: authReducer,
    data: dataReducer,
    newsData: newsDataReducer,
    ticker: tickerDataReducer,
    tickerHist: tickerHistoryReducer,
    wallet: walletReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
