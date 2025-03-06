import React from "react";
import { nameElipse } from "../../utils/common/nameElipse";

const ThumbnailCard = ({ id, image, title, onClick }) => {
  return (
    <div key={id} className="thumbnail-container" onClick={onClick}>
      <img src={image} alt={"img"} className="video-thumbnail" />

      <p>{nameElipse(title, 10)}</p>
    </div>
  );
};

export default ThumbnailCard;
