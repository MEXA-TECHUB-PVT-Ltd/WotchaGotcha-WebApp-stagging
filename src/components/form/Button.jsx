import React from "react";
import { useSelector } from "react-redux";

const Button = ({
  onClick,
  icon: BtnIcon,
  lastIcon: LastIcon,
  title,
  width = false,
  spinner = null,
  bgColor
}) => {
  const theme = useSelector((state) => state.theme);

  const bg_color = bgColor ? bgColor : theme?.bgColor;



  return (
    <button
      type="submit"
      onClick={onClick}
      className={`px-4 py-1 ${bg_color} ${
        width && "w-full py-2"
      } rounded text-white cursor-pointer flex-center gap-2`}
    >
      {spinner && spinner}

      {BtnIcon && <BtnIcon className="text-white size-4" />}
      {title && (
        <h1
          className={`text-white md:text-sm text-xs font-[700] tracking-widest`}
        >
          {title}
        </h1>
      )}
      {LastIcon && <LastIcon className="text-white size-4" />}
    </button>
  );
};

export default Button;
