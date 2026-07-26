const csrfErrorMiddleware = (err, req, res, next) => {
  // Invalid or Missing CSRF Token
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).render("csrf/error", {
      title: "CSRF Error",
    });
  }

  // Pass other errors
  next(err);
};

export default csrfErrorMiddleware;
