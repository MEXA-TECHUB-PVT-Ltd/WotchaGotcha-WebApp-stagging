import React, { useState } from "react";
import AppInput from "../../../components/form/AppInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../../components/form/Button";
import logo from "../../../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../../components/form/Form";
import * as Yup from "yup";
import ErrorMessage from "../../../components/form/ErrorMessage";
import { Toast } from "../../../components/theme/Toast";
import { Spinner } from "../../../components/theme/Loader";
import { Link } from "react-router-dom";
import { loginUser } from "../../../app/features/auth";

const Login = () => {
  const dispatch = useDispatch();
  const { textColor } = useSelector((state) => state.theme);
  const { isLoading } = useSelector((state) => state.auth);
  const [isPassword, setIsPassword] = useState(true);

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
          <div className="flex justify-start items-center gap-2">
            <img
              style={{ imageRendering: "-webkit-optimize-contrast" }}
              src={logo}
              alt=""
              className="w-50 h-auto"
            />
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
            <h1 className="logo-text">Welcome To Wotcha Gotcha!</h1>

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

            <Link
              to={"/forgot-password"}
              className={`forget-pass ${textColor}`}
            >
              Forgot Password?
            </Link>

            <Button
              title={"Sign In"}
              width={true}
              onClick={isLoading ? null : handleSubmit}
              spinner={isLoading ? <Spinner size="sm" /> : null}
            />

            <Link
              to={"/sign-up"}
              className={`mt-2 text-light_text_1 dark:text-dark_text_1 `}
            >
              Don't have an account?{" "}
              <span className="text-blue-500 underline">Sign Up</span>
            </Link>
          </div>
        )}
      </Form>
    </div>
  );
};

export default Login;
