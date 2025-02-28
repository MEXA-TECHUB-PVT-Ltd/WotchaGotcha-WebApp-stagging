import React from "react";
import { useSelector } from "react-redux";

const AppTextArea = ({
  label,
  value,
  name,
  onChange,
  rows = 5,
  styles,
  ...otherProps
}) => {
  const theme = useSelector((state) => state.theme);

  return (
    <div className="text-light_text_1 dark:text-dark_text_1 w-full">
      {label && (
        <label
          htmlFor={label}
          className="block text-sm font-normal text-light_text_1 dark:text-dark_text_1 mb-1 tracking-wide"
        >
          {label}
        </label>
      )}
      <div
        className={`flex items-start border rounded-md overflow-hidden focus-within:${theme.borderColor}`}
      >
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          {...otherProps}
          className={`app-textarea ${styles}`}
        />
      </div>
    </div>
  );
};

export default AppTextArea;
