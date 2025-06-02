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
import { Toast } from "../theme/Toast";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const ImagePreviewer = ({
  image,
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
  isEmoji = false,
  title,
}) => {
  console.log("Comments", comments);

  const { textColor } = useSelector((state) => state.theme);
  const [seeMore, setSeeMore] = useState(false);
  const { t, i18n } = useTranslation();
  const handleLike = useCallback(
    () => !isLoading && OnLike(),
    [OnLike, isLoading]
  );
  const handleCopy = useCallback(
    () => !isLoading && OnCopy(),
    [OnCopy, isLoading]
  );

  async function handleDownload() {
    try {
      if (!image || typeof image !== "string" || !image.includes("/upload/")) {
        throw new Error("Invalid image");
      }

      let url = image.replace("http://", "https://");

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "";
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed. Please try again.");
    }
  }

  const profileTitle = useMemo(
    () => <ProfileCard image={userImage} title={userName} />,
    [userImage, userName]
  );

  return (
    <>
      <Previewer isOpen={isOpen} onClose={onClose} size="lg">
        <div className="viewer-container relative">
          <IoClose
            className="h-7 w-7 cursor-pointer hover:text-red-500 absolute top-5 right-3 bg-white dark:bg-dark_bg_4 rounded-full p-1 md:bg-transparent md:p-0 z-50"
            onClick={onClose}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 px-3">
            {/* Image Section */}
            <div className="flex-1">
              {isEmoji ? (
                <div className="flex justify-center items-center h-[80vh] w-full cursor-pointer">
                  <span className="text-9xl">{image}</span>
                </div>
              ) : (
                <img
                  src={image}
                  className="h-[82vh] w-full object-contain"
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                  alt="Preview"
                />
              )}
              <div className="flex justify-between items-center">
                <div className={`flex flex-col gap-1 flex-1`}>
                  <div
                    className={`font-bold text-lg ${title ? "mt-1" : "mt-6"}`}
                  >
                    {title}
                  </div>
                  <div className="text-gray-500 text-sm break-words whitespace-pre-line max-w-[90vw]">
                    {description?.length > 80 ? (
                      <>
                        {seeMore
                          ? description
                          : `${description.slice(0, 80)}... `}
                        <span
                          className={`${textColor} cursor-pointer font-medium ml-1`}
                          onClick={() => setSeeMore(!seeMore)}
                        >
                          {seeMore ? t("see-less") : t("see-more")}
                        </span>
                      </>
                    ) : (
                      description
                    )}
                  </div>
                </div>
                {!isEmoji && (
                  <FaDownload
                    className="w-5 h-5 cursor-pointer text-gray-700 hover:text-blue-500"
                    onClick={handleDownload}
                  />
                )}
              </div>
              <div className="w-full h-[1px] bg-gray-200 my-2"></div>
              <div className="action-buttons-container">
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
                    <span className="hidden md:block text-sm">{t("like")}</span>
                  </button>

                  {!isEmoji && (
                    <button
                      onClick={handleCopy}
                      className={`action-button hover:${textColor}`}
                      aria-label="Copy Link"
                    >
                      <FaCopy className="w-5 h-5" />
                      <span className="hidden md:block text-sm">
                        {t("copy-link")}
                      </span>
                    </button>
                  )}
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
              {userName || userImage ? (
                profileTitle
              ) : (
                <span className="text-gray-700 font-bold my-2">
                  {t("top-image")}
                </span>
              )}
              <div className="w-full h-[1px] bg-gray-200 my-2"></div>

              <div className="flex flex-col justify-between flex-1">
                <div className="flex flex-col gap-3 flex-grow overflow-y-auto max-h-[60vh] h-[74vh] md:max-h-[74vh]">
                  <div className="font-bold text-lg">{t("comments")}</div>
                  {comments.length > 0 ? (
                    comments.map((comment, index) => (
                      <ProfileCard
                        key={index}
                        image={comment?.userimage || comment?.user_image}
                        title={comment?.username}
                        subTitle={comment?.comment}
                      />
                    ))
                  ) : (
                    <p className="flex justify-center text-gray-400">
                      {t("no-comments-found")}
                    </p>
                  )}
                </div>

                <div className="mt-3 w-full">
                  <AppInput
                    placeholder={t("write-a-comment")}
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

export default ImagePreviewer;
