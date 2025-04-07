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
import tvProgmaxSlice from "./features/tvprogmax";
import learningAndHobbiesSlice from "./features/learningandhobbies";
import sportsAndSportsSlice from "./features/sportsandsports";
import onNewsSlice from "./features/onnews";
import qafiSlice from "./features/qafi";
import ebicSlice from "./features/ebic";
import openLetterSlice from "./features/openletters";
import profileSlice from "./features/profile";

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
  tvProgmax: tvProgmaxSlice,
  learningandhobbies: learningAndHobbiesSlice,
  sportsandsports: sportsAndSportsSlice,
  onnews: onNewsSlice,
  qafi: qafiSlice,
  ebic: ebicSlice,
  openletter: openLetterSlice,
  profile: profileSlice,
});

export default rootReducer;
