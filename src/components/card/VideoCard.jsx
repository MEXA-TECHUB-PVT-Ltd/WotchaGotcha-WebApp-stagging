import React from "react";

const VideoCard = ({ video }) => {
  return (
    <div key={video?.video_id} className="thumbnail-container">
      <img src={video?.thumbnail} alt={video?.name} className="video-thumbnail" />

      <p>
        {video?.description?.length > 10
          ? video?.description?.slice(0, 10) + "..."
          : video?.description}
      </p>
    </div>
  );
};

export default VideoCard;
