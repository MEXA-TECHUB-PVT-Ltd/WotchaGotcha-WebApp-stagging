import React, { useEffect } from "react";
import Form from "../../../components/form/Form";
import AuthCard from "../../../components/card/AuthCard";
import AppInput from "../../../components/form/AppInput";

import * as Yup from "yup";
import { Toast } from "../../../components/theme/Toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../../app/features/auth";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  const state = location?.state;

  const handleCodeChange = (index, value, handleChange) => {
    handleChange(`otp[${index}]`)(value);

    // Move focus forward if a digit is entered
    if (value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    // Move focus backward if backspace is pressed and the current input is empty
    if (!value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleVerifyOtp = async (data, { resetForm }) => {
    try {
      const otpDigits = data.otp.join("");
      const { statusCode, message, userId } = await dispatch(
        verifyOtp({
          code: otpDigits,
          email: state?.email,
          role: "user",
        })
      ).unwrap();
      if (statusCode === 200) {
        resetForm();
        Toast("success", message);
        setTimeout(() => {
          navigate("/reset-password", {
            state: { userId: userId },
          });
        }, 2000);
      }
    } catch (error) {
      Toast("error", error?.message);
    }
  };

  useEffect(() => {
    if (!state?.email) {
      navigate("/forgot-password");
    }
  }, [state]);

  return (
    <Form
      initialValues={{
        otp: ["", "", "", ""],
      }}
      validationSchema={Yup.object().shape({
        otp: Yup.array()
          .of(Yup.string().length(1, "Must be exactly 1 digit").required("Required"))
          .required("OTP is required"),
      })}
      onSubmit={handleVerifyOtp}
    >
      {({ values, handleChange, handleSubmit }) => (
        <AuthCard
          title={"Verify Email"}
          description={"Enter the OTP below that we have sent to your email"}
          btnTitle={"Verify"}
          onBtnPress={handleSubmit}
          isLoading={isLoading}
        >
          <div className="flex-center gap-5">
            {values.otp.map((input, index) => (
              <AppInput
                key={index}
                id={`otp-input-${index}`}
                type="text"
                name={`otp[${index}]`}
                value={values["otp"][index]}
                onChange={(e) => handleCodeChange(index, e.target.value, handleChange)}
                styles={`w-14 h-14 text-center`}
                maxLength="1"
              />
            ))}
          </div>
        </AuthCard>
      )}
    </Form>
  );
};

export default VerifyEmail;
