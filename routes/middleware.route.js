import express from "express";

import {
  applicationMiddlewareController,
  auth_middlewareController,
  errorMiddlewareController,
  middlewareController,
  thirdPartyMiddlewareController,
} from "../controller/middleware.controller.js";

import logger from "../middleware/1.logger.middleware.js";
import auth from "../middleware/2.auth.middleware.js";

const middlewareRoute = express.Router();
console.log("Middleware Route Loaded");

middlewareRoute.get("/middleware", logger, middlewareController);
middlewareRoute.get("/auth-middleware", auth, auth_middlewareController);
middlewareRoute.get("/application-middleware", applicationMiddlewareController);
middlewareRoute.get("/error-middleware", errorMiddlewareController);
middlewareRoute.get("/third-party-middleware", thirdPartyMiddlewareController);

export default middlewareRoute;
