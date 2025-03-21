import React from "react";
import { nameElipse } from "../../utils/common/nameElipse";

const EmojiCard = ({ image, title, onClick }) => {
  return (
    <div className="emoji-container" onClick={onClick}>
      <div className="video-thumbnail flex justify-center items-center">
        <span className="text-5xl cursor-pointer">{image}</span>
      </div>

      <p>{nameElipse(title, 10)}</p>
    </div>
  );
};

export default EmojiCard;
