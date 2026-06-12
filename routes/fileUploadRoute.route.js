import express from "express";

import {
  showUploadPage,
  uploadImage,
  showUploadDocs,
  uploadDocs,
} from "../controller/fileUpload.controller.js";

import { upload, uploadD } from "../middleware/8.fileUpload.middleware.js";

const fileUploadRoute = express.Router();
const fileUploadRouteM = express.Router();

fileUploadRoute.get("/formUpload", showUploadPage);
fileUploadRoute.post(
  "/formUpload",

  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.render("Link_nav/nodejs", {
            image: null,
            error: "❌ Image size must be less than 2 MB",
          });
        }

        return res.render("Link_nav/nodejs", {
          image: null,
          error: err.message,
        });
      }

      next();
    });
  },

  uploadImage,
);

//uploaded.array('image',5) this is use for multiple file uploaded and number is say to maximum size of uploaded
// uploaded.filed ([{name:'profilePic',maxCount:1},{name:'document',maxCount:3}])  set a multiple filed in this while uploaded like first is profile upload and second is document with that size.

fileUploadRouteM.get("/formUploadM", showUploadDocs);

fileUploadRouteM.post(
  "/formUploadM",

  (req, res, next) => {
    uploadD.single("docs")(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.render("formUploadM", {
            docs: null,
            image: null,
            uploadName: null,
            error: "❌ File size must be less than 10 MB",
          });
        }

        return res.render("formUploadM", {
          docs: null,
          image: null,
          uploadName: null,
          error: err.message,
        });
      }

      next();
    });
  },

  uploadDocs,
);

export { fileUploadRoute, fileUploadRouteM };
