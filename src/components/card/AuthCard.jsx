import React from "react";
import Button from "../form/Button";
import { Spinner } from "../theme/Loader";

const AuthCard = ({
  title,
  description,
  children,
  btnTitle,
  onBtnPress,
  isLoading,
}) => {
  return (
    <div className="auth-card">
      <div className={`auth-body`}>
        <h1 className={`auth-text`}>{title}</h1>
        <p className={`info-text`}>{description}</p>

        {children}

        <Button
          title={btnTitle}
          onClick={isLoading ? null : onBtnPress}
          spinner={isLoading ? <Spinner size="sm" /> : null}
        />
      </div>
    </div>
  );
};

export default AuthCard;
