// import express module
import express from "express";
// import express-ejs-layouts module
import expressEjsLayouts from "express-ejs-layouts";
// import path module
import path from "path";
// import fileURLToPath module to work with __dirname
import { fileURLToPath } from "url";
// import mongoose module
import mongoose from "mongoose";
// import console module
import log from "console";
// import Contact model
import Contact from "./models/contact.models.js";
import json from "stream/consumers";
// import { Router } from "express";
// import router from 'express';
import router from "./routes/contact.route.js";
import { connectDB } from "./config/database.js";

//package of pagination from mongoose
import mongoosePaginate from "mongoose-paginate-v2";

// create express app
const app = express();
const port = 3000;

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Views folder
app.set("views", path.join(__dirname, "views"));

// View engine
app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.set("layout", "layout");

// Static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// // Dummy contacts
// const contacts = [
//   {
//     id: 1,
//     first: "Alfred",
//     last: "Kuhlman",
//     email: "alfred@test.com",
//     phone: "98989898",
//     address: "123 Main Street, California",
//   },
//   {
//     id: 2,
//     first: "Frederick",
//     last: "Jerde",
//     email: "frederick@test.com",
//     phone: "54545454",
//     address: "44 Lakeview Road, Texas",
//   },
//   {
//     id: 3,
//     first: "Joannie",
//     last: "McLaughlin",
//     email: "joannie@test.com",
//     phone: "75757575",
//     address: "78 Hilltop Avenue, Florida",
//   },
//   {
//     id: 4,
//     first: "Odie",
//     last: "Koss",
//     email: "odie@test.com",
//     phone: "64646464",
//     address: "90 Green Park, New York",
//   },
//   {
//     id: 5,
//     first: "Edna",
//     last: "Ondricka",
//     email: "edna@test.com",
//     phone: "58595858",
//     address: "55 Sunset Boulevard, Nevada",
//   },
// ];

// // MongoDB connect
// mongoose
//   .connect("mongodb://127.0.0.1:27017/Contact_data")
//   .then(() => {
//     console.log("MongoDB Connected");

//     // Insert one sample record (only when DB is empty)
//     insertSampleData();
//   })
//   .catch((err) => console.log(err));

// // Function to insert 1 data only first time
// async function insertSampleData() {
//   const count = await Contact.countDocuments();

//   if (count === 0) {
//     await Contact.create({
//       // id: 0,
//       first: "Jay",
//       last: "Patel",
//       email: "jay@example.com",
//       phone: "9876543210",
//     });

//     console.log("Sample Contact Inserted ✔");
//   }
// }

// ---------------- DATABASE CONNECT -----------------
connectDB();

// ---------------- ROUTES -----------------
app.use("/", router);
// const router = Router();

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// ______________________________________________________________________________________________________________
// fix code with chatgpt
// // ______________________________________________________________________________________________________________
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
// import log from "console";
// // import Contact model
// import Contact from "./models/contact.models.js";
// // import router file
// import router from "./routes/contact.route.js";

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
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({ extended: false }));

// // ---------------- MongoDB Connection -----------------
// mongoose
//   .connect("mongodb://127.0.0.1:27017/Contact_data")
//   .then(() => {
//     console.log("MongoDB Connected");
//     insertSampleData(); // Insert 1 sample record only if DB empty
//   })
//   .catch((err) => console.log(err));

// // Function to insert 1 data only first time
// async function insertSampleData() {
//   try {
//     const count = await Contact.countDocuments();

//     if (count === 0) {
//       await Contact.create({
//         first: "Jay",
//         last: "Patel",
//         email: "jay@example.com",
//         phone: "9876543210",
//       });

//       console.log("Sample Contact Inserted ✔");
//     }
//   } catch (err) {
//     console.log("Error inserting sample data:", err.message);
//   }
// }

// // ---------------- ROUTES -----------------
// app.use("/", router); // using router for all routes

// // Start server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
