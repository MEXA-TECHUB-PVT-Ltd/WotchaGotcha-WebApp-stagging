import React from "react";
import { nameElipse } from "../../utils/common/nameElipse";
import { FaEdit, FaPlayCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const ThumbnailCard = ({
  image,
  title,
  onClick,
  for_modify = false,
  onEdit,
  onDelete,
}) => {
  const { textColor } = useSelector((state) => state.theme);

  return (
    <div className="thumbnail-container relative" onClick={onClick}>
      {for_modify && (
        <div
          className="absolute top-0 right-1 flex gap-2 z-10"
          onClick={(e) => e.stopPropagation()} // Prevent click bubbling to main card
        >
          <FaEdit onClick={onEdit} size={25} className={textColor} />
          <MdDelete onClick={onDelete} size={25} className="text-red-600" />
        </div>
      )}
      {image ? (
        <img
          style={{ imageRendering: "-webkit-optimize-contrast" }}
          src={image}
          alt={"thumbnail"}
          className="video-thumbnail"
        />
      ) : (
        <div className="top-video-card">
          <FaPlayCircle className={`w-32 h-32  ${textColor}`} />
        </div>
      )}

      <p>{nameElipse(title, 10)}</p>
    </div>
  );
};

export default ThumbnailCard;
