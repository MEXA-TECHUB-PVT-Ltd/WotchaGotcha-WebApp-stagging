import React, { useState } from "react";
import AppInput from "../../../components/form/AppInput";

import AuthCard from "../../../components/card/AuthCard";
import Form from "../../../components/form/Form";

import * as Yup from "yup";
import ErrorMessage from "../../../components/form/ErrorMessage";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "../../../components/theme/Toast";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../app/features/auth";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const location = useLocation();

  const state = location?.state;

  const [isPassword, setIsPassword] = useState(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);

  const handleResetPassword = async (data, { resetForm }) => {
    try {
      const { statusCode, message } = await dispatch(
        resetPassword({
          id: state?.userId,
          password: data.password,
          confirmPassword: data.confirmPassword,
        })
      ).unwrap();
      if (statusCode === 200) {
        Toast("success", message);
        resetForm();
        setTimeout(() => {
          navigate("/", {
            replace: true,
          });
        });
      }
    } catch (error) {
      console.error(error);
      Toast("error", error?.message);
    }
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password cannot exceed 20 characters")
      .matches(/[a-zA-Z]/, "Password must contain at least one letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[\W_]/, "Password must contain at least one special character"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <Form
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleResetPassword}
    >
      {({ values, handleChange, handleSubmit }) => (
        <AuthCard
          title={"Reset Password"}
          description={
            "Enter your new password below. This will be the password you use to log in."
          }
          btnTitle={"Update"}
          onBtnPress={handleSubmit}
          isLoading={isLoading}
        >
          <AppInput
            type={`${isPassword ? "password" : "text"}`}
            label={"Password"}
            placeholder={`********`}
            icon={isPassword ? FaEye : FaEyeSlash}
            onIconClick={() => setIsPassword((prev) => !prev)}
            name={"password"}
            onChange={handleChange("password")}
            value={values["password"]}
          />

          <ErrorMessage name={"password"} />

          <AppInput
            label={"Confirm Password"}
            placeholder={`********`}
            icon={isConfirmPassword ? FaEye : FaEyeSlash}
            onIconClick={() => setIsConfirmPassword((prev) => !prev)}
            type={`${isConfirmPassword ? "password" : "text"}`}
            name={"confirmPassword"}
            onChange={handleChange("confirmPassword")}
            value={values["confirmPassword"]}
          />

          <ErrorMessage name={"confirmPassword"} />
        </AuthCard>
      )}
    </Form>
  );
};

export default ResetPassword;
