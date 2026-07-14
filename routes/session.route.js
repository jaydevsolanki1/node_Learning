import express from "express";

import {
  loginPage,
  loginUser,
  profilePage,
  dashboardPage,
  sessionInfoPage,
  logoutUser,
} from "../controller/session.controller.js";

import SessionAuthMiddleware from "../middleware/9.Sessions.auth.middleware.js";

const sessionRouter = express.Router();

/* =====================================================
                PUBLIC ROUTES
===================================================== */

// Login Page
sessionRouter.get("/login", loginPage);

// Login Form Submit
sessionRouter.post("/login", loginUser);

/* =====================================================
                PROTECTED ROUTES
===================================================== */

// Dashboard
sessionRouter.get("/dashboard", SessionAuthMiddleware, dashboardPage);

// Profile
sessionRouter.get("/profile", SessionAuthMiddleware, profilePage);

// Session Information
sessionRouter.get("/session-info", SessionAuthMiddleware, sessionInfoPage);

// Logout
sessionRouter.get("/logout", SessionAuthMiddleware, logoutUser);

export default sessionRouter;
