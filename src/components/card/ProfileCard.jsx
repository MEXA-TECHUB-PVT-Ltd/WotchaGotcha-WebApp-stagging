import React from "react";
import { useSelector } from "react-redux";

const ProfileCard = ({
  title,
  subTitle,
  image,
  subTitleSize = "text-base",
}) => {
  const { borderColor } = useSelector((state) => state.theme);

  return (
    <div className={`flex  ${subTitle ? "items-start" : "items-center"} gap-4`}>
      <div>
        {image ? (
          <img
            style={{ imageRendering: "-webkit-optimize-contrast" }}
            className={`p-card-avatar ${borderColor} object-cover`}
            src={image}
            alt="Avatar"
          />
        ) : title ? (
          <div className={`p-card-avatar ${borderColor} text-gray-500`}>
            {title?.charAt(0).toUpperCase()}
          </div>
        ) : null}
      </div>

      <div className="flex-1 min-w-0">
        <div className="md:text-base text-sm font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </div>

        <div
          className={`md:${subTitleSize} text-sm text-gray-600 dark:text-gray-400 break-words whitespace-pre-line`}
        >
          {subTitle}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
