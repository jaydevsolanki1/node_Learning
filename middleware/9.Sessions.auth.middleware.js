/* =====================================================
                AUTHENTICATION MIDDLEWARE
===================================================== */

const SessionAuthMiddleware = (req, res, next) => {
  console.log("=================================");
  console.log("🔐 Authentication Middleware");
  console.log("Requested URL :", req.originalUrl);
  console.log("Session ID    :", req.sessionID);
  console.log("Login Status  :", req.session.isLogin);
  console.log("=================================");

  // Check if user is logged in
  if (!req.session.isLogin) {
    console.log("❌ Access Denied");
    return res.redirect("/login");
  }

  console.log("✅ Access Granted");

  // Continue to next middleware/controller
  next();
};

export default SessionAuthMiddleware;
