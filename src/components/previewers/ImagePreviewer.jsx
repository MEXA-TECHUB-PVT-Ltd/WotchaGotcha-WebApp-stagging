import React, { useCallback, useMemo, useState } from "react";
import { IoHeart, IoChatbubbleEllipses, IoSend } from "react-icons/io5";
import { FaCopy } from "react-icons/fa";
import ProfileCard from "../card/ProfileCard";
import Modal from "../modal/Modal";
import { useSelector } from "react-redux";
import AppInput from "../form/AppInput";

const ImagePreviewer = ({
  image,
  isOpen,
  onClose,
  isTop = false,
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
}) => {
  const { textColor } = useSelector((state) => state.theme);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = useCallback(
    () => !isLoading && OnLike(),
    [OnLike, isLoading]
  );
  const handleCopy = useCallback(
    () => !isLoading && OnCopy(),
    [OnCopy, isLoading]
  );
  const openCommentsModal = useCallback(
    () => setIsModalOpen(true),
    [setIsModalOpen]
  );

  const profileTitle = useMemo(
    () => <ProfileCard image={userImage} title={userName} />,
    [userImage, userName]
  );

  return (
    <>
      <Modal title={profileTitle} isOpen={isOpen} onClose={onClose} size="lg">
        <div className="previewer">
          <div className="flex flex-col absolute inset-0 md:flex-row">
            {/* Image Section */}
            <div className="flex-1">
              <img
                src={image}
                className="h-full w-full object-contain"
                style={{ imageRendering: "-webkit-optimize-contrast" }}
                alt="Preview"
              />
            </div>

            {/* Description Section */}
            <div className="bg-white p-4 w-full dark:bg-dark_bg_2 md:w-1/3 overflow-y-auto">
              <p className="text-gray-700 dark:text-dark_text_1">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {!isTop && (
          <div className="action-buttons-container mt-3">
            <button
              onClick={handleLike}
              className="action-button"
              aria-label="Like"
            >
              <IoHeart className={`w-6 h-6 ${isLiked ? "text-red-500" : ""}`} />
              {likes}
            </button>

            <button
              onClick={openCommentsModal}
              className="action-button"
              aria-label="Comment"
            >
              <IoChatbubbleEllipses className="h-6 w-6" /> Comment
            </button>

            {totalComments > 0 && (
              <span className="action-button">
                {totalComments} {totalComments === 1 ? "comment" : "comments"}
              </span>
            )}

            <button
              onClick={handleCopy}
              className={`action-button hover:${textColor}`}
              aria-label="Copy Link"
            >
              <FaCopy className="h-6 w-6" /> Copy Link
            </button>
          </div>
        )}
      </Modal>

      {/* Comments Modal */}
      <Modal
        title="Comments"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex flex-1 flex-col p-3 max-h-[70vh] overflow-y-auto space-y-3">
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

        {/* Comment Input */}
        <div>
          <AppInput
            placeholder="Write a comment..."
            rounded="rounded-full"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            icon={IoSend}
            onIconClick={onComment}
            onEnterPress={onComment}
          />
        </div>
      </Modal>
    </>
  );
};

export default ImagePreviewer;
