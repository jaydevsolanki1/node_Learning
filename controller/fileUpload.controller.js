import express from "express";
const app = express();
app.use(express.static("public"));

export const showUploadPage = (req, res) => {
  res.render("Link_nav/nodejs", {
    image: null,
    docs: null,
    uploadName: null,
    error: null,
  });
};

export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.send("❌ No File Uploaded");
  }

  res.render("Link_nav/nodejs", {
    image: `/uploads/${req.file.filename}`,
    docs: null,
    uploadName: null,
    error: null,
  });
};

// -------------------------------------------------------------------
export const showUploadDocs = (req, res) => {
  res.render("formUploadM", {
    image: null,
    document: null,
    error: null,
  });
};

export const uploadDocs = (req, res) => {
  if (!req.file) {
    return res.render("formUploadM", {
      docs: null,
      image: null,
      uploadName: null,
      error: "❌ No File Uploaded",
    });
  }

  res.render("formUploadM", {
    docs: `/docs/${req.file.filename}`,
    uploadName: req.body.uploadName,
    image: null,
    error: null,
  });
};
