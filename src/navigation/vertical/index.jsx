import { FaUsers } from "react-icons/fa";
import { FaChildren } from "react-icons/fa6";
import {
  MdDashboard,
  MdImage,
  MdMovie,
  MdStorefront,
  MdVideoCall,
} from "react-icons/md";

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
  {
    id: "mondo-market",
    title: "Mondo Market",
    path: "/mondo-market",
    icon: <MdStorefront size={22} />,
  },
  {
    id: "cinematic",
    title: "Cinematic",
    path: "/cinematic",
    icon: <MdMovie size={22} />,
  },
  {
    id: "fanstarzone",
    title: "Fan Star Zone",
    path: "/fan-star-zone",
    icon: <FaUsers size={22} />,
  },
  {
    id: "kidvids",
    title: "Kid-Vids",
    path: "/kid-vids",
    icon: <FaChildren size={22} />,
  },
];
