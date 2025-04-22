import React, { Fragment } from "react";

import VideoMania from "./VideoMania";
import PicTours from "./PicTours";
import MondoMarket from "./MondoMarket";
import Cinematic from "./Cinematic";
import FanStarZone from "./FanStarZone";
import TvProgMax from "./TvProgMax";
import KidVids from "./KidVids";
import LearningAndHobbies from "./LearningAndHobbies";
import SportsAndSports from "./SportsAndSports";
import OnNews from "./OnNews";
import Qafi from "./Qafi";
import OpenLetters from "./OpenLetters";
import Ebic from "./Ebic";

const Home = () => {
  return (
    <div className="my-5 overflow-x-hidden">
      <VideoMania isDashbaord={true} />
      <PicTours isDashboard={true} />
      <MondoMarket isDashboard={true} />
      <Cinematic isDashbaord={true} />
      <FanStarZone isDashboard={true} />
      <TvProgMax isDashboard={true} />
      <KidVids isDashboard={true} />
      <LearningAndHobbies isDashboard={true} />
      <SportsAndSports isDashboard={true} />
      <OnNews isDashboard={true} />
      <Qafi isDashboard={true} />
      <Ebic isDashboard={true} />
      <OpenLetters isDashboard={true} />
    </div>
  );
};

export default Home;
