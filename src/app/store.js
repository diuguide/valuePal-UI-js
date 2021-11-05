import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "../slice/error/errorSlice";
import authReducer from "../slice/auth/authSlice";
import dataReducer from "../slice/data/dataSlice";
import newsDataReducer from "../slice/data/newsDataSlice";
import tickerDataReducer from "../slice/data/tickerSearchSlice";
import tickerHistoryReducer from "../slice/data/tickerHistorySlice";

export const store = configureStore({
  reducer: {
    error: errorReducer,
    auth: authReducer,
    data: dataReducer,
    newsData: newsDataReducer,
    ticker: tickerDataReducer,
    tickerHist: tickerHistoryReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
