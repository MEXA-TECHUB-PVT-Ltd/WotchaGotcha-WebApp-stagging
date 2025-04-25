import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { MdSkipNext, MdSkipPrevious, MdVerified } from "react-icons/md";
import SignatureCanvas from "react-signature-canvas";

import AppInput from "../../components/form/AppInput";
import AppSelect from "../../components/form/AppSelect";
import Button from "../../components/form/Button";
import ErrorMessage from "../../components/form/ErrorMessage";
import Form from "../../components/form/Form";
import { Spinner } from "../../components/theme/Loader";
import AppTextArea from "../../components/form/AppTextArea";
import { FaPlusCircle, FaRegCheckCircle } from "react-icons/fa";
import { Toast } from "../../components/theme/Toast";
import { uploadImage, uploadVideo } from "../../utils/common/cloudinary";
import Modal from "../../components/modal/Modal";
import ProfileCard from "../../components/card/ProfileCard";
import {
  addLetter,
  addSignature,
  deleteLetter,
  getLetterSubByCategory,
  updateLetter,
  updateLetterMedia,
} from "../../app/features/openletters";
import videoIcon from "../../assets/videoIcon.svg";

export const AddOpenLetter = ({
  setAddModal,
  dispatch,
  setReload,
  categoryId,
}) => {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

  const imageRef = useRef(null);
  const sigCanvas = useRef(null);
  const videoRef = useRef(null);

  const [subCategory, setSubCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [sigImage, setSigImage] = useState(null);

  const handleClear = () => {
    sigCanvas.current.clear();
  };

  const handleSave = () => {
    const dataUrl = sigCanvas.current.toDataURL();
    setSigImage(dataUrl);
  };

  const handleAddLetter = async (data, { resetForm }) => {
    setIsLoading(true);
    try {
      const signatureImageUrl = await uploadImage(sigImage);
      if (!signatureImageUrl) throw new Error("Failed to upload signature");

      const sigPayload = {
        image: signatureImageUrl,
        user_id: user?.id,
      };

      const { data: signatureData } = await dispatch(
        addSignature({ token, payload: sigPayload })
      ).unwrap();

      let uploadedImages = [];
      let videoUrl = null;

      if (Array.isArray(images) && images?.length > 0) {
        const imageUploadPromises = images.map((img) => uploadImage(img));
        uploadedImages = await Promise.all(imageUploadPromises);

        if (uploadedImages.some((url) => !url)) {
          throw new Error("Failed to upload one or more images");
        }
      } else if (data?.video) {
        videoUrl = await uploadVideo(data.video);
        if (!videoUrl) throw new Error("Failed to upload video");
      }

      const payload = {
        ...data,
        signature_id: signatureData?.signature_id,
        image: uploadedImages || [],
        video: videoUrl,
      };

      const { statusCode } = await dispatch(
        addLetter({ token, payload })
      ).unwrap();

      if (statusCode === 201) {
        Toast("success", "Letter uploaded successfully");
        setReload((prev) => !prev);
        setAddModal(false);
        resetForm();
        setImages([]);
      }
    } catch (error) {
      console.error("Upload Error:", error);
      Toast("error", error?.message || "Error uploading Letter");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = (values) => {
    if (step === 1) {
      if (
        !values.name ||
        !values.address ||
        !values.contact_no ||
        !values.email ||
        !values.disc_sub_category
      ) {
        Toast("error", "Please fill all the fields");
        return false;
      }
    } else if (step === 2) {
      if (
        !values?.subject_place ||
        !values?.introduction ||
        !values?.body ||
        !values?.greetings
      ) {
        Toast("error", "Please fill all the fields");
        return false;
      }
    } else if (step === 3) {
      if (!sigImage) {
        Toast("error", "Please add a signature");
        return false;
      }
    } else if (step === 4) {
      if (images.length === 0 && !values?.video) {
        Toast("error", "Please add at least one image or video");
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (categoryId) {
        const { data } = await dispatch(
          getLetterSubByCategory({ token, id: categoryId })
        ).unwrap();

        setSubCategory(data);
      }
    };

    fetchSubCategories();
  }, []);

  return (
    <>
      <Form
        initialValues={{
          name: "",
          address: "",
          email: "",
          contact_no: "",
          subject_place: "",
          post_date: new Date(Date.now()),
          greetings: "",
          introduction: "",
          body: "",
          video: "",
          user_id: user?.id || "",
          disc_category: categoryId,
          disc_sub_category: "",
          post_type: "public",
          receiver_type: "leader",
          paid_status: false,
          form_of_appeal: "letter",
        }}
        onSubmit={handleAddLetter}
      >
        {({ handleSubmit, values, handleChange, setFieldValue }) => (
          <>
            <span className="w-full flex justify-center font-bold text-lg dark:text-dark_text_1 text-dark_bg_5 pr-1">
              {step === 1
                ? "Sender Informations "
                : step === 2
                ? "Letter Details "
                : step === 3
                ? "E-Signature "
                : step === 4
                ? "Relevant Media "
                : null}
              ({step}/4)
            </span>

            {/* step 1  */}
            {step === 1 && (
              <div className="flex-col-start gap-5">
                {/* Name Input */}
                <div className="input-container">
                  <AppInput
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </div>

                {/* Address Input */}
                <div className="input-container">
                  <AppInput
                    label="Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                  />
                </div>

                {/* Contact Number Input */}
                <div className="input-container">
                  <AppInput
                    type="number"
                    label="Contact Number"
                    name="contact_no"
                    value={values.contact_no}
                    onChange={handleChange}
                  />
                </div>

                {/* Email Input */}
                <div className="input-container">
                  <AppInput
                    type="email"
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Sub Category Select */}
                <div className="input-container">
                  <AppSelect
                    label="Sub Category"
                    name="disc_sub_category"
                    value={values.disc_sub_category}
                    onChange={handleChange}
                    options={subCategory}
                  />
                </div>
              </div>
            )}

            {/* step 2  */}
            {step === 2 && (
              <div className="flex-col-start gap-5">
                <div className="input-container">
                  <AppInput
                    label="Subject"
                    name="subject_place"
                    value={values.subject_place}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-container">
                  <AppInput
                    label="Introduction"
                    name="introduction"
                    value={values.introduction}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-container">
                  <AppTextArea
                    label="Body"
                    name="body"
                    value={values.body}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-container">
                  <AppTextArea
                    label="Greetings"
                    name="greetings"
                    value={values.greetings}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {/* /* step 3   */}
            {step === 3 && (
              <div className="flex flex-col w-full justify-center mt-5 gap-1 relative">
                <h2 className="text-dark_bg_5 dark:text-dark_bg_5">
                  Draw your signature
                </h2>
                <SignatureCanvas
                  penColor="black"
                  onEnd={handleSave}
                  canvasProps={{
                    width: 400,
                    height: 200,
                    className: "sigCanvas",
                  }}
                  ref={sigCanvas}
                />

                <button
                  className="absolute top-3 right-0 bg-red-500 text-white px-2 py-1 w-30 rounded"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
            )}

            {/* step 4  */}

            {step === 4 && (
              <div className="flex flex-col w-full justify-center mt-5">
                {/* Images Section  */}
                {!values?.video && (
                  <div className="mt-2 mb-5 flex flex-col gap-2">
                    <h2 className="text-dark_bg_5 dark:text-dark_bg_5">
                      Images (max 3)
                    </h2>

                    <div className="flex flex-wrap gap-5 items-center">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className={`capture-container relative`}
                        >
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            className="h-full w-full"
                          />
                          <button
                            className="flex bg-red-500  w-5 h-5 justify-center p-1 rounded-full text-white absolute items-center right-0 top-0"
                            onClick={() =>
                              setImages(images.filter((_, i) => i !== index))
                            }
                          >
                            X
                          </button>
                        </div>
                      ))}
                      {images.length < 3 && (
                        <div
                          className={`capture-container`}
                          onClick={() => imageRef.current.click()}
                        >
                          <input
                            ref={imageRef}
                            type="file"
                            multiple
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              setImages((prev) =>
                                [...prev, ...files].slice(0, 3)
                              );
                            }}
                          />
                          <FaPlusCircle size={25} />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Video Section  */}
                {images?.length === 0 && (
                  <div className="mt-2 mb-5 flex flex-col gap-2">
                    <h2 className="text-dark_bg_5 dark:text-dark_bg_5">
                      Video (max 1)
                    </h2>
                    {!values?.video ? (
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

                        <FaPlusCircle size={25} />
                      </div>
                    ) : (
                      <div
                        className={`relative capture-container`}
                        onClick={() => videoRef.current.click()}
                      >
                        <div>
                          <p
                            className={`w-5 h-5 p-1 rounded-full text-white absolute bg-red-500 top-0 right-0 flex justify-center items-center`}
                            onClick={() => {
                              setFieldValue("video", null);
                            }}
                          >
                            X
                          </p>
                          <img
                            style={{
                              imageRendering: "-webkit-optimize-contrast",
                            }}
                            src={videoIcon}
                            alt="Video"
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Next Button */}
            <div className="btn-container mt-5 gap-2">
              {step !== 1 && (
                <Button
                  title={"Back"}
                  icon={MdSkipPrevious}
                  width={false}
                  onClick={() => {
                    setStep((prev) => prev - 1);
                  }}
                />
              )}

              <Button
                title={step === 4 ? "Post" : "Next"}
                icon={!isLoading && step === 4 && FaRegCheckCircle}
                lastIcon={step !== 4 && MdSkipNext}
                width={false}
                onClick={() => {
                  if (validateForm(values)) {
                    if (step >= 4) {
                      handleSubmit();
                    } else {
                      setStep((prev) => prev + 1);
                    }
                  }
                }}
                spinner={isLoading ? <Spinner size="sm" /> : null}
              />
            </div>
          </>
        )}
      </Form>
    </>
  );
};

export const EditOpenLetter = ({
  setEditModal,
  dispatch,
  setReload,
  letter,
}) => {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

  console.log(letter);

  const imageRef = useRef(null);
  const sigCanvas = useRef(null);
  const videoRef = useRef(null);

  const [subCategory, setSubCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [images, setImages] = useState(letter?.images || []);
  const [sigImage, setSigImage] = useState(null);

  const handleClear = () => {
    sigCanvas.current.clear();
  };

  const handleSave = () => {
    const dataUrl = sigCanvas.current.toDataURL();
    setSigImage(dataUrl);
  };

  const handleEditLetter = async (data, { resetForm }) => {
    setIsLoading(true);
    try {
      const signatureImageUrl = await uploadImage(sigImage);
      if (!signatureImageUrl) throw new Error("Failed to upload signature");

      const sigPayload = {
        image: signatureImageUrl,
        user_id: user?.id,
      };

      const { data: signatureData } = await dispatch(
        addSignature({ token, payload: sigPayload })
      ).unwrap();

      let uploadedImages = [];
      let videoUrl = null;

      if (Array.isArray(images) && images?.length > 0) {
        const imageUploadPromises = images.map((img) => uploadImage(img));
        uploadedImages = await Promise.all(imageUploadPromises);

        if (uploadedImages.some((url) => !url)) {
          throw new Error("Failed to upload one or more images");
        }
      } else if (data?.video) {
        videoUrl = await uploadVideo(data.video);
        if (!videoUrl) throw new Error("Failed to upload video");
      }

      const payload = {
        ...data,
        signature_id: signatureData?.signature_id,
      };

      await dispatch(updateLetter({ token, payload })).unwrap();

      const allImages = [...uploadedImages, ...images];

      const payloadMedia = {
        letterId: letter?.post_id,
        image: allImages,
        video: videoUrl,
      };

      const { statusCode } = await dispatch(
        updateLetterMedia({ token, payload: payloadMedia })
      ).unwrap();

      if (statusCode === 200) {
        Toast("success", "Letter updated successfully");
        setReload((prev) => !prev);
        setEditModal(false);
        resetForm();
        setImages([]);
      }
    } catch (error) {
      console.error("Update Error:", error);
      Toast("error", error?.message || "Error updated Letter");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = (values) => {
    if (step === 1) {
      if (
        !values.name ||
        !values.address ||
        !values.contact_no ||
        !values.email ||
        !values.disc_sub_category
      ) {
        Toast("error", "Please fill all the fields");
        return false;
      }
    } else if (step === 2) {
      if (
        !values?.subject_place ||
        !values?.introduction ||
        !values?.body ||
        !values?.greetings
      ) {
        Toast("error", "Please fill all the fields");
        return false;
      }
    } else if (step === 3) {
      if (!sigImage) {
        Toast("error", "Please add a signature");
        return false;
      }
    } else if (step === 4) {
      if (images.length === 0 && !values?.video) {
        Toast("error", "Please add at least one image or video");
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (letter?.disc_category) {
        const { data } = await dispatch(
          getLetterSubByCategory({ token, id: letter?.disc_category })
        ).unwrap();

        setSubCategory(data);
      }
    };

    fetchSubCategories();
  }, []);

  return (
    <>
      <Form
        initialValues={{
          letterId: letter?.post_id,
          name: letter?.name || "",
          address: letter?.address || "",
          email: letter?.email || "",
          contact_no: letter?.contact_no || "",
          subject_place: letter?.subject_place || "",
          greetings: letter?.greetings || "",
          introduction: letter?.introduction || "",
          body: letter?.body || "",
          video: letter?.video || "",
          user_id: user?.id || "",
          disc_category: letter?.disc_category || "",
          disc_sub_category: letter?.disc_sub_category || "",
          post_type: "public",
          receiver_type: "leader",
          paid_status: false,
          form_of_appeal: "letter",
        }}
        onSubmit={handleEditLetter}
      >
        {({ handleSubmit, values, handleChange, setFieldValue }) => (
          <>
            <span className="w-full flex justify-center font-bold text-lg dark:text-dark_text_1 text-dark_bg_5 pr-1">
              {step === 1
                ? "Sender Informations "
                : step === 2
                ? "Letter Details "
                : step === 3
                ? "E-Signature "
                : step === 4
                ? "Relevant Media "
                : null}
              ({step}/4)
            </span>

            {/* step 1  */}
            {step === 1 && (
              <div className="flex-col-start gap-5">
                {/* Name Input */}
                <div className="input-container">
                  <AppInput
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </div>

                {/* Address Input */}
                <div className="input-container">
                  <AppInput
                    label="Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                  />
                </div>

                {/* Contact Number Input */}
                <div className="input-container">
                  <AppInput
                    type="number"
                    label="Contact Number"
                    name="contact_no"
                    value={values.contact_no}
                    onChange={handleChange}
                  />
                </div>

                {/* Email Input */}
                <div className="input-container">
                  <AppInput
                    type="email"
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Sub Category Select */}
                <div className="input-container">
                  <AppSelect
                    label="Sub Category"
                    name="disc_sub_category"
                    value={values.disc_sub_category}
                    onChange={handleChange}
                    options={subCategory}
                  />
                </div>
              </div>
            )}

            {/* step 2  */}
            {step === 2 && (
              <div className="flex-col-start gap-5">
                <div className="input-container">
                  <AppInput
                    label="Subject"
                    name="subject_place"
                    value={values.subject_place}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-container">
                  <AppInput
                    label="Introduction"
                    name="introduction"
                    value={values.introduction}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-container">
                  <AppTextArea
                    label="Body"
                    name="body"
                    value={values.body}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-container">
                  <AppTextArea
                    label="Greetings"
                    name="greetings"
                    value={values.greetings}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {/* /* step 3   */}
            {step === 3 && (
              <div className="flex flex-col w-full justify-center mt-5 gap-1 relative">
                <h2 className="text-dark_bg_5 dark:text-dark_bg_5">
                  Draw your signature
                </h2>
                <SignatureCanvas
                  penColor="black"
                  onEnd={handleSave}
                  canvasProps={{
                    width: 400,
                    height: 200,
                    className: "sigCanvas",
                  }}
                  ref={sigCanvas}
                />

                <button
                  className="absolute top-3 right-0 bg-red-500 text-white px-2 py-1 w-30 rounded"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
            )}

            {/* step 4  */}

            {step === 4 && (
              <div className="flex flex-col w-full justify-center mt-5">
                {/* Images Section  */}
                {!values?.video && (
                  <div className="mt-2 mb-5 flex flex-col gap-2">
                    <h2 className="text-dark_bg_5 dark:text-dark_bg_5">
                      Images (max 3)
                    </h2>

                    <div className="flex flex-wrap gap-5 items-center">
                      {images.map((image, index) => {
                        const isFile = image instanceof File;

                        const file = !isFile
                          ? image
                          : URL.createObjectURL(image);

                        return (
                          <div
                            key={index}
                            className={`capture-container relative`}
                          >
                            <img
                              src={file}
                              alt="Preview"
                              className="h-full w-full"
                            />
                            <button
                              className="flex bg-red-500  w-5 h-5 justify-center p-1 rounded-full text-white absolute items-center right-0 top-0"
                              onClick={() =>
                                setImages(images.filter((_, i) => i !== index))
                              }
                            >
                              X
                            </button>
                          </div>
                        );
                      })}
                      {images.length < 3 && (
                        <div
                          className={`capture-container`}
                          onClick={() => imageRef.current.click()}
                        >
                          <input
                            ref={imageRef}
                            type="file"
                            multiple
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              setImages((prev) =>
                                [...prev, ...files].slice(0, 3)
                              );
                            }}
                          />
                          <FaPlusCircle size={25} />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Video Section  */}
                {images?.length === 0 && (
                  <div className="mt-2 mb-5 flex flex-col gap-2">
                    <h2 className="text-dark_bg_5 dark:text-dark_bg_5">
                      Video (max 1)
                    </h2>
                    {!values?.video ? (
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

                        <FaPlusCircle size={25} />
                      </div>
                    ) : (
                      <div
                        className={`relative capture-container`}
                        onClick={() => videoRef.current.click()}
                      >
                        <div>
                          <p
                            className={`w-5 h-5 p-1 rounded-full text-white absolute bg-red-500 top-0 right-0 flex justify-center items-center`}
                            onClick={() => {
                              setFieldValue("video", null);
                            }}
                          >
                            X
                          </p>
                          <img
                            style={{
                              imageRendering: "-webkit-optimize-contrast",
                            }}
                            src={videoIcon}
                            alt="Video"
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Next Button */}
            <div className="btn-container mt-5 gap-2">
              {step !== 1 && (
                <Button
                  title={"Back"}
                  icon={MdSkipPrevious}
                  width={false}
                  onClick={() => {
                    setStep((prev) => prev - 1);
                  }}
                />
              )}

              <Button
                title={step === 4 ? "Post" : "Next"}
                icon={!isLoading && step === 4 && FaRegCheckCircle}
                lastIcon={step !== 4 && MdSkipNext}
                width={false}
                onClick={() => {
                  if (validateForm(values)) {
                    if (step >= 4) {
                      handleSubmit();
                    } else {
                      setStep((prev) => prev + 1);
                    }
                  }
                }}
                spinner={isLoading ? <Spinner size="sm" /> : null}
              />
            </div>
          </>
        )}
      </Form>
    </>
  );
};

export const DeleteOpenLetter = ({
  setDeleteModal,
  dispatch,
  setReload,
  id,
}) => {
  const { token } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const { statusCode } = await dispatch(
        deleteLetter({
          token,
          id,
        })
      ).unwrap();

      if (statusCode === 200) {
        Toast("success", "Letter deleted successfully");
        setReload((prev) => !prev);
        setDeleteModal(false);
      }
    } catch (error) {
      console.error("Delete Error:", error);
      Toast("error", error?.message || "Error deleting letter");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center">
      <p className="mb-2 text-gray-700">
        Are you sure you want to delete this Letter?
      </p>
      <p className="text-sm text-gray-500 mb-6">
        This action is irreversible and will permanently remove the Letter.
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

export const OpenLetterPreviewer = ({ letter, isOpen, onClose }) => {
  const hasValidImages =
    Array.isArray(letter?.images) && letter.images.some((img) => img !== null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Letter Details" size="md">
      {/* Profile Section */}
      <div className="border-b border-gray-200 pb-3">
        <ProfileCard
          image={letter?.userimage}
          title={letter?.username}
          subTitle={`${letter?.address}, ${new Date(
            letter?.post_date
          ).toLocaleDateString("en-US", {
            dateStyle: "long",
          })}`}
          subTitleSize="text-sm"
        />
      </div>

      {/* Letter Subject */}
      {letter?.subject_place && (
        <div className="mt-5 flex items-center gap-2">
          <span className="text-base font-semibold">Subject:</span>
          <p className="text-sm text-gray-700 dark:text-dark_text_1 break-all whitespace-pre-line">
            {letter.subject_place}
          </p>
        </div>
      )}

      {/* Letter Body */}
      <div className="flex flex-col gap-1 text-sm text-gray-700 dark:text-dark_text_1 my-4">
        {letter?.introduction && (
          <span className="break-words whitespace-pre-line ">
            {letter.introduction},
          </span>
        )}
        {letter?.body && (
          <span className="break-words whitespace-pre-line my-3 ml-4">
            {letter.body}
          </span>
        )}
        {letter?.greetings && (
          <span className="break-words whitespace-pre-line">
            {letter.greetings}
          </span>
        )}
      </div>

      {/* Signature */}
      {letter?.signature_image && (
        <div className="w-full flex justify-end mt-4">
          <img
            src={letter.signature_image}
            className="w-30 h-20 object-contain"
            alt="Signature"
            loading="lazy"
            style={{ imageRendering: "-webkit-optimize-contrast" }}
          />
        </div>
      )}

      {/* Letter Images */}
      {hasValidImages ? (
        <div className="flex justify-center flex-wrap gap-5 my-4 overflow-x-auto">
          {letter?.images?.map((image, index) => (
            <img
              key={index}
              src={image}
              loading="lazy"
              className="w-32 h-32 object-cover rounded-md cursor-pointer"
              alt={`Image ${index + 1}`}
              onClick={() => {
                window.open(image, "_blank");
              }}
            />
          ))}
        </div>
      ) : letter?.video ? (
        <div className="w-full flex justify-center my-4">
          <video
            id="video"
            controls
            controlsList="nodownload"
            className="w-60 h-40 object-cover rounded-md"
          >
            <source src={letter?.video} type="video/mp4" />
            Your browser does not support the video.
          </video>
        </div>
      ) : null}
    </Modal>
  );
};
