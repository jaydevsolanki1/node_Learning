// ==========================================
// IMPORTS
// ==========================================

// Import Express
import express from "express";

// OPTIONAL:
// If using layouts then install:
// npm install express-ejs-layouts
// import expressLayouts from "express-ejs-layouts";

// ==========================================
// CREATE EXPRESS APP
// ==========================================

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

// Parse JSON data
app.use(express.json());

// Parse form data
app.use(express.urlencoded({ extended: false }));

// ==========================================
// VIEW ENGINE SETUP
// ==========================================

// Set EJS as template engine
app.set("view engine", "ejs");

// OPTIONAL:
// If your views folder name is different
// app.set("views", "myViews");

// OPTIONAL:
// Enable EJS layouts
// app.use(expressLayouts);

// ==========================================
// GLOBAL MIDDLEWARE
// This data is available in ALL EJS pages
// ==========================================

app.use((req, res, next) => {
  // Global website title
  res.locals.websiteName = "Ishushi Sphere";

  // Current date/time
  res.locals.currentDate = new Date();

  next();
});

// ==========================================
// HOME PAGE
// ==========================================

app.get("/", (req, res) => {
  res.send(`
    <h1>🏠 Home Page</h1>
    <hr>

    <h3>Available Routes:</h3>

    <ul>
    

      <li>
        <a href="/SecondProjectFiles/AboutDemo">
          About Demo Page
        </a>
      </li>

      <li>
        <a href="/SecondProjectFiles/Formdemo">
          Form Demo Page
        </a>
      </li>

    
    </ul>
  `);
});

// ==========================================
// RENDER METHOD DEMO
// File:
// views/index.ejs
// ==========================================



// ==========================================
// ABOUT DEMO PAGE
// File:
// views/SecondProjectFiles/AboutDemo.ejs
// ==========================================

app.get("/SecondProjectFiles/AboutDemo", (req, res) => {
  // Simple array
  const items = ["Apple", "Banana", "Cherry"];

  // Array of objects
  const person = [
    {
      Name: "Jay",
      Age: 22,
      City: "Rajkot",
    },

    {
      Name: "Sara",
      Age: 25,
      City: "Mumbai",
    },
  ];

  // Single object
  const animal = {
    name: "Lion",
    description: "Lion is the king of the forest",
  };

  // Render AboutDemo.ejs
  res.render("SecondProjectFiles/AboutDemo", {
    title: "Demo About Page",

    message: "Welcome to About Demo Page",

    items,

    person,

    animal,
  });
});

// ==========================================
// FORM PAGE (GET)
// File:
// views/SecondProjectFiles/FormDemo.ejs
// ==========================================

app.get("/SecondProjectFiles/Formdemo", (req, res) => {
  res.render("SecondProjectFiles/FormDemo", {
    title: "Form Demo",

    name: null,

    email: null,

    message: null,

    success: null,
  });
});

// ==========================================
// FORM SUBMIT (POST)
// ==========================================

app.post("/SecondProjectFiles/Submit", (req, res) => {
  // Get form data
  const { name, email, message } = req.body;

  // Render same page with submitted data
  res.render("SecondProjectFiles/FormDemo", {
    title: "Form Submitted",

    name,

    email,

    message,

    success: `✅ Hello ${name}, your form has been submitted successfully!`,
  });
});

// ==========================================
// SIMPLE ABOUT PAGE
// File:
// views/Link_nav/about.ejs
// ==========================================

// ==========================================
// 404 PAGE
// ==========================================

app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Page Not Found</h1>

    <a href="/">Go Back Home</a>
  `);
});

// ==========================================
// START SERVER
// ==========================================

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`
====================================
✅ Server Running Successfully
====================================

🌐 URL:
http://localhost:${PORT}

====================================
  `);
});

// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Demo of middleware use to when submit the code don't need to more and more time write same thing so use ....it's called customize middleware

// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// index.js
// import express from "express";
// const app = express();
// const port = 3000;

// // Set EJS as the view engine
// app.set("view engine", "ejs");

// // Middleware for parsing form data
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // // Route: Display User Page
// // app.get("/user", (req, res) => {
// //   const users = [
// //     { id: 1, name: "Jay", age: 22 },
// //     { id: 2, name: "Dev", age: 25 },
// //     { id: 3, name: "Ravi", age: 20 },
// //   ];

// //   const a = new Date();

// //   res.render("user", {
// //     title: "Ishushi Sphere",
// //     message: null,
// //     items: users,
// //     a,
// //   });
// // });

// // // Route: Handle Form Submission
// // app.post("/submit", (req, res) => {
// //   const name = req.body.myname;
// //   const message = `Hello ${name}, form successfully submitted!`;

// //   const users = [
// //     { id: 1, name: "Jay", age: 22 },
// //     { id: 2, name: "Dev", age: 25 },
// //     { id: 3, name: "Ravi", age: 20 },
// //   ];

// //   const a = new Date();

// //   res.render("user", {
// //     title: "Ishushi Sphere",
// //     message,
// //     items: users,
// //     a,
// //   });
// // });

// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// // Code sorter than previous and don't repeted code when router used because use app.use in locals to use any where...

// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// app.use((req, res, next) => {
//   res.locals.title = "Ishushi Sphere";
//   res.locals.a = new Date();
//   res.locals.items = [
//     { id: 1, name: "Jay", age: 22 },
//     { id: 2, name: "Dev", age: 25 },
//     { id: 3, name: "Ravi", age: 20 },
//   ];
//   next();
// });

// app.get("/user", (req, res) => {
//   res.render("user", { message: null });
// });
// app.post("/submit", (req, res) => {
//   const name = req.body.myname;
//   res.render("user", { message: `Hello ${name}, form submitted!` });
// });

// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// // Route: Serve a PDF file (optional)
// // app.get("/se", (req, res) => {
// //   res.sendFile(__dirname + "/files/ok.pdf");
// // });

// // Start Server
// app.listen(port, () => {
//   console.log(`✅ Server running at http://localhost:${port}`);
// });
