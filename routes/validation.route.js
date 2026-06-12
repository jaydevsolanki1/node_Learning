import express, { Router } from "express";

import validationMiddleware from "../middleware/7.validation.middleware.js";

import {
  validationForm,
  validationSubmit,
} from "../controller/validation.controller.js";

const validationRoute = express.Router();

validationRoute.get("/validation", validationForm);
validationRoute.post("/validation", validationMiddleware, validationSubmit);

export default validationRoute;
