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
import { FaCopy, FaPlusCircle } from "react-icons/fa";
import videoIcon from "../../assets/videoIcon.svg";
import { Spinner } from "../../components/theme/Loader";
import { Toast } from "../../components/theme/Toast";
import {
  addCommentOnKidVids,
  addKidVids,
  getKidVidsComments,
  getKidVidsLikes,
  getKidVidsSubCategoriesByCategory,
  likeUnlikeKidVids,
} from "../../app/features/kidvids";
import { copyLink } from "../../utils/copyLink";
import VideoPlayer from "../../components/previewers/VideoPlayer";

export const AddKidVids = ({
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

  const handleAddKidVids = async (data, { resetForm }) => {
    setIsLoading(true);
    try {
      const video = await uploadVideo(data.video);
      if (!video) throw new Error("Failed to upload video.");

      const thumbnail = await uploadImage(data.thumbnail);
      if (!thumbnail) throw new Error("Failed to upload thumbnail.");

      const payload = { ...data, video, thumbnail };
      const { statusCode } = await dispatch(
        addKidVids({ token, payload })
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
          getKidVidsSubCategoriesByCategory({ token, id: categoryId })
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
        onSubmit={handleAddKidVids}
      >
        {({ handleSubmit, values, handleChange, setFieldValue }) => (
          <div className="flex-col-start gap-5">
            <div className="w-full flex items-center justify-center gap-5">
              <div
                className={`relative capture-container`}
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
                    <p>Upload Video</p>
                  </>
                ) : (
                  <>
                    <p
                      className={`px-2 ${bgColor} rounded-full text-white absolute top-0`}
                    >
                      Change Video
                    </p>
                    <img
                      style={{ imageRendering: "-webkit-optimize-contrast" }}
                      src={videoIcon}
                      alt="Video"
                      className="w-full h-full"
                    />
                  </>
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
                    <p>Video Tumbnail</p>
                  </>
                ) : (
                  <>
                    <p
                      className={`px-2 ${bgColor} rounded-full text-white absolute top-0`}
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
                  </>
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

export const KidVidsPlayer = ({ video, isOpen, onClose, dispatch }) => {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.kidvids);

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
        addCommentOnKidVids({ payload, token })
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
        likeUnlikeKidVids({ payload, token })
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
        getKidVidsLikes({ token, id: video.video_id })
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
        getKidVidsComments({ token, id: video.video_id })
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
      OnCopy={() => copyLink(video?.video)}
      isLoading={isLoading}
      isLiked={isLiked}
      onComment={handleComment}
      description={video?.description}
      userImage={video?.user_image || video?.userimage}
      userName={video?.username}
      title={video?.name}
    />
  );
};
