import { configureStore } from "@reduxjs/toolkit";
import mainStateReducer from "./mainState";

export const store = configureStore({
  reducer: {
    mainState: mainStateReducer,
  },
});
