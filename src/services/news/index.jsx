import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import AppSelect from "../../components/form/AppSelect";
import Button from "../../components/form/Button";
import ErrorMessage from "../../components/form/ErrorMessage";
import Form from "../../components/form/Form";
import { Spinner } from "../../components/theme/Loader";
import AppTextArea from "../../components/form/AppTextArea";

import { FaPlusCircle } from "react-icons/fa";
import { Toast } from "../../components/theme/Toast";
import { uploadImage } from "../../utils/common/cloudinary";

import { copyLink } from "../../utils/copyLink";

import {
  addCommentOnOnNews,
  addOnNews,
  deleteNews,
  getOnNewsComments,
  getOnNewsLikes,
  getOnNewsSubCategoryByCategory,
  likeUnlikeOnNews,
  updateOnNews,
} from "../../app/features/onnews";
import ImagePreviewer from "../../components/previewers/ImagePreviewer";
import { useTranslation } from "react-i18next";

export const AddNews = ({ setAddModal, dispatch, setReload, categoryId }) => {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { bgColor } = useSelector((state) => state.theme);
  const { t } = useTranslation();
  const imageRef = useRef(null);

  const [subCategory, setSubCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNews = async (data, { resetForm }) => {
    setIsLoading(true);
    try {
      if (!data?.image) {
        Toast("error", "Please upload an image");
        setIsLoading(false);
        return;
      }

      const image = await uploadImage(data?.image);
      if (!image) throw new Error("Failed to upload image.");

      const payload = { ...data, image };
      const { statusCode } = await dispatch(
        addOnNews({ token, payload })
      ).unwrap();

      if (statusCode === 201) {
        Toast("success", "News uploaded successfully");
        setReload((prev) => !prev);
        setAddModal(false);
        resetForm();
      }
    } catch (error) {
      console.error("Upload Error:", error);
      Toast("error", error?.message || "Error uploading news");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (categoryId) {
        const { AllCategories } = await dispatch(
          getOnNewsSubCategoryByCategory({ token, id: categoryId })
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
          description: Yup.string().required(t("newsis")),
          sub_category: Yup.string().required(
            t("validationMessagesSubCategory")
          ),
          image: Yup.string().optional(),
        })}
        onSubmit={handleAddNews}
      >
        {({ handleSubmit, values, handleChange, setFieldValue }) => (
          <div className="flex-col-start gap-5">
            <div className="w-full flex gap-5 items-center justify-center">
              <div
                className={`relative capture-container`}
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
                    <FaPlusCircle size={25} />
                    <p>{t("upload-image")}</p>
                  </>
                ) : (
                  <>
                    <div
                      className={`px-2 ${bgColor} rounded-full text-white absolute top-0`}
                    >
                      {t("changeImage")}
                    </div>
                    <img
                      style={{ imageRendering: "-webkit-optimize-contrast" }}
                      src={
                        values.image instanceof File
                          ? URL.createObjectURL(values?.image)
                          : values.image
                      }
                      alt="Image"
                      className="h-full w-full"
                    />
                  </>
                )}
              </div>
            </div>

            <div className="input-container">
              <AppTextArea
                label={t("news")}
                name="description"
                value={values.description}
                onChange={handleChange}
              />
              <ErrorMessage name="description" />
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

export const EditNews = ({ setEditModal, dispatch, setReload, news }) => {
  const { token } = useSelector((state) => state.auth);
  const { bgColor } = useSelector((state) => state.theme);
  const { t } = useTranslation();
  const imageRef = useRef(null);

  const [subCategory, setSubCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNews = async (data, { resetForm }) => {
    setIsLoading(true);
    try {
      if (!data?.image) {
        Toast("error", "Please upload an image");
        setIsLoading(false);
        return;
      }

      const image = await uploadImage(data?.image);
      if (!image) throw new Error("Failed to upload image.");

      const payload = { ...data, image };
      const { statusCode } = await dispatch(
        updateOnNews({ token, payload })
      ).unwrap();

      if (statusCode === 200) {
        Toast("success", "News updated successfully");
        setReload((prev) => !prev);
        setEditModal(false);
        resetForm();
      }
    } catch (error) {
      console.error("Update Error:", error);
      Toast("error", error?.message || "Error updating news");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (news?.category_id) {
        const { AllCategories } = await dispatch(
          getOnNewsSubCategoryByCategory({ token, id: news?.category_id })
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
          id: news?.news_id || "",
          description: news?.description || "",
          category: news?.category_id || "",
          sub_category: news?.sub_category_id || "",
          image: news?.image || "",
        }}
        validationSchema={Yup.object().shape({
          description: Yup.string().required(t("newsis")),
          sub_category: Yup.string().required(
            t("validationMessagesSubCategory")
          ),
          image: Yup.string().optional(),
        })}
        onSubmit={handleAddNews}
      >
        {({ handleSubmit, values, handleChange, setFieldValue }) => (
          <div className="flex-col-start gap-5">
            <div className="w-full flex gap-5 items-center justify-center">
              <div
                className={`relative capture-container`}
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
                    <FaPlusCircle size={25} />
                    <p>{t("upload-image")}</p>
                  </>
                ) : (
                  <>
                    <div
                      className={`px-2 ${bgColor} rounded-full text-white absolute top-0`}
                    >
                      {t("changeImage")}
                    </div>
                    <img
                      style={{ imageRendering: "-webkit-optimize-contrast" }}
                      src={
                        values.image instanceof File
                          ? URL.createObjectURL(values?.image)
                          : values.image
                      }
                      alt="Image"
                      className="h-full w-full"
                    />
                  </>
                )}
              </div>
            </div>

            <div className="input-container">
              <AppTextArea
                label={t("news")}
                name="description"
                value={values.description}
                onChange={handleChange}
              />
              <ErrorMessage name="description" />
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

export const DeleteNews = ({ setDeleteModal, dispatch, setReload, id }) => {
  const { token } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const { statusCode } = await dispatch(
        deleteNews({
          token,
          id,
        })
      ).unwrap();

      if (statusCode === 200) {
        Toast("success", "News deleted successfully");
        setReload((prev) => !prev);
        setDeleteModal(false);
      }
    } catch (error) {
      console.error("Delete Error:", error);
      Toast("error", error?.message || "Error deleting news");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center">
      <p className="mb-2 text-gray-700">{t("delete_news_confirmation")}</p>
      <p className="text-sm text-gray-500 mb-6">{t("delete_news_warning")}</p>
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

export const NewsPreviewer = ({ image, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.onnews);

  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [commentText, setCommentText] = useState("");

  const handleComment = async () => {
    if (!commentText.trim()) return;

    const previousComments = Array.isArray(comments) ? [...comments] : [];

    try {
      const payload = {
        user_id: user?.id,
        NEWS_id: image?.news_id,
        comment: commentText,
      };

      setComments((prev) => {
        return Array.isArray(prev) ? [...prev, commentText] : [commentText];
      });

      const { statusCode } = await dispatch(
        addCommentOnOnNews({ payload, token })
      ).unwrap();

      if (statusCode === 201) {
        setCommentText("");
        await getAllComments();
      } else {
        setComments(previousComments);
      }
    } catch (error) {
      setComments(previousComments);
      console.error("Comment Error:", error);
    }
  };

  const handleLike = async () => {
    if (!image?.news_id) return;

    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      const payload = {
        user_id: user?.id,
        NEWS_id: image?.news_id,
      };

      const { statusCode } = await dispatch(
        likeUnlikeOnNews({ payload, token })
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
    if (!image?.news_id) return;

    try {
      const data = await dispatch(
        getOnNewsLikes({ token, id: image?.news_id })
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
    if (!image?.news_id) return;

    try {
      const data = await dispatch(
        getOnNewsComments({ token, id: image?.news_id })
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
  }, [image?.news_id]);

  return (
    <ImagePreviewer
      {...{
        image: image?.image,
        isOpen,
        onClose,
        likes,
        isLoading,
        isLiked,
        commentText,
        setCommentText,
        totalComments,
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
