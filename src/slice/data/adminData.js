import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
    data: [],
    showData: false,
    dataLoading: false,
    dataLoaded: false,
  };

  export const adminSlice = createSlice({
      name:"admin",
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
      }
  });
  export const { isLoading, isLoaded } = adminSlice.actions;

  export const adminState = (state) => state.admin;
  
  export default adminSlice.reducer;
  