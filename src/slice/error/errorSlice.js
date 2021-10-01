import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showMsg: false,
    msg: ""
}

export const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        showMessage: (state, action) => {
            state.msg = action.payload;
            state.showMsg = true;
        },
        hideMessage: (state) => {
            state.msg = "";
            state.showMsg = false;
        }
    }
})

export const { showMessage, hideMessage } = errorSlice.actions;

export const errorState = (state) => state.error;

export default errorSlice.reducer;
