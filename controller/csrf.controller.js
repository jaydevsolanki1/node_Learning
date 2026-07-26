/* ======================================================
   Home Page
====================================================== */

export const homePage = (req, res) => {
  res.render("csrf/home", {
    title: "CSRF Home",
  });
};

/* ======================================================
   Login Page
====================================================== */

export const loginPage = (req, res) => {
  res.render("csrf/login", {
    title: "CSRF Login",
    csrfToken: req.csrfToken(),
  });
};

/* ======================================================
   Login Submit
====================================================== */

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  console.log("========== LOGIN ==========");
  console.log("Email    :", email);
  console.log("Password :", password);
  console.log("===========================");

  res.redirect("/csrfProfile");
};

/* ======================================================
   Profile Page
====================================================== */

export const profilePage = (req, res) => {
  res.render("csrf/profile", {
    title: "Profile",
  });
};

/* ======================================================
   Register Page
====================================================== */

export const registerPage = (req, res) => {
  res.render("csrf/csrfRegister", {
    title: "Register",
    csrfToken: req.csrfToken(),
  });
};

/* ======================================================
   Register Submit
====================================================== */

export const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  console.log("======== REGISTER ========");
  console.log("Name     :", name);
  console.log("Email    :", email);
  console.log("Password :", password);
  console.log("==========================");

  res.send("Registration Successful");
};

/* ======================================================
   Edit Profile Page
====================================================== */

export const editPage = (req, res) => {
  res.render("csrf/csrfEdit", {
    title: "Edit Profile",
    csrfToken: req.csrfToken(),
  });
};

/* ======================================================
   Edit Profile Submit
====================================================== */

export const editUser = (req, res) => {
  const { name, email } = req.body;

  console.log("===== PROFILE UPDATE =====");
  console.log("Name  :", name);
  console.log("Email :", email);
  console.log("==========================");

  res.send("Profile Updated Successfully");
};

/* ======================================================
   Forgot Password Page
====================================================== */

export const forgotPage = (req, res) => {
  res.render("csrf/csrfForgot", {
    title: "Forgot Password",
    csrfToken: req.csrfToken(),
  });
};

/* ======================================================
   Forgot Password Submit
====================================================== */

export const forgotUser = (req, res) => {
  const { email } = req.body;

  console.log("==== FORGOT PASSWORD ====");
  console.log("Email :", email);
  console.log("=========================");

  res.send("Password Reset Link Sent");
};

/* ======================================================
   Update Profile 
====================================================== */

export const updateProfile = (req, res) => {
  const { name, email } = req.body;

  console.log(name);
  console.log(email);

  res.redirect("/csrfProfile");
};
