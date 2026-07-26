import express from "express";

import {
  editPage,
  editUser,
  forgotPage,
  forgotUser,
  homePage,
  loginPage,
  loginUser,
  profilePage,
  registerPage,
  registerUser,
  updateProfile,
} from "../controller/csrf.controller.js";
import csrfProtections from "../middleware/12.csrf.middleware.js";
const csrfRouter = express.Router();

csrfRouter.get("/csrf", homePage);

csrfRouter.get("/csrfLogin", csrfProtections, loginPage);
csrfRouter.post("/csrfLogin", csrfProtections, loginUser);

csrfRouter.get("/csrfRegister", csrfProtections, registerPage);
csrfRouter.post("/csrfRegister", csrfProtections, registerUser);

csrfRouter.get("/csrfEdit", csrfProtections, editPage);
csrfRouter.post("/csrfEdit", csrfProtections, updateProfile);

csrfRouter.get("/csrfForgot", csrfProtections, forgotPage);
csrfRouter.post("/csrfForgot", csrfProtections, forgotUser);

csrfRouter.get("/csrfProfile", csrfProtections, profilePage);

export default csrfRouter;
