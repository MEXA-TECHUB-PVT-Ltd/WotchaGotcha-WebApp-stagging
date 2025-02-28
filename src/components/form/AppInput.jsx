import React from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/common/formateDateTime";

const AppInput = ({
  label,
  value,
  name,
  onChange,
  type = "text",
  icon: BtnIcon,
  onIconClick,
  styles,
  ...otherProps
}) => {
  const theme = useSelector((state) => state.theme);

  return (
    <div className="text-light_text_1 dark:text-dark_text_1 w-full">
      {label && (
        <label
          htmlFor={label}
          className="flex-between text-sm font-normal text-light_text_1 dark:text-dark_text_1 mb-1 tracking-wide"
        >
          {label}
          {type === "date" && value && <p>{formatDate(value)}</p>}{" "}
        </label>
      )}
      <div
        className={`flex items-center border rounded-md overflow-hidden focus-within:${theme.borderColor}`}
      >
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          {...otherProps}
          className={`app-input ${styles}`}
        />
        {BtnIcon && (
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 text-white border-none outline-none "
            onClick={onIconClick}
          >
            <BtnIcon className="text-lg text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AppInput;
