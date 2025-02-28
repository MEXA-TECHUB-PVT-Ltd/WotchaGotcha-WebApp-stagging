import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeColor, toggleSideBar, toggleTheme } from "../../app/features/theme";
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

const Navbar = () => {
  //** States */
  const [showSetting, setShowSetting] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [isActiveDropDown, setIsActiveDropDown] = useState(false);
  const [isOldPassword, setIsOldPassword] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  //** Redux */
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const isLoading = false;
  // const { isLoading } = useSelector((state) => state.user);
  // const { user } = useSelector((state) => state.auth);

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
          <FaRegMoon onClick={handleToggleTheme} className="text-light_text_1" size={20} />
        ) : (
          <MdOutlineLightMode onClick={handleToggleTheme} color="white" size={20} />
        )}
      </div>
      <div className="flex-center gap-2 relative">
        <CiSettings size={23} className="hover:opacity-60" onClick={() => setShowSetting(true)} />
        <div className="flex-center gap-2" onClick={() => setIsActiveDropDown((prev) => !prev)}>
          <div className={`avatar ${theme.bgColor}`}>A</div>
          <h1 className="avatar-text">Admin</h1>
        </div>

        {/* // ------------------------------------------- Dropdown Menu -------------------------------------------------------------- */}

        {isActiveDropDown && (
          <div className="dropdown-menu" ref={dropdownRef}>
            <p
              className="dropdown-item"
              onClick={() => {
                setPasswordModal(true);
                handleToggleDropDown();
              }}
            >
              Change Password
            </p>
            <p className="dropdown-item" onClick={handleLogout}>
              Logout
            </p>
          </div>
        )}
      </div>

      {/* //** Modals  */}

      <Modal isOpen={showSetting} onClose={() => setShowSetting(false)} title="Settings">
        <h1 className="sub-heading">Theme Color</h1>
        <div className="theme-color">
          <ColorCard color={"bg-yellow-500"} onClick={() => handleThemeColor("yellow-500")} />
          <ColorCard color={"bg-blue-500"} onClick={() => handleThemeColor("blue-500")} />
          <ColorCard color={"bg-green-500"} onClick={() => handleThemeColor("green-500")} />
        </div>
      </Modal>

      <Modal isOpen={passwordModal} onClose={() => setPasswordModal(false)} title="Change Password">
        <Form
          initialValues={{
            // email: user?.email,
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleChangePassword}
        >
          {({ values, handleChange, handleSubmit }) => (
            <div className="flex flex-col gap-5">
              <AppInput
                type={`${isOldPassword ? "password" : "text"}`}
                label={"Old Password"}
                placeholder={`********`}
                icon={isOldPassword ? FaEye : FaEyeSlash}
                onIconClick={() => setIsOldPassword((prev) => !prev)}
                name={"oldPassword"}
                onChange={handleChange("oldPassword")}
                value={values["oldPassword"]}
              />

              <ErrorMessage name={"oldPassword"} />
              <AppInput
                type={`${isPassword ? "password" : "text"}`}
                label={"New Password"}
                placeholder={`********`}
                icon={isPassword ? FaEye : FaEyeSlash}
                onIconClick={() => setIsPassword((prev) => !prev)}
                name={"newPassword"}
                onChange={handleChange("newPassword")}
                value={values["newPassword"]}
              />

              <ErrorMessage name={"newPassword"} />

              <AppInput
                label={"Confirm New Password"}
                placeholder={`********`}
                icon={isConfirmPassword ? FaEye : FaEyeSlash}
                onIconClick={() => setIsConfirmPassword((prev) => !prev)}
                type={`${isConfirmPassword ? "password" : "text"}`}
                name={"confirmNewPassword"}
                onChange={handleChange("confirmNewPassword")}
                value={values["confirmNewPassword"]}
              />

              <ErrorMessage name={"confirmNewPassword"} />

              <div className="flex-end">
                <Button
                  title={"Update"}
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
