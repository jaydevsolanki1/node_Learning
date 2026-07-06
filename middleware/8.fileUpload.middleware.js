//  you check also how to multiple file uploaded in docs from learning folder in ....

import multer from "multer";
import path from "path";

// ======================
// Image Upload
// ======================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|webp/;

  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );

  if (extName) {
    return cb(null, true);
  }

  cb(new Error("Only Images Allowed"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

// ======================
// Document Upload
// ======================

const storageS = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/docs");
  },

  filename: (req, file, cb) => {
    const newFileName = Date.now() + path.extname(file.originalname);

    cb(null, newFileName);
  },
});

const fileFilters = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|txt|xlsx|xls|ppt|pptx/;

  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );

  if (extName) {
    return cb(null, true);
  }

  cb(new Error("Only Documents Allowed"));
};

const uploadD = multer({
  storage: storageS,
  fileFilter: fileFilters,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export { upload, uploadD };
