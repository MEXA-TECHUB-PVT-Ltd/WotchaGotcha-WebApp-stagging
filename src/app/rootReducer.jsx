import { combineReducers } from "@reduxjs/toolkit";
import themeSlice from "./features/theme";
import authSlice from "./features/auth";

const rootReducer = combineReducers({
  theme: themeSlice,
  auth: authSlice,
});

export default rootReducer;
