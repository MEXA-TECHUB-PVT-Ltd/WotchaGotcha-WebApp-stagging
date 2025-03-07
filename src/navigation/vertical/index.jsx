import { MdDashboard, MdImage, MdVideoCall } from "react-icons/md";

export default [
  {
    id: "home",
    title: "Dashboard",
    path: "/",
    icon: <MdDashboard size={22} />,
  },
  {
    id: "video-mania",
    title: "Video Mania",
    path: "/video-mania",
    icon: <MdVideoCall size={22} />,
  },
  {
    id: "pic-tours",
    title: "Pic Tours",
    path: "/pic-tours",
    icon: <MdImage size={22} />,
  },
];
