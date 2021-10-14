import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "../slice/error/errorSlice";
import authReducer from "../slice/auth/authSlice";
import dataReducer from "../slice/data/dataSlice";
import newsDataReducer from "../slice/data/newsDataSlice";

export const store = configureStore({
  reducer: {
    error: errorReducer,
    auth: authReducer,
    data: dataReducer,
    newsData: newsDataReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


