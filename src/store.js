import { configureStore } from "@reduxjs/toolkit";
import { srcompReducer } from "./srcomp";

export const store = configureStore({
  reducer: {
    srcomp: srcompReducer,
  },
});
