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

import { getVideoSubCategoryByCategory } from "../../app/features/videomania";
import { FaUpload } from "react-icons/fa";
import videoIcon from "../../assets/videoIcon.svg";
import { Toast } from "../../components/theme/Toast";

export const AddVideoMania = ({
  setAddModal,
  isLoading,
  dispatch,
  setReload,
  categoryId,
}) => {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { textColor, borderColor } = useSelector((state) => state.theme);

  const videoRef = useRef(null);
  const thumbnailRef = useRef(null);

  const [subCategory, setSubCategory] = useState([]);

  const handleAddVideoMania = async (data, { resetForm }) => {
    try {
      console.log(data);
      resetForm();
    } catch (error) {
      console.log(error);
      Toast("error", error?.message || "Error uploading video mania");
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
          name: Yup.string().required("Name is required"),
          description: Yup.string().required("Description is required"),
          sub_category: Yup.string().required("Sub Category is required"),
          video: Yup.string().required("Video is required"),
          thumbnail: Yup.string().required("Thumbnail is required"),
        })}
        onSubmit={handleAddVideoMania}
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
                  <img src={videoIcon} alt="Video" className="w-full h-full" />
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
                  <img
                    src={
                      values.thumbnail instanceof File
                        ? URL.createObjectURL(values?.thumbnail)
                        : values.thumbnail
                    }
                    alt="Thumbnail"
                    className="w-full h-full"
                  />
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

      {/* <Modal
        isOpen={uplaodVideoModal}
        onClose={() => setUplaodVideoModal(false)}
        title="Upload Video"
      >
        <div className="flex items-center justify-center gap-8 mb-8 ">
          <div className={`capture-container ${borderColor}`}>
            <p>Use Camera</p>
            <FaCamera size={25} className={textColor} />
          </div>

          <div
            className={`capture-container ${borderColor}`}
            onClick={handleSelectVideo}
          >
            <p>Browse Files</p>
            <FaCompactDisc size={25} className={textColor} />
          </div>
        </div>
      </Modal> */}
    </>
  );
};
export const EditVideoMania = async () => {};
export const DeleteVideoMania = async () => {};
