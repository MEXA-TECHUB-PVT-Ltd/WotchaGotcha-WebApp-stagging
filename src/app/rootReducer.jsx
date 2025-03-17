import { combineReducers } from "@reduxjs/toolkit";
import themeSlice from "./features/theme";
import authSlice from "./features/auth";
import userSlice from "./features/user";
import VideoMania from "./features/videomania";
import picTourSlice from "./features/pictours";
import mondoMarketSlice from "./features/mondomarket";
import cinematicSlice from "./features/cinematic";
import fanStarZoneSlice from "./features/fanstarzone";
import kidVidsSlice from "./features/kidvids";

const rootReducer = combineReducers({
  theme: themeSlice,
  auth: authSlice,
  user: userSlice,
  video_mania: VideoMania,
  pictours: picTourSlice,
  mondomarket: mondoMarketSlice,
  cinematics: cinematicSlice,
  fanstarzone: fanStarZoneSlice,
  kidvids: kidVidsSlice,
});

export default rootReducer;
