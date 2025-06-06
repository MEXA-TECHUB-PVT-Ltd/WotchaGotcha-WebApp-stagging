import {
  FaTv,
  FaUsers,
  FaBook,
  FaGamepad,
  FaNewspaper,
  FaEnvelopeOpen,
} from "react-icons/fa";
import {
  FaChildren,
  FaFaceSmile,
  FaFileContract,
  FaQ,
  FaQuestion,
} from "react-icons/fa6";
import { FiShield } from "react-icons/fi";
import {
  MdDashboard,
  MdImage,
  MdMovie,
  MdStorefront,
  MdVideoCall,
} from "react-icons/md";
import { RiLiveLine } from "react-icons/ri";
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
  {
    id: "tvprogmax",
    title: "TV Progmax",
    path: "/tv-progmax",
    icon: <FaTv size={22} />,
  },
  {
    id: "learningandhobbies",
    title: "Learning and Hobbies",
    path: "/learning-and-hobbies",
    icon: <FaBook size={22} />,
  },
  {
    id: "sportsandsports",
    title: "Sports & Sports",
    path: "/sports-&-sports",
    icon: <FaGamepad size={22} />,
  },
  {
    id: "onnews",
    title: "On News",
    path: "/on-news",
    icon: <FaNewspaper size={22} />,
  },
  {
    id: "qafi",
    title: "QAFI",
    path: "/qafi",
    icon: <FaQ size={22} />,
  },
  {
    id: "ebic",
    title: "EBIC",
    path: "/ebic",
    icon: <FaFaceSmile size={22} />,
  },
  {
    id: "openletters",
    title: "Open Letters",
    path: "/open-letters",
    icon: <FaEnvelopeOpen size={22} />,
  },
  {
    id: "about",
    title: "About Us",
    path: "/about-us",
    icon: <FaQuestion size={22} />,
  },
  {
    id: "terms",
    title: "Terms & Conditions",
    path: "/terms-and-conditions",
    icon: <FaFileContract size={22} />,
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    path: "/privacy-policy",
    icon: <FiShield size={22} />,
  },
  {
    id: "Live Streaming",
    title: " Live Streaming",
    path: "/live-streaming",
    icon: <RiLiveLine size={22} />,
  },
];
