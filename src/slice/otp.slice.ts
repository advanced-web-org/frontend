import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  otpToken: null,
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setOtpToken: (state, action) => {
      console.log("setOtpToken kiet", action.payload);
      state.otpToken = action.payload;
    },
  },
});

export const { setOtpToken } = otpSlice.actions;
export const selectOtpToken = (state: { otp: { otpToken: any; }; }) => state.otp.otpToken; // Selector for otpToken
export const otpReducer = otpSlice.reducer;
