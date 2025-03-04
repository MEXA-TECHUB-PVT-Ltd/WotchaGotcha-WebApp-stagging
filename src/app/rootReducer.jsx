import { combineReducers } from "@reduxjs/toolkit";
import themeSlice from "./features/theme";
import authSlice from "./features/auth";
import userSlice from "./features/user";
import VideoMania from "./features/videomania";

const rootReducer = combineReducers({
  theme: themeSlice,
  auth: authSlice,
  user: userSlice,
  video_mania: VideoMania,
});

export default rootReducer;
