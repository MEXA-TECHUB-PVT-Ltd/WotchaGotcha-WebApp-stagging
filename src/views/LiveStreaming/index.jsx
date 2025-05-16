import React, { useState } from "react";
import { MdCallEnd } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import io from "socket.io-client";
import { useTranslation } from "react-i18next";
const APP_ID = "54420f0ddc634ba9a2197db415385753";
const SERVER_URL = "http://192.168.18.26:5000";
const socket = io("http://localhost:5000");
function LiveStreaming() {
  // const { t, i18n } = useTranslation();
  const [comment, setComment] = useState("");
  const [viewerCount, setViewerCount] = useState(0);
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "John Doe",
      avatar: "https://i.pravatar.cc/40?img=1",
      text: "Awesome stream!",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/40?img=2",
      text: "Hello everyone 👋",
    },
  ]);

  const participants = [
    { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/40?img=3" },
    { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/40?img=4" },
    { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/40?img=5" },
  ];

  const host = {
    name: "Host User",
    avatar: "https://i.pravatar.cc/40?img=7",
  };

  const handleSendComment = () => {
    if (comment.trim() === "") return;
    const newComment = {
      id: Date.now(),
      name: "You",
      avatar: "https://i.pravatar.cc/40?img=6",
      text: comment,
    };
    setComments([newComment, ...comments]);
    setComment("");
  };
  // useEffect(() => {
  //   joinSocket();
  //   const stream_id = channelData?.streamDetails?.id;
  //   if (!stream_id) return;

  //   const handleNewComment = (comment) => {
  //     console.log("New comment received:", comment);

  //     setComments((prev) => [...prev, comment]);
  //   };

  //   const handleUserJoined = (data) => {
  //     console.log("User joined>>>>:", data);
  //     if (Array.isArray(data.stream_participants)) {
  //       setViewerCount(data.stream_participants.length);
  //     }
  //   };

  //   socket.on("get_new_comment", handleNewComment);
  //   socket.on("user_joined", handleUserJoined);

  //   socket.on("remaining_quantity", (data) => {
  //     console.log("DATa>L>>>>>>>>", data);
  //   });

  //   return () => {
  //     socket.off("get_new_comment", handleNewComment);
  //     socket.off("user_joined", handleUserJoined);
  //   };
  // }, [channelData?.channelname]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="max-w-7xl mx-auto boder border-gray-400 border-1 px-4">
      <div className="bg-white ">
        <h1 className="text-2xl font-semibold mb-1">Web Programming</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left side: Video and Host */}
          <div className="w-8/12 relative flex flex-col gap-4">
            {/* Host Info */}
            <div className="flex items-center gap-3">
              <img
                src={host.avatar}
                alt={host.name}
                className="w-10 h-10 rounded-full"
              />
              <span className="font-semibold">{host.name}</span>
            </div>

            {/* Video (Image placeholder) */}
            <div className="relative">
              {/* LIVE + Participants */}

              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <div className="bg-white text-black px-3 py-1 rounded font-bold text-sm shadow">
                  👥 {participants.length}
                </div>
                <div className="bg-red-600 text-white w-20 flex items-center justify-center gap-2 py-1 rounded font-bold text-sm shadow">
                  <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
                  LIVE
                </div>
              </div>
              <div className="absolute bottom-4 right-[50%] flex items-center gap-2 z-10">
                <div className="bg-red-600 text-white  flex items-center justify-center gap-2 p-2 rounded font-bold text-sm shadow">
                  <MdCallEnd className="text-white" size={28} />
                </div>
              </div>
              <img
                src="/jesus-loves-austin-0O0gux4OZX4-unsplash.jpg"
                alt="Live Stream"
                className="w-full h-[420px] object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Right side: Comments */}
          <div className="w-4/12 flex flex-col gap-4">
            <div className="bg-gray-100 p-4 relative rounded-xl h-[470px] w-80 flex flex-col">
              <h2 className="text-lg font-medium mb-2">Comments</h2>

              <ul className="flex-1 overflow-y-auto space-y-4 max-h-64 mb-4 pr-2">
                {comments.map((c) => (
                  <li key={c.id} className="flex items-start gap-3">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-sm">{c.name}</p>
                      <p className="text-sm text-gray-700">{c.text}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex items-center absolute bottom-3 gap-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-3 py-2 rounded border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendComment}
                  className="bg-[#eab308] text-white px-4 py-2 rounded flex gap-2 text-sm hover:bg-blue-700 transition"
                >
                  Send
                  <IoSend size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveStreaming;
