import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "../slice/error/errorSlice";
import authReducer from "../slice/auth/authSlice";
import dataReducer from "../slice/data/dataSlice";

export const store = configureStore({
  reducer: {
    error: errorReducer,
    auth: authReducer,
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


