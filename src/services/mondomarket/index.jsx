import { FaLocationDot } from "react-icons/fa6";
import {
  MdBookmark,
  MdLocalOffer,
  MdNotifications,
  MdNotificationsActive,
} from "react-icons/md";
import ProfileCard from "../../components/card/ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Modal from "../../components/modal/Modal";
import { Toast } from "../../components/theme/Toast";
import {
  addMondoMarketItem,
  bookMarkItem,
  checkAlert,
  getMondoMarketCategories,
  removeBookMarkItem,
  sendOffer,
  toggleAlert,
} from "../../app/features/mondomarket";
import { useEffect, useRef, useState } from "react";
import AppInput from "../../components/form/AppInput";
import Button from "../../components/form/Button";
import { Spinner } from "../../components/theme/Loader";
import Form from "../../components/form/Form";
import { FaUpload } from "react-icons/fa";
import ErrorMessage from "../../components/form/ErrorMessage";
import AppSelect from "../../components/form/AppSelect";
import AppTextArea from "../../components/form/AppTextArea";
import { uploadImage } from "../../utils/common/cloudinary";

export const AddMondoItem = ({ setAddModal, dispatch, setReload, regions }) => {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { textColor, borderColor } = useSelector((state) => state.theme);

  const conditions = [
    { id: "new", name: "New" },
    { id: "used_Like_new", name: "Used - Like New" },
    { id: "used_Good", name: "Used - Good" },
    { id: "used_Fair", name: "Used - Fair" },
  ];

  const imageRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  const handleAddMondoItem = async (data, { resetForm }) => {
    setIsLoading(true);
    try {
      if (!images || images.length < 1) {
        Toast("error", "Please upload at least one image.");
        setIsLoading(false);
        return;
      }

      const uploadedImages = await Promise.all(
        images.map((image) => uploadImage(image))
      );

      const payload = {
        ...data,
        paid_status: true,
        images: uploadedImages,
      };
      const { statusCode } = await dispatch(
        addMondoMarketItem({ token, payload })
      ).unwrap();

      if (statusCode === 201) {
        Toast("success", "Item Added Successfully");
        setReload((prev) => !prev);
        setAddModal(false);
        resetForm();
      }
    } catch (error) {
      console.error("Upload Error:", error);
      Toast("error", error?.message || "Error uploading item");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const { AllCategories } = await dispatch(
        getMondoMarketCategories({ token })
      ).unwrap();
      setCategories(AllCategories);
    };
    fetchCategories();
  }, []);

  return (
    <>
      <Form
        initialValues={{
          user_id: user?.id,
          item_category: "",
          title: "",
          description: "",
          price: "",
          condition: "",
          location: "",
          region: "",
        }}
        validationSchema={Yup.object().shape({
          item_category: Yup.string().required("Item Category is required"),
          title: Yup.string().required("Title is required"),
          description: Yup.string().required("Description is required"),
          price: Yup.number()
            .required("Price is required")
            .min(0, "Price must be greater than or equal to 0"),
          condition: Yup.string().required("Condition is required"),
          location: Yup.string().required("Location is required"),
          region: Yup.string().required("Region is required"),
        })}
        onSubmit={handleAddMondoItem}
      >
        {({ handleSubmit, values, handleChange }) => (
          <div className="flex-col-start gap-5">
            <div className="flex flex-wrap gap-5 items-center">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`capture-container ${borderColor} relative`}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="h-full w-full"
                  />
                  <button
                    className="flex bg-red-500 h-5 justify-center p-1 rounded-full text-white w-5 absolute items-center right-0 top-0"
                    onClick={() =>
                      setImages(images.filter((_, i) => i !== index))
                    }
                  >
                    X
                  </button>
                </div>
              ))}
              {images.length < 10 && (
                <div
                  className={`capture-container ${borderColor}`}
                  onClick={() => imageRef.current.click()}
                >
                  <input
                    ref={imageRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      setImages((prev) => [...prev, ...files].slice(0, 10));
                    }}
                    hidden
                  />
                  <p>Upload Image</p>
                  <FaUpload size={25} className={textColor} />
                </div>
              )}
            </div>

            <div className="input-container">
              <AppInput
                label={"Title"}
                name="title"
                value={values.title}
                onChange={handleChange}
              />
              <ErrorMessage name="title" />
            </div>

            <div className="input-container">
              <AppSelect
                label={"Category"}
                name="item_category"
                value={values.item_category}
                onChange={handleChange}
                options={categories}
              />
              <ErrorMessage name="item_category" />
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

            <div className="input-container">
              <AppInput
                label={"Price"}
                name="price"
                type="number"
                value={values.price}
                onChange={handleChange}
              />
              <ErrorMessage name="price" />
            </div>

            <div className="input-container">
              <AppSelect
                label={"Condition"}
                name="condition"
                value={values.condition}
                onChange={handleChange}
                options={conditions}
              />
              <ErrorMessage name="condition" />
            </div>

            <div className="input-container">
              <AppInput
                label={"Location"}
                name="location"
                value={values.location}
                onChange={handleChange}
              />
              <ErrorMessage name="location" />
            </div>

            <div className="input-container">
              <AppSelect
                label={"Region"}
                name="region"
                value={values.region}
                onChange={handleChange}
                options={regions}
              />
              <ErrorMessage name="region" />
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

export const MondoDetailsViewer = ({
  mondo,
  isOpen,
  onClose,
  isTop = false,
  token,
}) => {
  const dispatch = useDispatch();
  const { textColor } = useSelector((state) => state.theme);
  const { isLoading } = useSelector((state) => state.mondomarket);
  const { user } = useSelector((state) => state.user);

  const [offerModal, setOfferModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [alertSetteled, setAlertSetteled] = useState(false);

  const handleBookmarkItem = async () => {
    try {
      const payload = {
        item_id: mondo?.id,
        user_id: user?.id,
      };

      const { statusCode, message } = await dispatch(
        bookMarkItem({
          token,
          payload,
        })
      ).unwrap();

      if (statusCode === 201) {
        Toast("success", message);
      }
    } catch (error) {
      await handleRemoveBookmarkItem();
    }
  };

  const handleRemoveBookmarkItem = async () => {
    try {
      const payload = {
        item_id: mondo?.id,
        user_id: user?.id,
      };

      const { statusCode, message } = await dispatch(
        removeBookMarkItem({
          token,
          payload,
        })
      ).unwrap();

      if (statusCode === 201) {
        Toast("success", message);
      }
    } catch (error) {
      Toast("error", error?.message || "Error during bookmarking");
      console.error(error);
    }
  };

  const handleSendOffer = async () => {
    if (!amount) {
      Toast("error", "Please enter an amount");
      return;
    }
    try {
      const payload = {
        item_id: mondo?.id,
        price: amount,
        sender_id: user?.id,
      };

      const { statusCode, message } = await dispatch(
        sendOffer({ token, payload })
      ).unwrap();

      if (statusCode === 201) {
        Toast("success", message);
        setOfferModal(false);
        setAmount("");
      }
    } catch (error) {
      Toast("error", error?.message);
      console.error(error);
    }
  };

  const handleToggleAlert = async () => {
    try {
      const payload = {
        user_id: user?.id,
        category_id: mondo?.item_category,
      };

      const { statusCode, message } = await dispatch(
        toggleAlert({ token, payload })
      ).unwrap();

      if (statusCode === 201) {
        Toast("success", message);
        checkAlertStatus();
      }
    } catch (error) {
      Toast("error", error?.message);
      console.error(error);
    }
  };

  const checkAlertStatus = async () => {
    const payload = {
      user_id: user?.id,
      category_id: mondo?.item_category,
    };

    const { alert } = await dispatch(checkAlert({ token, payload })).unwrap();

    if (alert) {
      setAlertSetteled(true);
    } else {
      setAlertSetteled(false);
    }
  };

  useEffect(() => {
    checkAlertStatus();
  }, []);

  return (
    <>
      <Modal title={"View Images"} isOpen={isOpen} onClose={onClose} size="lg">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={2000}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, A11y, Autoplay, Pagination]}
          className="h-[75vh] w-full"
        >
          {mondo?.images?.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image?.image}
                alt={"Mondo Image"}
                className="h-full w-full object-contain"
                style={{
                  imageRendering: "-webkit-optimize-contrast",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Action Buttons  */}

        <div className="flex flex-col gap-5 px-2 py-5">
          <div>
            <h1 className="text-3xl text-dark_bg_5 dark:text-dark_text_1 font-bold">
              {mondo?.title}
            </h1>
            <p className="text-gray-500 text-sm dark:text-dark_text_1 mt-1">
              {mondo?.item_category_name}
            </p>
            <p className={`text-lg font-semibold ${textColor} mt-3`}>
              ${mondo?.price}
            </p>
            {mondo?.location && (
              <p className="flex text-gray-500 dark:text-dark_text_1 gap-3 items-center mt-2">
                <FaLocationDot className={`${textColor}`} size={20} />{" "}
                {mondo?.location}
              </p>
            )}
            <p className="text-gray-700 dark:text-dark_text_1 mt-4">
              {mondo?.description}
            </p>
          </div>

          <ProfileCard image={mondo?.userimage} title={mondo?.username} />

          <div className="flex justify-center cursor-pointer gap-10 items-center mb-5 mt-8">
            <div
              className="flex flex-col justify-center items-center"
              onClick={() => setOfferModal(true)}
            >
              <MdLocalOffer size={30} className={`${textColor}`} />
              <div>Send Offer</div>
            </div>
            <div
              className="flex flex-col justify-center items-center"
              onClick={isLoading ? null : handleToggleAlert}
            >
              {alertSetteled ? (
                <MdNotificationsActive size={30} className={`${textColor}`} />
              ) : (
                <MdNotifications size={30} className={`${textColor}`} />
              )}
              <div>{alertSetteled ? "Remove Alert" : "Set Alert"}</div>
            </div>

            <div
              className="flex flex-col justify-center items-center"
              onClick={handleBookmarkItem}
            >
              <MdBookmark size={30} className={`${textColor}`} />
              <div>Book Mark</div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Offer Modal  */}
      <Modal
        title="Your Offer"
        isOpen={offerModal}
        onClose={() => {
          setOfferModal(false);
          setAmount("");
        }}
      >
        <div className="flex gap-5 items-center mb-10">
          <img
            src={mondo?.images[0]?.image}
            alt="img"
            className="h-28 rounded w-28 overflow-hidden"
            style={{
              imageRendering: "-webkit-optimize-contrast",
            }}
          />
          <div>
            <p className="text-dark_bg_5 text-lg dark:text-dark_text_1 font-semibold">
              {mondo?.title}
            </p>
            <p className={`text-base ${textColor}`}>
              listed price: ${mondo?.price}
            </p>
          </div>
        </div>

        <AppInput
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="float-end mt-5">
          <Button
            title="Send"
            onClick={isLoading ? null : handleSendOffer}
            spinner={isLoading ? <Spinner size="sm" /> : null}
          />
        </div>
      </Modal>
    </>
  );
};
