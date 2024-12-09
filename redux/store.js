import { configureStore } from "@reduxjs/toolkit";
import navReducer from "../utils/navSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
  },
});
