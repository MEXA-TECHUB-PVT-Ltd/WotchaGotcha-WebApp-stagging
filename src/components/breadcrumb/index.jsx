import React from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 my-2">
      <Link to="/" className="hover:underline text-blue-600 dark:text-blue-400">
        <FaHome size={25} />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {<FaChevronRight className="w-4 h-4 mx-1 text-gray-400" />}
          {item?.href ? (
            <Link to={item.href} className="hover:underline text-blue-600 dark:text-blue-400">
              {item?.label}
            </Link>
          ) : (
            <span className="text-dark_bg_5 dark:text-dark_text_1 font-medium">{item?.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
