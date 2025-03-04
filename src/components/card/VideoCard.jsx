import React from "react";
import { nameElipse } from "../../utils/common/nameElipse";

const VideoCard = ({ video }) => {
  return (
    <div key={video?.video_id} className="thumbnail-container">
      <img src={video?.thumbnail} alt={video?.name} className="video-thumbnail" />

      <p>{nameElipse(video?.description, 10)}</p>
    </div>
  );
};

export default VideoCard;
