import { cookie } from "express-validator";

//Home Page
export const homePage = (req, res) => {
  res.render("Cookies/home", {
    title: "Cookies Learning",
  });
};

// Set Cookies
export const setCookies = (req, res) => {
  res.cookie("userName", "jaydev");
  res.send("🍪 Cookie Created Successfully");
};
// ----------------------------------------
//  Reading All Cookies
export const getCookies = (req, res) => {
  res.send(req.cookies);
};

// // Get Cookies
// export const getCookies = (req, res) => {
//   const userName = req.cookies.userName;
//   if (!userName) {
//     return res.send("No Cookie Found");
//   }
//   res.send(`Welcome ${userName}`);
// };
// ----------------------------------------

// Update Cookies
export const updateCookies = (req, res) => {
  res.cookie("userName", "ishu");
  res.send("🍪 Cookie Updated Successfully");
};

// Delete Cookies
export const deleteCookies = (req, res) => {
  res.clearCookie("userName");
  res.send("🗑️ Cookie Deleted Successfully");
};

// Cookies Options
export const cookiesOptions = (req, res) => {
  res.cookie("userName", "jack", {
    maxAge: 6000,
    httpOnly: true,
    secure: false,
    // signed :true; when secret key pass
    sameSite: "lax", //*1.'strict' (not another web isn't read your cookies and show another your visitor check your cookies & more secure ),2.'none' those options of same site 3. 'lex' (another web requested to check your cookies easy check)
  });
  res.send("🍪 Cookie Created with Options");
};

//!  Real life Authentication Cookie

// res.cookie("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     maxAge: 24 * 60 * 60 * 1000
// });

//Multiple Cookies
export const multipleCookies = (req, res) => {
  res.cookie("username", "Jaydev");
  res.cookie("theme", "dark");
  res.cookie("language", "English");
  res.cookie("country", "India");
  res.send("🍪 Multiple Cookies Created Successfully");
};

// Signed Cookies
export const signedCookies = (req, res) => {
  res.cookie("userName", "jay", {
    signed: true,
    maxAge: 60000,
  });
  res.send("🔐 Signed Cookie Created Successfully");
};

// update Signed Cookies //* A signed cookie does not stop users from editing the cookie. It lets Express detect if the cookie was modified after the server created it.
export const updateSignedCookies = (req, res) => {
  res.cookie("userName", "jaydevlol");
  res.send("🔐 Signed Cookie are update Successfully");
};

// Get Signed Cookies
export const getSignedCookies = (req, res) => {
  res.send(req.signedCookies);
};

// Clear All Cookies
export const clearAllCookies = (req, res) => {
  Object.keys(req.cookies).forEach((cookie) => {
    res.clearCookie(cookie);
  });
  Object.keys(req.signedCookies).forEach((cookie) => {
    res.clearCookie(cookie);
  });
  res.send("🧹 All Cookies Cleared Successfully");
};
