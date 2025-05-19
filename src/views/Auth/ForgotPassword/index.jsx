import React, { useRef, useState } from "react";
import AppInput from "../../../components/form/AppInput";

import AuthCard from "../../../components/card/AuthCard";
import Form from "../../../components/form/Form";

import * as Yup from "yup";
import ErrorMessage from "../../../components/form/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "../../../components/theme/Toast";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../app/features/auth";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const laguage = localStorage.getItem("i18nextLng");
  const [language, setLanguage] = useState(
    laguage == "en" ? "English" : "French"
  );
  const [isLangOpen, setIsLangOpen] = useState(false);
  const languages = [
    { name: "English", code: "en", flag: "https://flagcdn.com/w40/gb.png" },
    { name: "French", code: "fr", flag: "https://flagcdn.com/w40/fr.png" },
  ];
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const { t, i18n } = useTranslation();
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
          email: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is Required"),
        })}
        onSubmit={handleSendCode}
      >
        {({ values, handleChange, handleSubmit }) => (
          <AuthCard
            title={t("forgothead")}
            description={t("forgotphrag")}
            btnTitle={t("send-code")}
            onBtnPress={handleSubmit}
            isLoading={isLoading}
          >
            <AppInput
              label={t("email")}
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
    </>
  );
};

export default ForgotPassword;
