export const isAuthentication = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect("/AuthLogin");
};
// User must NOT be logged in
export const isGuest = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/AuthDashBoard");
  }

  next();
};
