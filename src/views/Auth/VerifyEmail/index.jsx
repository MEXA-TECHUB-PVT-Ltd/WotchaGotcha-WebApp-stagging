import React, { useEffect, useRef, useState } from "react";
import Form from "../../../components/form/Form";
import AuthCard from "../../../components/card/AuthCard";
import AppInput from "../../../components/form/AppInput";

import * as Yup from "yup";
import { Toast } from "../../../components/theme/Toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../../app/features/auth";
import { useTranslation } from "react-i18next";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  const laguage = localStorage.getItem("i18nextLng");
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(
    laguage == "en" ? "English" : "French"
  );
  const [isLangOpen, setIsLangOpen] = useState(false);
  const languages = [
    { name: "English", code: "en", flag: "https://flagcdn.com/w40/gb.png" },
    { name: "French", code: "fr", flag: "https://flagcdn.com/w40/fr.png" },
  ];
  const dropdownRef = useRef(null);

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
    <>
      <div className="fixed top-5 right-5 w-32 ml-2" ref={dropdownRef}>
        <div
          onClick={() => setIsLangOpen(!isLangOpen)}
          className="flex items-center gap-2 border px-2  py-1 rounded-md cursor-pointer bg-white"
        >
          <img
            src={languages.find((l) => l.name === language)?.flag}
            alt="flag"
            className="w-5 h-5"
          />
          <span>{language}</span>
          <span className="ml-1">&#9662;</span> {/* down arrow */}
        </div>

        {isLangOpen && (
          <div className="absolute top-full left-0 mt-1 w-32 bg-white shadow-md rounded-md z-50">
            {languages.map((lang) => (
              <div
                key={lang.name}
                onClick={() => {
                  setLanguage(lang.name);
                  i18n.changeLanguage(lang.code);
                  setIsLangOpen(false);
                }}
                className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer ${
                  language === lang.name ? "bg-gray-200" : ""
                }`}
              >
                <img
                  src={lang.flag}
                  alt={`${lang.name} flag`}
                  className="w-5 h-5"
                />
                <span>{lang.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <Form
        initialValues={{
          otp: ["", "", "", ""],
        }}
        validationSchema={Yup.object().shape({
          otp: Yup.array()
            .of(Yup.string().length(1, t("otp_length")).required(t("required")))
            .required(t("OTPisrequired")),
        })}
        onSubmit={handleVerifyOtp}
      >
        {({ values, handleChange, handleSubmit }) => (
          <AuthCard
            title={"Verify Email"}
            description={t("otp")}
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
                  onChange={(e) =>
                    handleCodeChange(index, e.target.value, handleChange)
                  }
                  styles={`w-14 h-14 text-center`}
                  maxLength="1"
                />
              ))}
            </div>
          </AuthCard>
        )}
      </Form>
    </>
  );
};

export default VerifyEmail;
