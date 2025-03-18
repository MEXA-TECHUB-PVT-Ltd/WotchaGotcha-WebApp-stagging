import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import AppInput from "../../components/form/AppInput";
import AppSelect from "../../components/form/AppSelect";
import Button from "../../components/form/Button";
import ErrorMessage from "../../components/form/ErrorMessage";
import Form from "../../components/form/Form";
import { Spinner } from "../../components/theme/Loader";
import AppTextArea from "../../components/form/AppTextArea";

import { FaCopy, FaUpload } from "react-icons/fa";
import { Toast } from "../../components/theme/Toast";
import { uploadImage } from "../../utils/common/cloudinary";
import {
  addCommentOnPicTour,
  addPicTour,
  getPicTourComments,
  getPicTourLikes,
  getPicTourSubCategoryByCategory,
  likeUnlikePicTour,
} from "../../app/features/pictours";
import Modal from "../../components/modal/Modal";
import { IoChatbubbleEllipses, IoHeart, IoSend } from "react-icons/io5";
import ProfileCard from "../../components/card/ProfileCard";
import { copyLink } from "../../utils/copyLink";

export const AddPicTour = ({
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

  const imageRef = useRef(null);

  const [subCategory, setSubCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPicTour = async (data, { resetForm }) => {
    setIsLoading(true);
    try {
      const image = await uploadImage(data?.image);
      if (!image) throw new Error("Failed to upload image.");

      const payload = { ...data, image };
      const { statusCode } = await dispatch(
        addPicTour({ token, payload })
      ).unwrap();

      if (statusCode === 201) {
        Toast("success", "Pic Tour uploaded successfully");
        setReload((prev) => !prev);
        setAddModal(false);
        resetForm();
      }
    } catch (error) {
      console.error("Upload Error:", error);
      Toast("error", error?.message || "Error uploading pic tour");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (categoryId) {
        const { AllCategories } = await dispatch(
          getPicTourSubCategoryByCategory({ token, id: categoryId })
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
          pic_category: categoryId,
          sub_category: "",
          image: "",
          user_id: user?.id,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Name is required"),
          description: Yup.string().required("Description is required"),
          sub_category: Yup.string().required("Sub Category is required"),
          image: Yup.string().required("Image is required"),
        })}
        onSubmit={handleAddPicTour}
      >
        {({ handleSubmit, values, handleChange, setFieldValue }) => (
          <div className="flex-col-start gap-5">
            <div className="flex items-center gap-5">
              <div
                className={`capture-container ${borderColor}`}
                onClick={() => imageRef.current.click()}
              >
                <input
                  name="image"
                  ref={imageRef}
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFieldValue("image", file);
                  }}
                  accept="image/*"
                  hidden
                />
                {!values?.image ? (
                  <>
                    <p>Upload Image</p>
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
                        values.image instanceof File
                          ? URL.createObjectURL(values?.image)
                          : values.image
                      }
                      alt="Image"
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
export const EditPicTour = async () => {};
export const DeletePicTour = async () => {};

const ImagePreviewer = ({ image, isOpen, onClose, isTop = false }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.pictours);
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
        pic_tours_id: image?.tour_id,
        comment: commentText,
      };

      setComments((prev) => [...prev, commentText]);

      const { statusCode } = await dispatch(
        addCommentOnPicTour({ payload, token })
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
    if (!image?.tour_id) return;

    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      const payload = {
        user_id: user?.id,
        pic_tour_id: image?.tour_id,
      };

      const { statusCode } = await dispatch(
        likeUnlikePicTour({ payload, token })
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
    if (!image?.tour_id) return;

    try {
      const data = await dispatch(
        getPicTourLikes({ token, id: image?.tour_id })
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
    if (!image?.tour_id) return;

    try {
      const data = await dispatch(
        getPicTourComments({ token, id: image?.tour_id })
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
  }, [image?.tour_id]);

  return (
    <>
      <Modal
        title={
          <ProfileCard
            image={image?.user_image || image?.userimage}
            title={image?.username}
          />
        }
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
      >
        {/* Image Previewer */}
        <div className="previewer">
          <img
            style={{ imageRendering: "-webkit-optimize-contrast" }}
            src={image?.image}
            className="w-full h-full object-contain"
          />
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
            <button
              onClick={() => copyLink(image?.image)}
              className={`action-button hover:${textColor}`}
              disabled={isLoading}
            >
              <FaCopy className={`w-6 h-6`} /> Copy Link
            </button>
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

export default ImagePreviewer;
