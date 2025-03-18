import { FaLocationDot } from "react-icons/fa6";
import { MdBookmark, MdLocalOffer, MdNotifications } from "react-icons/md";
import ProfileCard from "../../components/card/ProfileCard";
import { useDispatch, useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Modal from "../../components/modal/Modal";
import { Toast } from "../../components/theme/Toast";
import {
  bookMarkItem,
  removeBookMarkItem,
  sendOffer,
} from "../../app/features/mondomarket";
import { useState } from "react";
import AppInput from "../../components/form/AppInput";
import Button from "../../components/form/Button";
import { Spinner } from "../../components/theme/Loader";

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

  const [offerModal, setOfferModal] = useState(false);
  const [amount, setAmount] = useState("");

  const handleBookmarkItem = async () => {
    try {
      const payload = {
        item_id: mondo?.id,
        user_id: mondo?.user_id,
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
        user_id: mondo?.user_id,
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
        sender_id: mondo?.user_id,
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
          className="w-full h-[75vh]"
        >
          {mondo?.images?.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image?.image}
                alt={"Mondo Image"}
                className="w-full h-auto"
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
            <h1 className="text-3xl font-bold text-gray-900">{mondo?.title}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {mondo?.item_category_name}
            </p>
            <p className={`text-lg font-semibold ${textColor} mt-3`}>
              ${mondo?.price}
            </p>
            {mondo?.location && (
              <p className="text-gray-500 mt-2 flex items-center gap-3">
                <FaLocationDot className={`${textColor}`} size={20} />{" "}
                {mondo?.location}
              </p>
            )}
            <p className="text-gray-700 mt-4">{mondo?.description}</p>
          </div>

          <ProfileCard image={mondo?.userimage} title={mondo?.username} />

          <div className="flex items-center justify-center gap-10 mb-5 mt-8 cursor-pointer">
            <div
              className="flex flex-col justify-center items-center"
              onClick={() => setOfferModal(true)}
            >
              <MdLocalOffer size={30} className={`${textColor}`} />
              <div>Send Offer</div>
            </div>
            <div
              className="flex flex-col justify-center items-center"
              onClick={() =>
                Toast("success", "You will get notified to the relevant feed")
              }
            >
              <MdNotifications size={30} className={`${textColor}`} />
              <div>Alert</div>
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
            className="w-28 h-28 rounded overflow-hidden"
            style={{
              imageRendering: "-webkit-optimize-contrast",
            }}
          />
          <div>
            <p className="text-lg font-semibold text-gray-700">
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
