import React from "react";
import AppModal from "react-modal";
import { useSelector } from "react-redux";

const Previewer = ({ onClose, isOpen, children }) => {
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
      } fixed w-[100%] h-[100vh] bg-white dark:bg-dark_bg_4 shadow-sm outline-none dark:text-dark_text_1`}
    >
      <div className="flex-1 max-h-[100vh] overflow-auto">{children}</div>
    </AppModal>
  );
};

export default Previewer;
