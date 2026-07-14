/* =====================================================
                LOGIN PAGE
===================================================== */

export const loginPage = (req, res) => {
  res.render("session/login", {
    title: "Login",
    error: null,
  });
};

/* =====================================================
                LOGIN USER
===================================================== */

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Dummy User
  const user = {
    id: 1,
    username: "Ishu",
    email: "ishu@gmail.com",
    password: "123456",
    role: "Admin",
  };

  // Validate Login
  if (email !== user.email || password !== user.password) {
    return res.render("session/login", {
      title: "Login",
      error: "Invalid Email or Password",
    });
  }

  // Store Session
  req.session.user = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  req.session.isLogin = true;

  req.session.loginTime = new Date();

  console.log("=================================");
  console.log("✅ User Logged In");
  console.log(req.session);
  console.log("=================================");

  res.redirect("/dashboard");
};

/* =====================================================
                DASHBOARD
===================================================== */

export const dashboardPage = (req, res) => {
  res.render("session/dashboard", {
    title: "Dashboard",
    user: req.session.user,
    loginTime: req.session.loginTime,
    sessionID: req.sessionID,
  });
};

/* =====================================================
                PROFILE
===================================================== */

export const profilePage = (req, res) => {
  res.render("session/profile", {
    title: "Profile",
    user: req.session.user,
    loginTime: req.session.loginTime,
    sessionID: req.sessionID,
  });
};

/* =====================================================
                SESSION INFORMATION
===================================================== */

export const sessionInfoPage = (req, res) => {
  res.render("session/sessionInfo", {
    title: "Session Information",
    session: req.session,
    sessionID: req.sessionID,
    loginTime: req.session.loginTime,
  });
};

/* =====================================================
                LOGOUT
===================================================== */

export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Logout Failed");
    }

    res.clearCookie("connect.sid");

    console.log("=================================");
    console.log("❌ Session Destroyed");
    console.log("=================================");

    res.redirect("/login");
  });
};
