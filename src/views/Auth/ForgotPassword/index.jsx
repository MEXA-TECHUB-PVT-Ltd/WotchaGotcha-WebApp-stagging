import React from "react";
import AppInput from "../../../components/form/AppInput";

import AuthCard from "../../../components/card/AuthCard";
import Form from "../../../components/form/Form";

import * as Yup from "yup";
import ErrorMessage from "../../../components/form/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "../../../components/theme/Toast";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../app/features/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const handleSendCode = async (data, { resetForm }) => {
    data.role = "user";
    try {
      const { statusCode, message, userEmailExistResult } = await dispatch(
        forgotPassword(data)
      ).unwrap();
      if (statusCode === 200) {
        resetForm();
        Toast("success", message);
        setTimeout(() => {
          navigate("/verify-email", {
            state: {
              email: userEmailExistResult?.email,
            },
          });
        }, 2000);
      }
    } catch (error) {
      Toast("error", error?.message);
      console.log(error);
    }
  };

  return (
    <Form
      initialValues={{
        email: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email("Invalid email address").required("Email is Required"),
      })}
      onSubmit={handleSendCode}
    >
      {({ values, handleChange, handleSubmit }) => (
        <AuthCard
          title={"Forgot Password"}
          description={"Please enter the email address associated with your account below."}
          btnTitle={"Send Code"}
          onBtnPress={handleSubmit}
          isLoading={isLoading}
        >
          <AppInput
            label={"Email"}
            placeholder={"jhon@example.com"}
            type="email"
            name={"email"}
            onChange={handleChange("email")}
            value={values["email"]}
          />

          <ErrorMessage name={"email"} />
        </AuthCard>
      )}
    </Form>
  );
};

export default ForgotPassword;
