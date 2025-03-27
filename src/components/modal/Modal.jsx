import React from "react";
import AppModal from "react-modal";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";

const Modal = ({ title, onClose, isOpen, size = "sm", children }) => {
  const theme = useSelector((state) => state.theme.mode);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor:
        theme === "dark" ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.4)",
      zIndex: 999,
    },
  };

  return (
    <AppModal
      appElement={document.getElementById("root")}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      className={`${
        theme === "dark" && "dark"
      } fixed h-auto max-h-[98vh] w-[95%] ${
        size === "sm"
          ? "md:w-[38%]"
          : size === "md"
          ? "md:w-[60%]"
          : size === "lg"
          ? "md:w-[97%] md:h-[99vh]"
          : "md:w-[38%]"
      }  bg-white dark:bg-dark_bg_4 shadow-sm outline-none rounded p-3 dark:text-dark_text_1 overflow-hidden`}
    >
      <div className="flex-between cursor-pointer">
        <h1 className="text-dark_bg_5 dark:text-dark_text_1 font-semibold">
          {title}
        </h1>
        <p
          onClick={onClose}
          className="float-end text-3xl cursor-pointer dark:text-dark_text_1 hover:opacity-90 hover:text-red-500"
        >
          <IoClose />
        </p>
      </div>
      <div className="flex-1 p-2 max-h-[85vh] mt-8 overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </AppModal>
  );
};

export default Modal;
