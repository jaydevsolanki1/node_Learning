/* ==========================================================================
   IMPORTS
========================================================================== */

// Express
import express from "express";

// View Engine
import expressEjsLayouts from "express-ejs-layouts";

// Path
import path from "path";
import { fileURLToPath } from "url";

// Database
import { connectDB } from "./config/database.js";

// Third Party Middleware
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";

// Express Validator
import { body, validationResult } from "express-validator";

// Routes
import router from "./routes/contact.route.js";
import middlewareRoute from "./routes/middleware.route.js";
import validationRoute from "./routes/validation.route.js";
import {
  fileUploadRoute,
  fileUploadRouteM,
} from "./routes/fileUploadRoute.route.js";
import sessionRouter from "./routes/session.route.js";

// Custom Middleware
import applicationMiddleware from "./middleware/3.application-middleware.js";
import errorMiddleware from "./middleware/4.error.middleware.js";

// Encrypt & Compare User Passwords, Password Hashing TOPIC : Authentications
import bcrypt from "bcrypt";
import AuthBcryptRouter from "./routes/AuthBcrypt.route.js";

/* ==========================================================================
   CREATE EXPRESS APP
========================================================================== */

const app = express();
const PORT = 3000;

/* ==========================================================================
   ES MODULE __dirname FIX
========================================================================== */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ==========================================================================
   DATABASE CONNECTION
========================================================================== */

connectDB();

/* ==========================================================================
   VIEW ENGINE SETUP
========================================================================== */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(expressEjsLayouts);
app.set("layout", "layout");

/* ==========================================================================
   GLOBAL MIDDLEWARE
========================================================================== */

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Parse JSON
app.use(express.json());

// Parse Form Data
app.use(express.urlencoded({ extended: true }));

/* ==========================================================================
   THIRD PARTY MIDDLEWARE
========================================================================== */

// HTTP Request Logger
app.use(morgan("dev"));

// Enable CORS
app.use(cors());

// Security Headers
app.use(helmet());

/* ==========================================================================
   SESSION MIDDLEWARE
========================================================================== */

app.use(
  session({
    secret: "mySecretKey", // Change in Production

    resave: false,

    saveUninitialized: false,

    cookie: {
      // maxAge: 1000 * 60 * 60, // 1 Hour
      maxAge: 1000 * 60, // 1 Min
      secure: false, // true => HTTPS
      httpOnly: true,
    },
  }),
);

app.use((req, res, next) => {
  res.locals.session = req.session;

  next();
});

/* ==========================================================================
   EXPRESS VALIDATOR
========================================================================== */

const validationRegistration = [
  body("userName")
    .notEmpty()
    .withMessage("Name is Required")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 Characters")
    .trim()
    .isAlpha()
    .withMessage("Only Alphabets Allowed")
    .custom((value) => {
      if (value === "admin") {
        throw new Error("admin keyword is not allowed");
      }
      return true;
    })
    .customSanitizer((value) => value.toLowerCase()),

  body("userEmail").isEmail().withMessage("Invalid Email").normalizeEmail(),

  body("userPassword")
    .isLength({ min: 5, max: 10 })
    .withMessage("Password Length 5-10")
    .isStrongPassword()
    .withMessage("Strong Password Required"),

  body("userMobile")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile Must Be 10 Digits"),

  body("userAge")
    .isNumeric()
    .withMessage("Age Must Be Number")
    .isInt({ min: 18 })
    .withMessage("Age Must Be 18+"),

  body("userGender")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid Gender"),
];

/* ==========================================================================
   VALIDATION FORM
========================================================================== */

app.get("/nodejs", (req, res) => {
  res.render("Link_nav/nodejs", {
    err: [],
    image: null,
  });
});

app.post("/validationUtilizeFormS", validationRegistration, (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return res.send(req.body);
  }

  return res.render("Link_nav/nodejs", {
    err: errors.array(),
    image: null,
  });
});

/* ==========================================================================
   CUSTOM APPLICATION MIDDLEWARE
========================================================================== */

app.use(applicationMiddleware);

/* ==========================================================================
   ROUTES
========================================================================== */

// Auth_Bcrypt Routes
app.use("/", AuthBcryptRouter);

// Sessions Routes
app.use("/", sessionRouter);

// File Upload Routes
app.use("/", fileUploadRoute); //FIRST
app.use("/", fileUploadRouteM); // SECOND

// Validation Routes
app.use("/", validationRoute);

// Middleware Learning Routes
app.use("/", middlewareRoute);

// Contact CRUD Routes
app.use("/", router);

/* ==========================================================================
   ERROR HANDLER
========================================================================== */

app.use(errorMiddleware);

/* ==========================================================================
   START SERVER
========================================================================== */

app.listen(PORT, () => {
  console.log(`🚀 Server Running : http://localhost:${PORT}`);
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// // import express module
// import express from "express";
// // import express-ejs-layouts module
// import expressEjsLayouts from "express-ejs-layouts";
// // import path module
// import path from "path";
// // import fileURLToPath module to work with __dirname
// import { fileURLToPath } from "url";
// // import mongoose module
// import mongoose from "mongoose";
// // import console module
// import log, { error } from "console";
// // import Contact model
// import Contact from "./models/contact.models.js";
// import json from "stream/consumers";
// // import { Router } from "express";
// // import router from 'express';
// import router from "./routes/contact.route.js";
// import { connectDB } from "./config/database.js";
// //package of pagination from mongoose
// import mongoosePaginate from "mongoose-paginate-v2";
// //validator
// import validator from "validator";
// // import middleware router in index file in
// import middlewareRoute from "./routes/middleware.route.js";
// import applicationMiddleware from "./middleware/3.application-middleware.js";
// import errorMiddleware from "./middleware/4.error.middleware.js";
// //third party middleware________
// //morgan
// import morgan from "morgan";
// // cors
// import cors from "cors";
// // helmet
// import helmet from "helmet";
// import validationRoute from "./routes/validation.route.js";
// import {
//   fileUploadRoute,
//   fileUploadRouteM,
// } from "./routes/fileUploadRoute.route.js";
// import { MinKey } from "mongodb";
// // session
// import session from "express-session";

// // create express app
// const app = express();
// const port = 3000;

// // __dirname fix for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Views folder
// app.set("views", path.join(__dirname, "views"));

// // View engine
// app.set("view engine", "ejs");
// app.use(expressEjsLayouts);
// app.set("layout", "layout");

// // Static files
// app.use(express.static("public"));

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// // // Dummy contacts
// // const contacts = [
// //   {
// //     id: 1,
// //     first: "Alfred",
// //     last: "Kuhlman",
// //     email: "alfred@test.com",
// //     phone: "98989898",
// //     address: "123 Main Street, California",
// //   },
// //   {
// //     id: 2,
// //     first: "Frederick",
// //     last: "Jerde",
// //     email: "frederick@test.com",
// //     phone: "54545454",
// //     address: "44 Lakeview Road, Texas",
// //   },
// //   {
// //     id: 3,
// //     first: "Joannie",
// //     last: "McLaughlin",
// //     email: "joannie@test.com",
// //     phone: "75757575",
// //     address: "78 Hilltop Avenue, Florida",
// //   },
// //   {
// //     id: 4,
// //     first: "Odie",
// //     last: "Koss",
// //     email: "odie@test.com",
// //     phone: "64646464",
// //     address: "90 Green Park, New York",
// //   },
// //   {
// //     id: 5,
// //     first: "Edna",
// //     last: "Ondricka",
// //     email: "edna@test.com",
// //     phone: "58595858",
// //     address: "55 Sunset Boulevard, Nevada",
// //   },
// // ];

// // // MongoDB connect
// // mongoose
// //   .connect("mongodb://127.0.0.1:27017/Contact_data")
// //   .then(() => {
// //     console.log("MongoDB Connected");

// //     // Insert one sample record (only when DB is empty)
// //     insertSampleData();
// //   })
// //   .catch((err) => console.log(err));

// // // Function to insert 1 data only first time
// // async function insertSampleData() {
// //   const count = await Contact.countDocuments();

// //   if (count === 0) {
// //     await Contact.create({
// //       // id: 0,
// //       first: "Jay",
// //       last: "Patel",
// //       email: "jay@example.com",
// //       phone: "9876543210",
// //     });

// //     console.log("Sample Contact Inserted ✔");
// //   }
// // }

// // ---------------- DATABASE CONNECT -----------------
// connectDB();

// // -------------------------------------------------------------------------------------------
// // without middleware and use express validator
// import { body, validationResult } from "express-validator";

// var validationRegistration = [
//   body("userName")
//     .notEmpty()
//     .withMessage("Name is Required !")
//     .isLength({ min: 3 })
//     .withMessage("must be minimum 3 Character use !!")
//     .trim()
//     .isAlpha()
//     .withMessage("must be contain only Alfa letter use !!")
//     .custom((value) => {
//       if (value == "admin") {
//         throw new Error("username is not use admin keyword");
//       }
//       return true;
//     })
//     .customSanitizer((value) => {
//       return value.toLowerCase();
//     }),

//   body("userEmail").isEmail().withMessage("Invalid Email").normalizeEmail(),

//   body("userPassword")
//     .isLength({ min: 5, max: 10 })
//     .withMessage("must be between 5 to 10 Character Required")
//     .isStrongPassword()
//     .withMessage("password must be strong"),

//   body("userMobile")
//     .isLength({ min: 10, max: 10 })
//     .withMessage("must be enter 10 number  please !"),

//   body("userAge")
//     .isNumeric()
//     .withMessage("Age is must be number")
//     .isInt({ min: 18 })
//     .withMessage("Age must be 18 +"),
//   body("userGender")
//     .isIn(["Male", "Female", "Other"])
//     .withMessage("Gender must be male or female or others"),
// ];

// // validation form utilize package use and under is express middleware use ok
// app.get("/nodejs", (req, res) => {
//   res.render("Link_nav/nodejs", {
//     err: [],
//     image: null,
//   });
// });

// app.post("/validationUtilizeFormS", validationRegistration, (req, res) => {
//   const err = validationResult(req);
//   console.log(err.array());
//   // if (!errors.isEmpty()) {
//   //   return res.status(400).json(errors.array());
//   // }

//   // res.send("Form Submitted Successfully");
//   // ________________chatgpt if conditions use

//   // ------------------or----------------------

//   if (err.isEmpty()) {
//     return res.send(req.body);
//   }
//   return res.render("Link_nav/nodejs", { err: err.array() });
//   // ________________yahoo_baba if conditions use
// });
// // -------------------------------------------------------------------------------------------

// // use morgan ,cors
// app.use(morgan("dev"));
// app.use(cors());
// app.use(helmet());

// // ---------------- ROUTES -----------------
// app.use("/", fileUploadRoute); //first form
// app.use("/", fileUploadRouteM); //second form
// app.use("/", validationRoute); // is the form validations to apply on custom and express validation use when form is submission use
// app.use(applicationMiddleware); // Application Level Middleware // because when any navbar link click is triggered and message show on terminal
// app.use("/", middlewareRoute); // ___________routes(middleware_routes) before route because already give to in route file in error perfect for error handling so not reach out now reach out because now sequence change ok
// app.use("/", router); // ___________routes
// app.use(errorMiddleware); // error Middleware // because when any navbar link click is triggered and error show on terminal

// // const router = Router();

// // Start server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// // ______________________________________________________________________________________________________________
// // fix code with chatgpt
// // // ______________________________________________________________________________________________________________
// // // import express module
// // import express from "express";
// // // import express-ejs-layouts module
// // import expressEjsLayouts from "express-ejs-layouts";
// // // import path module
// // import path from "path";
// // // import fileURLToPath module to work with __dirname
// // import { fileURLToPath } from "url";
// // // import mongoose module
// // import mongoose from "mongoose";
// // // import console module
// // import log from "console";
// // // import Contact model
// // import Contact from "./models/contact.models.js";
// // // import router file
// // import router from "./routes/contact.route.js";

// // // create express app
// // const app = express();
// // const port = 3000;

// // // __dirname fix for ES modules
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // // Views folder
// // app.set("views", path.join(__dirname, "views"));

// // // View engine
// // app.set("view engine", "ejs");
// // app.use(expressEjsLayouts);
// // app.set("layout", "layout");

// // // Static files
// // app.use(express.static(path.join(__dirname, "public")));
// // app.use(express.urlencoded({ extended: false }));

// // // ---------------- MongoDB Connection -----------------
// // mongoose
// //   .connect("mongodb://127.0.0.1:27017/Contact_data")
// //   .then(() => {
// //     console.log("MongoDB Connected");
// //     insertSampleData(); // Insert 1 sample record only if DB empty
// //   })
// //   .catch((err) => console.log(err));

// // // Function to insert 1 data only first time
// // async function insertSampleData() {
// //   try {
// //     const count = await Contact.countDocuments();

// //     if (count === 0) {
// //       await Contact.create({
// //         first: "Jay",
// //         last: "Patel",
// //         email: "jay@example.com",
// //         phone: "9876543210",
// //       });

// //       console.log("Sample Contact Inserted ✔");
// //     }
// //   } catch (err) {
// //     console.log("Error inserting sample data:", err.message);
// //   }
// // }

// // // ---------------- ROUTES -----------------
// // app.use("/", router); // using router for all routes

// // // Start server
// // app.listen(port, () => {
// //   console.log(`Server running at http://localhost:${port}`);
// // });
