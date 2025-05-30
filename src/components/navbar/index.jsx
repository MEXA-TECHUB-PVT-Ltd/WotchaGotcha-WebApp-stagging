import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setThemeColor,
  toggleSideBar,
  toggleTheme,
} from "../../app/features/theme";
import { FaBars, FaEye, FaEyeSlash, FaRegMoon } from "react-icons/fa";
import { MdOutlineLightMode } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import Modal from "../modal/Modal";
import ColorCard from "../theme/ColorCard";
import { useNavigate } from "react-router-dom";
import AppInput from "../form/AppInput";
import ErrorMessage from "../form/ErrorMessage";
import * as Yup from "yup";
import Form from "../form/Form";
import { Spinner } from "../theme/Loader";
import { Toast } from "../theme/Toast";
import Button from "../form/Button";
import { logoutUser } from "../../app/features/auth";
import { colors } from "../../configs/colors";
import { useTranslation } from "react-i18next";
import { DeleteVideoMania } from "../../services/videomania";
import DeleteAccountModal from "../../services/users/DeleteAccountModal";
const Navbar = () => {
  //** States */
  const laguage = localStorage.getItem("i18nextLng");
  const [showSetting, setShowSetting] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [isActiveDropDown, setIsActiveDropDown] = useState(false);
  const [isOldPassword, setIsOldPassword] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const [language, setLanguage] = useState(
    laguage == "en" ? "English" : "French"
  );
  const [isLangOpen, setIsLangOpen] = useState(false);
  const languages = [
    { name: "English", code: "en", flag: "https://flagcdn.com/w40/gb.png" },
    { name: "French", code: "fr", flag: "https://flagcdn.com/w40/fr.png" },
  ];

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  //** Redux */
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const { user, isLoading } = useSelector((state) => state.user);
  //** Methods */

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleThemeColor = (color) => {
    dispatch(setThemeColor(color));
  };

  const handleToggleDropDown = () => {
    setIsActiveDropDown((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsActiveDropDown(false);
      setIsLangOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleChangePassword = async (data, { resetForm }) => {
    // try {
    //   const { success, message } = await dispatch(
    //     updatePassword(data)
    //   ).unwrap();
    //   if (success) {
    //     setPasswordModal(false);
    //     Toast("success", message);
    //     resetForm();
    //   }
    // } catch (error) {
    //   console.log(error);
    //   Toast("error", error.message);
    // }
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSideBar());
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password cannot exceed 20 characters")
      .matches(/[a-zA-Z]/, "Password must contain at least one letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[\W_]/, "Password must contain at least one special character"),
    confirmNewPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  //** Main  */
  return (
    <div className="navbar">
      <div className="flex-center gap-2">
        <FaBars
          size={20}
          className={`${!theme.isSideBarOpen ? "block" : "hidden"} `}
          onClick={handleToggleSidebar}
        />
        {theme.mode === "light" ? (
          <FaRegMoon
            onClick={handleToggleTheme}
            className="text-light_text_1"
            size={20}
          />
        ) : (
          <MdOutlineLightMode
            onClick={handleToggleTheme}
            color="white"
            size={20}
          />
        )}
      </div>
      <div className="flex-center gap-2 relative">
        <div className="relative w-32 ml-2" ref={dropdownRef}>
          <div
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 border px-2  py-1 rounded-md cursor-pointer  bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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
            <div className="absolute top-full left-0 mt-1 w-32 shadow-md rounded-md z-50 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  onClick={() => {
                    setLanguage(lang.name);
                    i18n.changeLanguage(lang.code);
                    setIsLangOpen(false);
                  }}
                  className={`flex items-center gap-2 px-2 py-1 cursor-pointer
          hover:bg-gray-100 dark:hover:bg-gray-700
          ${language === lang.name ? "bg-gray-200 dark:bg-gray-600" : ""}`}
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

        <CiSettings
          size={30}
          className="hover:opacity-60"
          onClick={() => setShowSetting(true)}
        />
        <div
          className="flex-center gap-2"
          onClick={() => setIsActiveDropDown((prev) => !prev)}
        >
          <div className={`avatar ${theme.bgColor} overflow-hidden`}>
            {user?.image ? (
              <img src={user?.image} className="w-full h-full object-cover" />
            ) : (
              user?.username?.charAt(0)?.toUpperCase()
            )}
          </div>
          <h1 className="avatar-text">
            {user?.username?.length > 10
              ? `${user?.username?.slice(0, 10)}...`
              : user?.username}
            {/* {t("welcome")} */}
          </h1>
        </div>
        {/* // ------------------------------------------- Dropdown Menu -------------------------------------------------------------- */}
        {isActiveDropDown && (
          <div className="dropdown-menu" ref={dropdownRef}>
            <p
              className="dropdown-item"
              onClick={() => {
                navigate("/profile");
                handleToggleDropDown();
              }}
            >
              {t("profile")}
            </p>
            <p
              className="dropdown-item"
              onClick={() => {
                setPasswordModal(true);
                handleToggleDropDown();
              }}
            >
              {t("changePassword")}
            </p>
            <p
              className="dropdown-item"
              onClick={() => setDeleteAccountModal(true)}
            >
              {t("deleteAccount")}
            </p>
            <p className="dropdown-item" onClick={handleLogout}>
              {t("logout")}
            </p>
          </div>
        )}
      </div>

      {/* //** Modals  */}

      <Modal
        isOpen={showSetting}
        onClose={() => setShowSetting(false)}
        title={t("settings")}
      >
        <h1 className="sub-heading">{t("themeColors")}</h1>
        <div className="theme-color">
          {colors.map((color, i) => (
            <ColorCard
              key={i}
              color={color.color}
              onClick={() => handleThemeColor(color.value)}
            />
          ))}
        </div>
      </Modal>

      <Modal
        isOpen={deleteAccountModal}
        onClose={() => {
          setDeleteAccountModal(false);
          // setCurrentVideo(null);
        }}
        title="Delete Confirmation"
      >
        <DeleteAccountModal
          deleteAccountModal={deleteAccountModal}
          setDeleteAccountModal={setDeleteAccountModal}
        />
      </Modal>

      <Modal
        isOpen={passwordModal}
        onClose={() => setPasswordModal(false)}
        title={t("changePassword")}
      >
        <Form
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleChangePassword}
        >
          {({ values, handleChange, handleSubmit }) => (
            <div className="flex flex-col gap-5">
              <div>
                <AppInput
                  type={`${isOldPassword ? "password" : "text"}`}
                  label={t("oldPassword")}
                  placeholder={`********`}
                  icon={isOldPassword ? FaEye : FaEyeSlash}
                  onIconClick={() => setIsOldPassword((prev) => !prev)}
                  name={"oldPassword"}
                  onChange={handleChange("oldPassword")}
                  value={values["oldPassword"]}
                />
                <ErrorMessage name={"oldPassword"} />
              </div>
              <div>
                <AppInput
                  type={`${isPassword ? "password" : "text"}`}
                  label={t("newPassword")}
                  placeholder={`********`}
                  icon={isPassword ? FaEye : FaEyeSlash}
                  onIconClick={() => setIsPassword((prev) => !prev)}
                  name={"newPassword"}
                  onChange={handleChange("newPassword")}
                  value={values["newPassword"]}
                />

                <ErrorMessage name={"newPassword"} />
              </div>

              <div>
                <AppInput
                  label={t("confirmNewPassword")}
                  placeholder={`********`}
                  icon={isConfirmPassword ? FaEye : FaEyeSlash}
                  onIconClick={() => setIsConfirmPassword((prev) => !prev)}
                  type={`${isConfirmPassword ? "password" : "text"}`}
                  name={"confirmNewPassword"}
                  onChange={handleChange("confirmNewPassword")}
                  value={values["confirmNewPassword"]}
                />

                <ErrorMessage name={"confirmNewPassword"} />
              </div>

              <div className="flex-end">
                <Button
                  title={t("update")}
                  onClick={isLoading ? null : handleSubmit}
                  spinner={isLoading ? <Spinner size="sm" /> : null}
                />
              </div>
            </div>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default Navbar;
