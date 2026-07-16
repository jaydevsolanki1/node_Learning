import express from "express";
import {
  isAuthentication,
  isGuest,
} from "../middleware/10.AuthBcrypt.middleware.js";

const AuthBcryptRouter = express.Router();

import {
  registerPage,
  registerUser,
  loginPage,
  loginUser,
  dashboardPage,
  logoutUser,
  profilePage,
  editProfilePage,
  updateProfile,
} from "../controller/AuthBcrypt.controller.js";

AuthBcryptRouter.get("/AuthRegister", isGuest, registerPage);
AuthBcryptRouter.post("/AuthRegister", isGuest, registerUser);
AuthBcryptRouter.get("/AuthLogin", isGuest, loginPage);
AuthBcryptRouter.post("/AuthLogin", loginUser);
AuthBcryptRouter.get("/AuthDashBoard", isAuthentication, dashboardPage);
AuthBcryptRouter.get("/AuthLogout", logoutUser);
AuthBcryptRouter.get("/AuthProfile", isAuthentication, profilePage);
AuthBcryptRouter.get("/AuthEdit-profile", isAuthentication, editProfilePage);
AuthBcryptRouter.post("/profile/update", isAuthentication, updateProfile);

export default AuthBcryptRouter;
