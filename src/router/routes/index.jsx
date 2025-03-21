import Cinematic from "../../views/Cinematic";
import FanStarZone from "../../views/FanStarZone";
import Home from "../../views/Home";
import KidVids from "../../views/KidVids";
import MondoMarket from "../../views/MondoMarket";
import PicTours from "../../views/PicTours";
import VideoMania from "../../views/VideoMania";
import TvProgMax from "../../views/TvProgMax";
import LearningAndHobbies from "../../views/LearningAndHobbies";
import SportsAndSports from "../../views/SportsAndSports";
import OnNews from "../../views/OnNews";
import Qafi from "../../views/Qafi";
import Ebic from "../../views/Ebic";
export default [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/video-mania",
    element: <VideoMania />,
  },
  {
    path: "/pic-tours",
    element: <PicTours />,
  },
  {
    path: "/mondo-market",
    element: <MondoMarket />,
  },
  {
    path: "/cinematic",
    element: <Cinematic />,
  },
  {
    path: "/fan-star-zone",
    element: <FanStarZone />,
  },
  {
    path: "/kid-vids",
    element: <KidVids />,
  },
  {
    path: "/tv-progmax",
    element: <TvProgMax />,
  },
  {
    path: "/learning-and-hobbies",
    element: <LearningAndHobbies />,
  },
  {
    path: "/sports-&-sports",
    element: <SportsAndSports />,
  },
  {
    path: "/on-news",
    element: <OnNews />,
  },
  {
    path: "/qafi",
    element: <Qafi />,
  },
  {
    path: "/ebic",
    element: <Ebic />,
  },
];
