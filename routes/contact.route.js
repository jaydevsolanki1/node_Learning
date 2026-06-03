import express from "express";

const router = express.Router();

import {
  getContact,
  postContact,
  showContact,
  getRouter,
  editContact,
  updateContact,
  postupdateContact,
  deleteContact,
  aboutBar,
  MaincontactRouter,
  submitContact,
  serachServices,
  nodejsBar,
} from "../controller/contact.controller.js";

// ==========================================
// HOME
// ==========================================

router.get("/", getRouter);

// ==========================================
// ADD CONTACT
// ==========================================

router.get("/add_contact", getContact);
router.post("/add_contact", postContact);

// ==========================================
// SHOW CONTACT
// ==========================================

// No ID Provided
router.get("/show_contact", (req, res) => {
  res.status(404).render("error/404", {
    layout: "layout",
    title: "404 Error",
    message: "Please Provide Contact ID",
  });
});

// With ID
router.get("/show_contact/:id", showContact);

// ==========================================
// EDIT CONTACT
// ==========================================

// No ID Provided
router.get("/edit_contact", (req, res) => {
  res.status(404).render("error/404", {
    layout: "layout",
    title: "404 Error",
    message: "Please Provide Contact ID",
  });
});

// With ID
router.get("/edit_contact/:id", editContact);

// ==========================================
// UPDATE CONTACT
// ==========================================

// No ID Provided
router.get("/update_contact", (req, res) => {
  res.status(404).render("error/404", {
    layout: "layout",
    title: "404 Error",
    message: "Please Provide Contact ID",
  });
});

// With ID
router.get("/update_contact/:id", updateContact);

router.post("/update_contact/:id", postupdateContact);

// ==========================================
// DELETE CONTACT
// ==========================================

// No ID Provided
router.get("/delete_contact", (req, res) => {
  res.status(404).render("error/404", {
    layout: "layout",
    title: "404 Error",
    message: "Please Provide Contact ID",
  });
});

// With ID
router.get("/delete_contact/:id", deleteContact);

// ==========================================
// ABOUT
// ==========================================

router.get("/about", aboutBar);

// ==========================================
// CONTACT PAGE
// ==========================================

router.get("/contact", MaincontactRouter);
router.post("/submit", submitContact);

// ==========================================
// SERVICES
// ==========================================

router.get("/services", serachServices);

// ==========================================
// NODEJS
// ==========================================

router.get("/nodejs", nodejsBar);

// ==========================================
// GLOBAL 404
// ==========================================

router.use((req, res) => {
  res.status(404).render("error/404", {
    layout: "layout",
    title: "404 Error",
    message: "Page Not Found",
  });
});

export default router;
