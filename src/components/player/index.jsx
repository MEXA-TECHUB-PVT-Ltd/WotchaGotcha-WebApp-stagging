import React, { useEffect, useState } from "react";
import { IoHeart, IoChatbubbleEllipses, IoSend } from "react-icons/io5";
import Modal from "../modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentOnVideo,
  getVideoAllComments,
  getVideoAllLikes,
  likeUnlikeVideo,
} from "../../app/features/videomania";
import AppInput from "../form/AppInput";
import ProfileCard from "../card/ProfileCard";

const Player = ({ video, isOpen, onClose, isTop = false }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.video_mania);

  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleComment = async () => {
    if (!commentText.trim()) return;

    const previousComments = [...comments];

    try {
      const payload = {
        user_id: user?.id,
        video_id: video?.video_id,
        comment: commentText,
      };

      setComments((prev) => [...prev, commentText]);

      const { statusCode } = await dispatch(
        addCommentOnVideo({ payload, token })
      ).unwrap();

      if (statusCode === 201) {
        setCommentText("");
        await getAllComments();
      } else {
        setComments(previousComments);
      }
    } catch (error) {
      setComments(previousComments);
      console.log(error);
    }
  };

  const handleLike = async () => {
    if (!video?.video_id) return;

    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      const payload = {
        user_id: user?.id,
        video_id: video?.video_id,
      };

      const { statusCode } = await dispatch(
        likeUnlikeVideo({ payload, token })
      ).unwrap();

      if (statusCode === 201) {
        await getAllLikes();
      }
    } catch (error) {
      console.log(error);
      setIsLiked((prev) => !prev);
      setLikes((prev) => (isLiked ? prev + 1 : prev - 1));
    }
  };

  const getAllLikes = async () => {
    if (!video?.video_id) return;

    try {
      const data = await dispatch(
        getVideoAllLikes({ token, id: video.video_id })
      ).unwrap();

      setLikes(data?.totalLikes || 0);

      const userHasLiked =
        Array.isArray(data?.AllLikes) &&
        data.AllLikes.some((like) => like.user_id === user?.id);

      setIsLiked(userHasLiked);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  const getAllComments = async () => {
    if (!video?.video_id) return;

    try {
      const data = await dispatch(
        getVideoAllComments({ token, id: video.video_id })
      ).unwrap();

      setTotalComments(data?.totalComments || 0);

      setComments(data?.AllComents);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (!isTop) {
      getAllLikes();
      getAllComments();
    }
  }, [video?.video_id]);

  return (
    <>
      <Modal
        title={
          <ProfileCard
            image={video?.userimage || video?.user_image}
            title={video?.username}
          />
        }
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
      >
        {/* Video Player */}
        <div className="player">
          <video src={video?.video} controls className="w-full h-full" />
        </div>

        {/* Action Buttons */}
        {!isTop && (
          <div className="action-buttons-container">
            <button
              onClick={handleLike}
              className="action-button"
              disabled={isLoading}
            >
              <IoHeart className={`w-6 h-6 ${isLiked ? "text-red-500" : ""}`} />{" "}
              {likes}
            </button>

            <button
              className="action-button"
              onClick={() => setIsModalOpen(true)}
            >
              <IoChatbubbleEllipses className="w-6 h-6" /> Comment
            </button>
            {totalComments > 0 && (
              <button className="action-button">
                {totalComments === 1
                  ? `${totalComments} comment`
                  : `${totalComments} comments`}
              </button>
            )}
          </div>
        )}
      </Modal>

      <Modal
        title="Comments"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col max-h-[70vh] flex-1 overflow-y-auto overflow-x-hidden space-y-3 p-3">
          {comments?.length > 0 ? (
            comments?.map((comment, index) => (
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

        <div>
          <AppInput
            placeholder="comment here..."
            rounded="rounded-full"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            icon={IoSend}
            onIconClick={handleComment}
            onEnterPress={handleComment}
          />
        </div>
      </Modal>
    </>
  );
};

export default Player;
