import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";

import AppInput from "../../components/form/AppInput";
import AppSelect from "../../components/form/AppSelect";
import Button from "../../components/form/Button";
import ErrorMessage from "../../components/form/ErrorMessage";
import Form from "../../components/form/Form";
import { Spinner } from "../../components/theme/Loader";
import AppTextArea from "../../components/form/AppTextArea";

import {
  addCommentOnVideo,
  addVideoMania,
  deleteVideoMania,
  getVideoAllComments,
  getVideoAllLikes,
  getVideoSubCategoryByCategory,
  likeUnlikeVideo,
  updateVideoMania,
} from "../../app/features/videomania";
import { FaPlusCircle } from "react-icons/fa";
import videoIcon from "../../assets/videoIcon.svg";
import { Toast } from "../../components/theme/Toast";
import { uploadImage, uploadVideo } from "../../utils/common/cloudinary";

import VideoPlayer from "../../components/previewers/VideoPlayer";
import { copyLink } from "../../utils/copyLink";
import { useTranslation } from "react-i18next";

export const AddVideoMania = ({
  setAddModal,
  dispatch,
  setReload,
  categoryId,
}) => {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { bgColor } = useSelector((state) => state.theme);

  const videoRef = useRef(null);
  const thumbnailRef = useRef(null);

  const [subCategory, setSubCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const handleAddVideoMania = async (data, { resetForm }) => {
    setIsLoading(true);
    try {
      if (!data?.video) {
        Toast("error", "Please upload a video");
        setIsLoading(false);
        return;
      }

      if (!data?.thumbnail) {
        Toast("error", "Please upload a thumbnail");
        setIsLoading(false);
        return;
      }

      const video = await uploadVideo(data.video);
      if (!video) throw new Error("Failed to upload video.");

      const thumbnail = await uploadImage(data.thumbnail);
      if (!thumbnail) throw new Error("Failed to upload thumbnail.");

      const payload = { ...data, video, thumbnail };
      const { statusCode } = await dispatch(
        addVideoMania({ token, payload })
      ).unwrap();

      if (statusCode === 201) {
        Toast("success", "Video mania uploaded successfully");
        setReload((prev) => !prev);
        setAddModal(false);
        resetForm();
      }
    } catch (error) {
      console.error("Upload Error:", error);
      Toast("error", error?.message || "Error uploading video mania");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (categoryId) {
        const { AllCategories } = await dispatch(
          getVideoSubCategoryByCategory({ token, id: categoryId })
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
          video_category: categoryId,
          sub_category: "",
          video: "",
          thumbnail: "",
          user_id: user?.id,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(t("validationMessagesName")),
          description: Yup.string().required(
            t("validationMessagesDescription")
          ),
          sub_category: Yup.string().required(
            t("validationMessagesSubCategory")
          ),
          video: Yup.string().optional(),
          thumbnail: Yup.string().optional(),
        })}
        onSubmit={handleAddVideoMania}
      >
        {({ handleSubmit, values, handleChange, setFieldValue }) => (
          <div className="flex-col-start gap-5">
            <div className="w-full flex items-center justify-center gap-5">
              <div
                className={`capture-container`}
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
                    <FaPlusCircle size={25} />
                    <p>{t("upload-video")}</p>
                  </>
                ) : (
                  <div className="py-2">
                    <p className={`px-2 ${bgColor} rounded-full text-white`}>
                      {t("change-video")}
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
                className={`relative capture-container`}
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
                    <FaPlusCircle size={25} />
                    <p>{t("videoT")}</p>
                  </>
                ) : (
                  <>
                    <p
                      className={`px-2 ${bgColor} rounded-full text-white absolute top-0`}
                    >
                      {t("changeImage")}
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
                  </>
                )}
              </div>
            </div>

            <div className="input-container">
              <AppInput
                label={t("nameC")}
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              <ErrorMessage name="name" />
            </div>

            <div className="input-container">
              <AppSelect
                label={t("subC")}
                name="sub_category"
                value={values.sub_category}
                onChange={handleChange}
                options={subCategory}
              />
              <ErrorMessage name="sub_category" />
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
                title={t("add")}
                icon={isLoading ? null : FaPlusCircle}
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
export const EditVideoMania = ({
  setEditModal,
  dispatch,
  setReload,
  video,
}) => {
  const { token } = useSelector((state) => state.auth);
  const { bgColor } = useSelector((state) => state.theme);
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const thumbnailRef = useRef(null);

  const [subCategory, setSubCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditVideoMania = async (data, { resetForm }) => {
    setIsLoading(true);
    try {
      if (!data?.video) {
        Toast("error", "Please upload a video");
        setIsLoading(false);
        return;
      }

      if (!data?.thumbnail) {
        Toast("error", "Please upload a thumbnail");
        setIsLoading(false);
        return;
      }

      const video = await uploadVideo(data.video);
      if (!video) throw new Error("Failed to upload video.");

      const thumbnail = await uploadImage(data.thumbnail);
      if (!thumbnail) throw new Error("Failed to upload thumbnail.");

      const payload = { ...data, video, thumbnail };
      const { statusCode } = await dispatch(
        updateVideoMania({ token, payload })
      ).unwrap();

      if (statusCode === 200) {
        Toast("success", "Video mania updated successfully");
        setReload((prev) => !prev);
        setEditModal(false);
        resetForm();
      }
    } catch (error) {
      console.error("Update Error:", error);
      Toast("error", error?.message || "Error updating video mania");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (video?.video_category) {
        const { AllCategories } = await dispatch(
          getVideoSubCategoryByCategory({ token, id: video?.video_category })
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
          id: video?.video_id || "",
          name: video?.name || "",
          description: video?.description || "",
          video_category: video?.video_category,
          sub_category: video?.sub_category || "",
          video: video?.video || "",
          thumbnail: video?.thumbnail || "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(t("validationMessagesName")),
          description: Yup.string().required(
            t("validationMessagesDescription")
          ),
          sub_category: Yup.string().required(
            t("validationMessagesSubCategory")
          ),
          video: Yup.string().optional(),
          thumbnail: Yup.string().optional(),
        })}
        onSubmit={handleEditVideoMania}
      >
        {({ handleSubmit, values, handleChange, setFieldValue }) => (
          <div className="flex-col-start gap-5">
            <div className="w-full flex items-center justify-center gap-5">
              <div
                className={`capture-container`}
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
                    <FaPlusCircle size={25} />
                    <p>{t("upload-video")}</p>
                  </>
                ) : (
                  <div className="py-2 ">
                    <p className={`px-2 ${bgColor} rounded-full text-white`}>
                      {t("change-video")}
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
                className={`relative capture-container`}
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
                    <FaPlusCircle size={25} />
                    <p>{t("videoT")}</p>
                  </>
                ) : (
                  <>
                    <p
                      className={`px-2 ${bgColor} rounded-full text-white absolute top-0`}
                    >
                      {t("changeImage")}
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
                  </>
                )}
              </div>
            </div>

            <div className="input-container">
              <AppInput
                label={t("nameC")}
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              <ErrorMessage name="name" />
            </div>

            <div className="input-container">
              <AppSelect
                label={t("subC")}
                name="sub_category"
                value={values.sub_category}
                onChange={handleChange}
                options={subCategory}
              />
              <ErrorMessage name="sub_category" />
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
                title={t("update")}
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

export const DeleteVideoMania = ({
  setDeleteModal,
  dispatch,
  setReload,
  id,
}) => {
  const { token } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const { statusCode } = await dispatch(
        deleteVideoMania({
          token,
          id,
        })
      ).unwrap();

      if (statusCode === 200) {
        Toast("success", "Video mania deleted successfully");
        setReload((prev) => !prev);
        setDeleteModal(false);
      }
    } catch (error) {
      console.error("Delete Error:", error);
      Toast("error", error?.message || "Error deleting video mania");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center">
      <p className="mb-2 text-gray-700">{t("delete_video_confirmation")}</p>
      <p className="text-sm text-gray-500 mb-6">{t("delete_video_warning")}</p>
      <div className="btn-container flex justify-center gap-4">
        <Button
          title={t("no")}
          width={false}
          onClick={() => setDeleteModal(false)}
          bgColor="bg-slate-500"
        />
        <Button
          title={t("yes")}
          width={false}
          onClick={handleDelete}
          spinner={isLoading ? <Spinner size="sm" /> : null}
        />
      </div>
    </div>
  );
};

export const VideoManiaPlayer = ({ video, isOpen, onClose, dispatch }) => {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.video_mania);

  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [commentText, setCommentText] = useState("");

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
    getAllLikes();
    getAllComments();
  }, [video?.video_id]);

  return (
    <VideoPlayer
      video={video?.video}
      isOpen={isOpen}
      onClose={onClose}
      likes={likes}
      comments={comments}
      commentText={commentText}
      setCommentText={setCommentText}
      totalComments={totalComments}
      OnLike={handleLike}
      onComment={handleComment}
      OnCopy={() => copyLink(video?.video)}
      description={video?.description}
      userImage={video?.userimage || video?.user_image}
      userName={video?.username}
      title={video?.name}
      isLiked={isLiked}
      isLoading={isLoading}
    />
  );
};
