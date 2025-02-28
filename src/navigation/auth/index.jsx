import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../views/Auth/Login";
import ForgotPassword from "../../views/Auth/ForgotPassword";
import VerifyEmail from "../../views/Auth/VerifyEmail";
import ResetPassword from "../../views/Auth/ResetPassword";
import Register from "../../views/Auth/Register";

const AuthNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default AuthNavigator;
