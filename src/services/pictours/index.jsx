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
import { FaPlusCircle } from "react-icons/fa";
import { Toast } from "../../components/theme/Toast";
import { uploadImage } from "../../utils/common/cloudinary";
import {
  addCommentOnPicTour,
  addPicTour,
  deletePicTour,
  getPicTourComments,
  getPicTourLikes,
  getPicTourSubCategoryByCategory,
  likeUnlikePicTour,
  updatePicTour,
} from "../../app/features/pictours";

import { copyLink } from "../../utils/copyLink";
import ImagePreviewer from "../../components/previewers/ImagePreviewer";

export const AddPicTour = ({
  setAddModal,
  dispatch,
  setReload,
  categoryId,
}) => {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { bgColor } = useSelector((state) => state.theme);

  const imageRef = useRef(null);

  const [subCategory, setSubCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPicTour = async (data, { resetForm }) => {
    setIsLoading(true);
    try {
      if (!data?.image) {
        Toast("error", "Please select an image");
        setIsLoading(false);
        return;
      }

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
          image: Yup.string().optional(),
        })}
        onSubmit={handleAddPicTour}
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
                    <p>Upload Image</p>
                  </>
                ) : (
                  <>
                    <div
                      className={`px-2 ${bgColor} rounded-full text-white absolute top-0`}
                    >
                      Change Image
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
export const EditPicTour = ({ setEditModal, dispatch, setReload, picTour }) => {
  const { token } = useSelector((state) => state.auth);
  const { bgColor } = useSelector((state) => state.theme);

  const imageRef = useRef(null);

  const [subCategory, setSubCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPicTour = async (data, { resetForm }) => {
    setIsLoading(true);
    try {
      if (!data?.image) {
        Toast("error", "Please select an image");
        setIsLoading(false);
        return;
      }

      const image = await uploadImage(data?.image);
      if (!image) throw new Error("Failed to upload image.");

      const payload = { ...data, image };
      const { statusCode } = await dispatch(
        updatePicTour({ token, payload })
      ).unwrap();

      if (statusCode === 200) {
        Toast("success", "Pic Tour updated successfully");
        setReload((prev) => !prev);
        setEditModal(false);
        resetForm();
      }
    } catch (error) {
      console.error("Update Error:", error);
      Toast("error", error?.message || "Error updating pic tour");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (picTour?.pic_category) {
        const { AllCategories } = await dispatch(
          getPicTourSubCategoryByCategory({ token, id: picTour?.pic_category })
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
          id: picTour?.pic_tour_id || "",
          name: picTour?.name || "",
          description: picTour?.description || "",
          pic_category: picTour?.pic_category || "",
          sub_category: picTour?.sub_category || "",
          image: picTour?.image || "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Name is required"),
          description: Yup.string().required("Description is required"),
          sub_category: Yup.string().required("Sub Category is required"),
          image: Yup.string().optional(),
        })}
        onSubmit={handleAddPicTour}
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
                    <p>Upload Image</p>
                  </>
                ) : (
                  <>
                    <div
                      className={`px-2 ${bgColor} rounded-full text-white absolute top-0`}
                    >
                      Change Image
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
                title={"Update"}
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

export const DeletePicTour = ({ setDeleteModal, dispatch, setReload, id }) => {
  const { token } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const { statusCode } = await dispatch(
        deletePicTour({
          token,
          id,
        })
      ).unwrap();

      if (statusCode === 200) {
        Toast("success", "Pic Tour deleted successfully");
        setReload((prev) => !prev);
        setDeleteModal(false);
      }
    } catch (error) {
      console.error("Delete Error:", error);
      Toast("error", error?.message || "Error deleting pic tour");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center">
      <p className="mb-2 text-gray-700">
        Are you sure you want to delete this Pic Tour?
      </p>
      <p className="text-sm text-gray-500 mb-6">
        This action is irreversible and will permanently remove the Pic Tour.
      </p>
      <div className="btn-container flex justify-center gap-4">
        <Button
          title="No"
          width={false}
          onClick={() => setDeleteModal(false)}
          bgColor="bg-slate-500"
        />
        <Button
          title="Yes"
          width={false}
          onClick={handleDelete}
          spinner={isLoading ? <Spinner size="sm" /> : null}
        />
      </div>
    </div>
  );
};

export const PicTourPreviewer = ({ image, isOpen, onClose, isTop = false }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.pictours);

  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [commentText, setCommentText] = useState("");

  const handleComment = async () => {
    if (isTop) return Toast("error", "You can't comment on top pic tour");
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
        title: image?.name,
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
