import React, { useRef, useState } from "react";
import AppInput from "../../../components/form/AppInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../../components/form/Button";
import logo from "../../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../../components/form/Form";
import * as Yup from "yup";
import ErrorMessage from "../../../components/form/ErrorMessage";
import { Toast } from "../../../components/theme/Toast";
import { Spinner } from "../../../components/theme/Loader";
import { Link } from "react-router-dom";
import { loginUser } from "../../../app/features/auth";
import { useTranslation } from "react-i18next";
const Login = () => {
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
  const dispatch = useDispatch();
  const { textColor } = useSelector((state) => state.theme);
  const { isLoading } = useSelector((state) => state.auth);
  const [isPassword, setIsPassword] = useState(true);
  const { t, i18n } = useTranslation();
  const handleLogin = async (data, { resetForm }) => {
    try {
      const { statusCode } = await dispatch(loginUser(data)).unwrap();
      if (statusCode === 200) {
        resetForm();
        Toast("success", "Login Successfully");
      }
    } catch (error) {
      Toast("error", error?.message || "Error during login");
      console.log(error);
    }
  };

  return (
    <div className="grid-2">
      <div className="logo-container">
        <div>
          {/* <div className="flex justify-start items-center gap-2">
            <img
              style={{ imageRendering: "-webkit-optimize-contrast" }}
              src={logo}
              alt=""
              className="w-50 h-auto"
            />
          </div> */}
          <div className="h-[70vh] flex justify-center items-center">
            <img
              style={{ imageRendering: "-webkit-optimize-contrast" }}
              src={logo}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
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
          password: "",
          role: "user",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Inavalid email address")
            .required("Email is Required"),
          password: Yup.string().required("Password is Required"),
        })}
        onSubmit={handleLogin}
      >
        {({ handleSubmit, values, handleChange }) => (
          <div className="form-container">
            <h1 className="logo-text">{t("welcome-wotcha")}</h1>

            <div className="input-container">
              <AppInput
                type="email"
                label={t("email")}
                placeholder="jhon@example.com"
                name="email"
                value={values.email}
                onChange={handleChange}
              />

              <ErrorMessage name={"email"} />
            </div>

            <div className="input-container">
              <AppInput
                type={`${isPassword ? "password" : "text"}`}
                label={t("password")}
                placeholder={`********`}
                icon={isPassword ? FaEye : FaEyeSlash}
                onIconClick={() => setIsPassword((prev) => !prev)}
                name="password"
                value={values.password}
                onChange={handleChange}
              />

              <ErrorMessage name={"password"} />
            </div>

            <Link
              to={"/forgot-password"}
              className={`forget-pass ${textColor}`}
            >
              {t("forgot")}
            </Link>

            <Button
              title={t("signin")}
              width={true}
              onClick={isLoading ? null : handleSubmit}
              spinner={isLoading ? <Spinner size="sm" /> : null}
            />

            <Link
              to={"/sign-up"}
              className={`mt-2 text-light_text_1 dark:text-dark_text_1 `}
            >
              {t("donthave")}{" "}
              <span className="text-blue-500 underline">{t("signup")}</span>
            </Link>
          </div>
        )}
      </Form>
    </div>
  );
};

export default Login;
