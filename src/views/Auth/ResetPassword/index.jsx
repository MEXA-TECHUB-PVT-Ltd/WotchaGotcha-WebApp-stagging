import React, { useRef, useState } from "react";
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
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      .required(t("passwordRequired"))
      .min(8, t("passwordMin"))
      .max(20, t("passwordMax"))
      .matches(/[a-zA-Z]/, t("passwordLetter"))
      .matches(/[0-9]/, t("passwordNumber"))
      .matches(/[\W_]/, t("passwordSpecial")),
    confirmPassword: Yup.string()
      .required(t("confirmPasswordRequired"))
      .oneOf([Yup.ref("password"), null], t("passwordsMustMatch")),
  });

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
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleResetPassword}
      >
        {({ values, handleChange, handleSubmit }) => (
          <AuthCard
            title={t("resetPasswordTitle")}
            description={t("resetPasswordDescription")}
            btnTitle={t("updateButton")}
            onBtnPress={handleSubmit}
            isLoading={isLoading}
          >
            <AppInput
              type={`${isPassword ? "password" : "text"}`}
              label={t("passwordLabel")}
              placeholder={t("passwordPlaceholder")}
              icon={isPassword ? FaEye : FaEyeSlash}
              onIconClick={() => setIsPassword((prev) => !prev)}
              name={"password"}
              onChange={handleChange("password")}
              value={values["password"]}
            />

            <ErrorMessage name={"password"} />

            <AppInput
              label={t("confirmPasswordLabel")}
              placeholder={t("confirmPasswordPlaceholder")}
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
    </>
  );
};

export default ResetPassword;
