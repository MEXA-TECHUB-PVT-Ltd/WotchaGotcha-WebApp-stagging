import React from "react";
import { nameElipse } from "../../utils/common/nameElipse";

const ThumbnailCard = ({ image, title, onClick }) => {
  return (
    <div className="thumbnail-container" onClick={onClick}>
      <img
        style={{ imageRendering: "-webkit-optimize-contrast" }}
        src={image}
        alt={"thumbnail"}
        className="video-thumbnail"
      />

      <p>{nameElipse(title, 10)}</p>
    </div>
  );
};

export default ThumbnailCard;
