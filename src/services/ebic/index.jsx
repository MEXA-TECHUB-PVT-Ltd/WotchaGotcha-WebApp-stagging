import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import AppSelect from "../../components/form/AppSelect";
import Button from "../../components/form/Button";
import ErrorMessage from "../../components/form/ErrorMessage";
import Form from "../../components/form/Form";
import { Spinner } from "../../components/theme/Loader";
import AppTextArea from "../../components/form/AppTextArea";

import { Toast } from "../../components/theme/Toast";

import { copyLink } from "../../utils/copyLink";

import {
  addCommentOnEbic,
  getEbicComments,
  getEbicLikes,
  likeUnlikeEbic,
  addEbic,
  getEbicSubCategoryByCategory,
} from "../../app/features/ebic";
import ImagePreviewer from "../../components/previewers/ImagePreviewer";
import Modal from "../../components/modal/Modal";
import { FaRegSmile } from "react-icons/fa";

export const AddEbic = ({ setAddModal, dispatch, setReload, categoryId }) => {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { mode, borderColor, bgColor, textColor } = useSelector(
    (state) => state.theme
  );

  const [subCategory, setSubCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);

  const handleAddEbic = async (data, { resetForm }) => {
    setIsLoading(true);
    try {
      const { statusCode } = await dispatch(
        addEbic({ token, payload: data })
      ).unwrap();

      if (statusCode === 201) {
        Toast("success", "Ebic uploaded successfully");
        setReload((prev) => !prev);
        setAddModal(false);
        resetForm();
      }
    } catch (error) {
      console.error("Upload Error:", error);
      Toast("error", error?.message || "Error uploading ebic");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (categoryId) {
        const { AllCategories } = await dispatch(
          getEbicSubCategoryByCategory({ token, id: categoryId })
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
          description: "",
          category: categoryId,
          sub_category: "",
          image: "",
          user_id: user?.id,
        }}
        validationSchema={Yup.object().shape({
          description: Yup.string().required("Ebic is required"),
          sub_category: Yup.string().required("Sub Category is required"),
          image: Yup.string().required("Image is required"),
        })}
        onSubmit={handleAddEbic}
      >
        {({ handleSubmit, values, handleChange, setFieldValue }) => (
          <div className="flex-col-start gap-5">
            <div
              className={`relative capture-container ${borderColor}`}
              onClick={() => setIsEmojiModalOpen(true)}
            >
              {values.image ? (
                <>
                  <div
                    className={`px-2 ${bgColor} rounded-full text-white absolute top-0`}
                  >
                    Change Emoji
                  </div>
                  <span className="text-6xl cursor-pointer">
                    {values.image}
                  </span>
                </>
              ) : (
                <>
                  <FaRegSmile size={30} className={textColor} />
                  <p>Select an Emoji</p>
                </>
              )}
            </div>

            <div className="input-container">
              <AppTextArea
                label={"Ebic"}
                name="description"
                value={values.description}
                onChange={handleChange}
              />
              <ErrorMessage name="description" />
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

            <div className="btn-container">
              <Button
                title={"Add"}
                width={false}
                onClick={isLoading ? null : handleSubmit}
                spinner={isLoading ? <Spinner size="sm" /> : null}
              />
            </div>

            <Modal
              isOpen={isEmojiModalOpen}
              onClose={() => setIsEmojiModalOpen(false)}
            >
              <Picker
                data={data}
                onEmojiSelect={(emoji) => {
                  setFieldValue("image", emoji.native);
                  setIsEmojiModalOpen(false);
                }}
                perLine={window.screen.width > 768 ? 13 : 8}
                emojiSize={24}
                previewPosition="none"
                theme={`${mode === "dark" ? "dark" : "light"}`}
              />
            </Modal>
          </div>
        )}
      </Form>
    </>
  );
};

export const EbicPreviewer = ({ image, isOpen, onClose, isTop = false }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.ebic);

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
        GEBC_id: image?.gebc_id,
        comment: commentText,
      };

      setComments((prev) => [...prev, commentText]);

      const { statusCode } = await dispatch(
        addCommentOnEbic({ payload, token })
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
    if (!image?.gebc_id) return;

    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      const payload = {
        user_id: user?.id,
        GEBC_id: image?.gebc_id,
      };

      const { statusCode } = await dispatch(
        likeUnlikeEbic({ payload, token })
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
    if (!image?.gebc_id) return;

    try {
      const data = await dispatch(
        getEbicLikes({ token, id: image?.gebc_id })
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
    if (!image?.gebc_id) return;

    try {
      const data = await dispatch(
        getEbicComments({ token, id: image?.gebc_id })
      ).unwrap();

      setTotalComments(data?.totalComments || 0);

      setComments(data?.AllComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (!isTop) {
      getAllLikes();
      getAllComments();
    }
  }, [image?.gebc_id]);

  return (
    <ImagePreviewer
      {...{
        image: image?.image,
        isOpen,
        onClose,
        isTop,
        likes,
        isLoading,
        isLiked,
        commentText,
        setCommentText,
        totalComments,
        isEmoji: true,
      }}
      comments={comments}
      OnLike={handleLike}
      OnCopy={() => copyLink(image?.image)}
      onComment={handleComment}
      description={image?.description}
      userImage={image?.user_image || image?.userimage}
      userName={image?.username}
    />
  );
};
