import React, { useState } from "react";
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
import { registerUser } from "../../../app/features/auth";

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const [isPassword, setIsPassword] = useState(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);

  const handleSignUP = async (data, { resetForm }) => {
    try {
      const { statusCode } = await dispatch(registerUser(data)).unwrap();
      if (statusCode === 200) {
        resetForm();
        Toast("success", "SignUp Successfully");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      Toast("error", error?.message || "Error during registeration");
      console.log(error);
    }
  };

  return (
    <div className="grid-2">
      <div className="logo-container">
        <div>
          <div className="flex justify-start items-center gap-2">
            <p className="w-20 h-20">
              <img
                style={{ imageRendering: "-webkit-optimize-contrast" }}
                src={logo}
                alt=""
                className="logo"
              />
            </p>
            <h1 className="logo-text">Wotcha Gotcha</h1>
          </div>
          <img
            style={{ imageRendering: "-webkit-optimize-contrast" }}
            src={logo}
            className="w-full h-[70vh]"
          />
        </div>
      </div>

      <Form
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          username: "",
          role: "user",
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required("username is required"),
          email: Yup.string()
            .email("Inavalid email address")
            .required("Email is Required"),
          password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .max(20, "Password cannot exceed 20 characters")
            .matches(/[a-zA-Z]/, "Password must contain at least one letter")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(
              /[\W_]/,
              "Password must contain at least one special character"
            ),
          confirmPassword: Yup.string()
            .required("Please confirm your password")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
        })}
        onSubmit={handleSignUP}
      >
        {({ handleSubmit, values, handleChange }) => (
          <div className="form-container">
            <h1 className="logo-text">Welcome To Wotcha Gotcha!</h1>

            <div className="input-container">
              <AppInput
                type="text"
                label={"Username"}
                placeholder="jhon"
                name="username"
                value={values.username}
                onChange={handleChange}
              />

              <ErrorMessage name={"email"} />
            </div>
            <div className="input-container">
              <AppInput
                type="email"
                label={"Email"}
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
                label={"Password"}
                placeholder={`********`}
                icon={isPassword ? FaEye : FaEyeSlash}
                onIconClick={() => setIsPassword((prev) => !prev)}
                name="password"
                value={values.password}
                onChange={handleChange}
              />

              <ErrorMessage name={"password"} />
            </div>
            <div className="input-container">
              <AppInput
                type={`${isConfirmPassword ? "password" : "text"}`}
                label={"Confrim Password"}
                placeholder={`********`}
                icon={isConfirmPassword ? FaEye : FaEyeSlash}
                onIconClick={() => setIsConfirmPassword((prev) => !prev)}
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
              />

              <ErrorMessage name={"confirmPassword"} />
            </div>

            <Button
              title={"Sign Up"}
              width={true}
              onClick={isLoading ? null : handleSubmit}
              spinner={isLoading ? <Spinner size="sm" /> : null}
            />

            <Link
              to={"/"}
              className={`mt-2 text-light_text_1 dark:text-dark_text_1 `}
            >
              Already have an account?{" "}
              <span className="text-blue-500 underline">Sign-In</span>
            </Link>
          </div>
        )}
      </Form>
    </div>
  );
};

export default Register;
