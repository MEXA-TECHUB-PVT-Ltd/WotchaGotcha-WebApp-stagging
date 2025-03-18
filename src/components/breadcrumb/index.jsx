import React from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items = [] }) => {
  const { textColor } = useSelector((state) => state.theme);
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 my-2">
      <Link to="/" className={`${textColor}`}>
        <FaHome size={28} />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {<FaChevronRight className="w-auto h-4 mx-1 text-gray-400" />}
          {item?.href ? (
            <Link to={item.href} className={`hover:underline ${textColor}`}>
              {item?.label}
            </Link>
          ) : (
            <span className="text-dark_bg_5 dark:text-dark_text_1 font-medium text-lg">
              {item?.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
