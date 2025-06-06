import React from "react";
import routes from "../../navigation/vertical";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const SidebarLayout = () => {
  const theme = useSelector((state) => state.theme);

  const location = useLocation();
  const { t } = useTranslation();
  return (
    <div className="max-h-[90vh] overflow-y-auto pb-5 pr-1">
      {routes.map((item, i) => {
        const isActive = location.pathname === item.path;

        return (
          <div
            className={`link-container ${
              isActive && `${theme.bgColor} text-white drop-shadow-md`
            } `}
            key={i}
          >
            <Link to={item.path} className="links">
              <p>{item.icon}</p>
              <h1 className="text-sm">{t(item.id)}</h1>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SidebarLayout;
