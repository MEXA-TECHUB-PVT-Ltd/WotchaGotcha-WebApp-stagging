import React from "react";
import { useSelector } from "react-redux";

const ProfileCard = ({ title, subTitle, image }) => {
  const { borderColor } = useSelector((state) => state.theme);

  return (
    <div className="flex items-start gap-4">
      <div>
        {image ? (
          <img
            className={`p-card-avatar ${borderColor} object-cover`}
            src={image}
            alt="User Avatar"
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

        <div className="md:text-base text-sm text-gray-600 dark:text-gray-400 break-words whitespace-pre-line">
          {subTitle}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
