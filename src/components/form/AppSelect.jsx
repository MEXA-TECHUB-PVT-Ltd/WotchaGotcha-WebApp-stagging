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
    <div className="text-light_text_1 w-full dark:text-dark_text_1">
      {label && (
        <label
          htmlFor={name}
          className="text-light_text_1 text-sm block dark:text-dark_text_1 font-normal mb-1 tracking-wide"
        >
          {label}
        </label>
      )}
      <div
        className={`flex items-center pr-3 border rounded-md overflow-hidden focus-within:${theme.borderColor}`}
      >
        <select
          name={name}
          value={value}
          onChange={onChange}
          {...otherProps}
          className={`app-select ${styles}`}
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
