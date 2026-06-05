import express from "express";

import {
  middlewareController,
  auth_middlewareController,
  applicationMiddlewareController,
  errorMiddlewareController,
  thirdPartyMiddlewareController,
} from "./middleware.controller.js";

import logger from "./logger.middleware.js";
import auth from "./auth.middleware.js";

const middlewareRoute = express.Router();
console.log("Middleware Route Loaded");

middlewareRoute.get("/middleware", logger, middlewareController);
middlewareRoute.get("/auth-middleware", auth, auth_middlewareController);
middlewareRoute.get("/application-middleware", applicationMiddlewareController);
middlewareRoute.get("/error-middleware", errorMiddlewareController);
middlewareRoute.get("/third-party-middleware", thirdPartyMiddlewareController);
export default middlewareRoute;
