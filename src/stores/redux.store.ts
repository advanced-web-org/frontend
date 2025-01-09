import { configureStore } from "@reduxjs/toolkit";
import {otpReducer} from "../slice/otp.slice"; // Path to the slice file

// Configure the Redux store
const store = configureStore({
  reducer: {
    otp: otpReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;