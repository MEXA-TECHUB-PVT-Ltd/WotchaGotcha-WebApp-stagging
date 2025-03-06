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

import { FaUpload } from "react-icons/fa";
import { Toast } from "../../components/theme/Toast";
import { uploadImage } from "../../utils/common/cloudinary";
import {
  addPicTour,
  getPicTourSubCategoryByCategory,
} from "../../app/features/pictours";

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
