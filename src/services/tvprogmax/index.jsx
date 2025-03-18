import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import ProfileCard from "../../components/card/ProfileCard";
import Modal from "../../components/modal/Modal";
import { IoChatbubbleEllipses, IoHeart, IoSend } from "react-icons/io5";
import AppInput from "../../components/form/AppInput";
import { uploadImage, uploadVideo } from "../../utils/common/cloudinary";
import Form from "../../components/form/Form";
import ErrorMessage from "../../components/form/ErrorMessage";
import Button from "../../components/form/Button";
import AppSelect from "../../components/form/AppSelect";
import AppTextArea from "../../components/form/AppTextArea";
import { FaCopy, FaUpload } from "react-icons/fa";
import videoIcon from "../../assets/videoIcon.svg";
import { Spinner } from "../../components/theme/Loader";
import { Toast } from "../../components/theme/Toast";

import {
  addCommentOnTvProgmax,
  addTvProgmax,
  getTvProgmaxComments,
  getTvProgmaxLikes,
  getTvProgmaxSubCategoriesByCategory,
  likeUnlikeTvProgmax,
} from "../../app/features/tvprogmax";
import { copyLink } from "../../utils/copyLink";

export const AddTvProgmax = ({
  setAddModal,
  dispatch,
  setReload,
  categoryId,
}) => {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { textColor, borderColor, bgColor } = useSelector(
    (state) => state.theme
  );

  const videoRef = useRef(null);
  const thumbnailRef = useRef(null);

  const [subCategory, setSubCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTvProgmax = async (data, { resetForm }) => {
    setIsLoading(true);
    try {
      const video = await uploadVideo(data.video);
      if (!video) throw new Error("Failed to upload video.");

      const thumbnail = await uploadImage(data.thumbnail);
      if (!thumbnail) throw new Error("Failed to upload thumbnail.");

      const payload = { ...data, video, thumbnail };
      const { statusCode } = await dispatch(
        addTvProgmax({ token, payload })
      ).unwrap();

      if (statusCode === 201) {
        Toast("success", "Video uploaded successfully");
        setReload((prev) => !prev);
        setAddModal(false);
        resetForm();
      }
    } catch (error) {
      console.error("Upload Error:", error);
      Toast("error", error?.message || "Error uploading video");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (categoryId) {
        const { AllCategories } = await dispatch(
          getTvProgmaxSubCategoriesByCategory({ token, id: categoryId })
        ).unwrap();

        setSubCategory(AllCategories);
      }
    };

    fetchSubCategories();
  }, []);

  return (
    <>
      <Form
        initialValues={{
          name: "",
          description: "",
          category_id: categoryId,
          sub_category_id: "",
          video: "",
          thumbnail: "",
          user_id: user?.id,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Name is required"),
          description: Yup.string().required("Description is required"),
          sub_category_id: Yup.string().required("Sub Category is required"),
          video: Yup.string().required("Video is required"),
          thumbnail: Yup.string().required("Thumbnail is required"),
        })}
        onSubmit={handleAddTvProgmax}
      >
        {({ handleSubmit, values, handleChange, setFieldValue }) => (
          <div className="flex-col-start gap-5">
            <div className="flex items-center gap-5">
              <div
                className={`capture-container ${borderColor}`}
                onClick={() => videoRef.current.click()}
              >
                <input
                  name="video"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFieldValue("video", file);
                  }}
                  ref={videoRef}
                  type="file"
                  accept="video/*"
                  hidden
                />
                {!values?.video ? (
                  <>
                    <p>Upload Video</p>
                    <FaUpload size={25} className={textColor} />
                  </>
                ) : (
                  <div className="py-2">
                    <p className={`px-2 ${bgColor} rounded-full text-white`}>
                      Change Video
                    </p>
                    <img
                      style={{ imageRendering: "-webkit-optimize-contrast" }}
                      src={videoIcon}
                      alt="Video"
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>

              <div
                className={`capture-container ${borderColor}`}
                onClick={() => thumbnailRef.current.click()}
              >
                <input
                  name="thumbnail"
                  ref={thumbnailRef}
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFieldValue("thumbnail", file);
                  }}
                  accept="image/*"
                  hidden
                />
                {!values?.thumbnail ? (
                  <>
                    <p>Upload Tumbnail</p>
                    <FaUpload size={25} className={textColor} />
                  </>
                ) : (
                  <div className="py-2 relative">
                    <p
                      className={`px-2 ${bgColor} rounded-full text-white absolute top-0 left-1`}
                    >
                      Change Image
                    </p>
                    <img
                      style={{ imageRendering: "-webkit-optimize-contrast" }}
                      src={
                        values.thumbnail instanceof File
                          ? URL.createObjectURL(values?.thumbnail)
                          : values.thumbnail
                      }
                      alt="Thumbnail"
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="input-container">
              <AppInput
                label={"Name"}
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              <ErrorMessage name="name" />
            </div>

            <div className="input-container">
              <AppSelect
                label={"Sub Category"}
                name="sub_category_id"
                value={values.sub_category_id}
                onChange={handleChange}
                options={subCategory}
              />
              <ErrorMessage name="sub_category_id" />
            </div>

            <div className="input-container">
              <AppTextArea
                label={"Description"}
                name="description"
                value={values.description}
                onChange={handleChange}
              />
              <ErrorMessage name="description" />
            </div>

            <div className="btn-container">
              <Button
                title={"Add"}
                width={false}
                onClick={isLoading ? null : handleSubmit}
                spinner={isLoading ? <Spinner size="sm" /> : null}
              />
            </div>
          </div>
        )}
      </Form>
    </>
  );
};

export const TvProgmaxPlayer = ({ video, isOpen, onClose, dispatch }) => {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.tvProgmax);
  const { textColor } = useSelector((state) => state.theme);

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
        addCommentOnTvProgmax({ payload, token })
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
        likeUnlikeTvProgmax({ payload, token })
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
        getTvProgmaxLikes({ token, id: video.video_id })
      ).unwrap();

      setLikes(data?.likes || 0);

      const userHasLiked =
        Array.isArray(data?.allLikes) &&
        data.allLikes.some((like) => like.user_id === user?.id);

      setIsLiked(userHasLiked);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  const getAllComments = async () => {
    if (!video?.video_id) return;

    try {
      const data = await dispatch(
        getTvProgmaxComments({ token, id: video.video_id })
      ).unwrap();

      setTotalComments(data?.totalComments || 0);

      setComments(data?.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    getAllLikes();
    getAllComments();
  }, [video?.video_id]);

  return (
    <>
      <Modal
        title={
          <ProfileCard
            image={video?.user_image || video?.userimage}
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
          <button
            onClick={() => copyLink(video?.video)}
            className={`action-button hover:${textColor}`}
            disabled={isLoading}
          >
            <FaCopy className={`w-6 h-6`} /> Copy Link
          </button>
        </div>
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
                image={comment?.user_image}
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
