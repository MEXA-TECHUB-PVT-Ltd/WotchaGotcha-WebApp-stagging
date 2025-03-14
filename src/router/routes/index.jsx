import Cinematic from "../../views/Cinematic";
import Home from "../../views/Home";
import MondoMarket from "../../views/MondoMarket";
import PicTours from "../../views/PicTours";
import VideoMania from "../../views/VideoMania";

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
];
