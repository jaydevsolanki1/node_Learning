import express from "express";

const middlewareController = (req, res) => {
  res.send("Middleware Working ! Also Check terminal");
};
const auth_middlewareController = (req, res) => {
  res.send("Protected Route Access Granted Also Check terminal");
};
const applicationMiddlewareController = (req, res) => {
  res.send("Application Middleware Working! Also Check terminal");
};
const errorMiddlewareController = (req, res, next) => {
  next(new Error("Demo Error Generated!"));
};
const thirdPartyMiddlewareController = (req, res) => {
  res.send(
    "third-Party Middleware Working! Also Check terminal and check docs list of ...",
  );
};

export {
  middlewareController,
  auth_middlewareController,
  applicationMiddlewareController,
  errorMiddlewareController,
  thirdPartyMiddlewareController,
};
