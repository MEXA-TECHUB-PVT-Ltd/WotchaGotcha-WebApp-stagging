import React, { useCallback, useMemo, useState } from "react";
import { IoSend, IoClose } from "react-icons/io5";

import {
  FaRegHeart,
  FaRegMessage,
  FaCopy,
  FaHeart,
  FaDownload,
} from "react-icons/fa6";
import ProfileCard from "../card/ProfileCard";
import { useSelector } from "react-redux";
import AppInput from "../form/AppInput";
import Previewer from "../modal/Previewer";

const VideoPlayer = ({
  video,
  isOpen,
  onClose,
  likes = 0,
  comments = [],
  commentText,
  setCommentText,
  totalComments = 0,
  OnLike,
  OnCopy,
  isLoading,
  isLiked,
  onComment,
  description,
  userImage,
  userName,
  title,
}) => {
  const { textColor } = useSelector((state) => state.theme);
  const [seeMore, setSeeMore] = useState(false);

  const handleLike = useCallback(
    () => !isLoading && OnLike(),
    [OnLike, isLoading]
  );
  const handleCopy = useCallback(
    () => !isLoading && OnCopy(),
    [OnCopy, isLoading]
  );

  const profileTitle = useMemo(
    () => <ProfileCard image={userImage} title={userName} />,
    [userImage, userName]
  );

  return (
    <>
      <Previewer isOpen={isOpen} onClose={onClose}>
        <div className="viewer-container relative">
          <IoClose
            className="h-7 w-7 cursor-pointer hover:text-red-500 absolute top-5 right-3 bg-white dark:bg-dark_bg_4 rounded-full p-1 md:bg-transparent md:p-0"
            onClick={onClose}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 pr-3">
            {/* Image Section */}
            <div className="flex-1">
              <div className="player">
                <video src={video} controls className="w-full h-full" />
              </div>

              <div className="flex justify-between items-center pl-3">
                <div className={`flex flex-col gap-1 flex-1`}>
                  <div
                    className={`font-bold text-lg ${title ? "mt-1" : "mt-6"}`}
                  >
                    {title}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {description?.length > 80 ? (
                      <>
                        {seeMore
                          ? description
                          : `${description.slice(0, 80)}... `}
                        <span
                          className={`${textColor} cursor-pointer font-medium ml-1`}
                          onClick={() => setSeeMore(!seeMore)}
                        >
                          {seeMore ? "See less" : "See more"}
                        </span>
                      </>
                    ) : (
                      description
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-200 my-2"></div>
              <div className="action-buttons-container pl-3">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    className="action-button"
                    aria-label="Like"
                  >
                    {isLiked ? (
                      <FaHeart className="w-5 h-5 text-red-500" />
                    ) : (
                      <FaRegHeart className="w-5 h-5" />
                    )}
                    <span className="hidden md:block text-sm">Like</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className={`action-button hover:${textColor}`}
                    aria-label="Copy Link"
                  >
                    <FaCopy className="w-5 h-5" />
                    <span className="hidden md:block text-sm">Copy Link</span>
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 action-button">
                    <FaRegHeart className={`w-4 h-4 text-red-500`} />
                    {likes}
                  </div>
                  <div className="flex items-center gap-1 action-button">
                    <FaRegMessage className={`w-4 h-4 ${textColor}`} />
                    {totalComments}
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="flex flex-col p-3 space-y-3 h-full w-full">
              {userName && userImage ? (
                profileTitle
              ) : (
                <span className="text-gray-700 font-bold my-2">Top Video</span>
              )}
              <div className="w-full h-[1px] bg-gray-200 my-2"></div>

              <div className="flex flex-col justify-between flex-1">
                <div className="flex flex-col gap-3 flex-grow overflow-y-auto max-h-[60vh] h-[74vh] md:max-h-[74vh]">
                  <div className="font-bold text-lg">Comments</div>
                  {comments.length > 0 ? (
                    comments.map((comment, index) => (
                      <ProfileCard
                        key={index}
                        image={comment?.userimage}
                        title={comment?.username}
                        subTitle={comment?.comment}
                      />
                    ))
                  ) : (
                    <p className="flex justify-center text-gray-400">
                      No Comments Found
                    </p>
                  )}
                </div>

                <div className="mt-3 w-full">
                  <AppInput
                    placeholder="Write a comment..."
                    rounded="rounded-full"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    icon={IoSend}
                    onIconClick={onComment}
                    onEnterPress={onComment}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Previewer>
    </>
  );
};

export default VideoPlayer;
