import React from "react";

export const Spinner = ({ size = "md", className }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  return (
    <div className={`flex justify-center items-center ${className} dark:bg-dark_bg_4 bg-white`}>
      <div
        className={`animate-spin ${sizeClasses[size]} border-4 border-t-transparent dark:border-t-dark_bg_4  rounded-full dark:border-dark_text_1 border-dark_bg_4 `}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
