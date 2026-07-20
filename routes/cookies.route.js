import express from "express";
import {
  homePage,
  setCookies,
  getCookies,
  updateCookies,
  deleteCookies,
  cookiesOptions,
  multipleCookies,
  getSignedCookies,
  signedCookies,
  updateSignedCookies,
  clearAllCookies,
} from "../controller/cookies.controller.js";

const cookiesRouter = express.Router();

cookiesRouter.get("/cookies", homePage);
cookiesRouter.get("/set-cookies", setCookies);
cookiesRouter.get("/get-cookies", getCookies);
cookiesRouter.get("/update-cookies", updateCookies);
cookiesRouter.get("/delete-cookies", deleteCookies);
cookiesRouter.get("/cookies-options", cookiesOptions);
cookiesRouter.get("/multiple-cookies", multipleCookies);
cookiesRouter.get("/signed-cookies", signedCookies);
cookiesRouter.get("/updateSigned-cookies", updateSignedCookies);
cookiesRouter.get("/getSigned-cookies", getSignedCookies);
cookiesRouter.get("/clearAll-cookies", clearAllCookies);

export default cookiesRouter;
