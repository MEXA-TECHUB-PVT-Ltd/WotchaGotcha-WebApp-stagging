import React from "react";
import { useSelector } from "react-redux";

const AppSelect = ({
  label,
  value,
  name,
  onChange,
  options = [],
  styles,
  icon: BtnIcon,
  onIconClick,
  ...otherProps
}) => {
  const theme = useSelector((state) => state.theme);

  return (
    <div className="text-light_text_1 dark:text-dark_text_1 w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-normal text-light_text_1 dark:text-dark_text_1 mb-1 tracking-wide"
        >
          {label}
        </label>
      )}
      <div
        className={`flex items-center border rounded-md overflow-hidden focus-within:${theme.borderColor}`}
      >
        <select
          name={name}
          value={value}
          onChange={onChange}
          {...otherProps}
          className={`app-select w-full px-4 py-2 bg-light_background dark:bg-dark_background border-none outline-none text-light_text_1 dark:text-dark_text_1 ${styles}`}
        >
          {/* Placeholder or default option */}
          <option value="" disabled>
            Select an option
          </option>
          {/* Dynamically render options */}
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AppSelect;
