// middleware/cookies.middleware.js

const cookiesMiddleware = (req, res, next) => {
  console.log("🍪 Cookies:");
  console.log(req.cookies);

  next();
};

export default cookiesMiddleware;

//^ Example 2: Check if Cookie Exists

// const cookiesMiddleware = (req, res, next) => {
//   if (!req.cookies.userName) {
//     return res.send("❌ No Cookie Found");
//   }
//   next();
// };

//^ Example 3: Authentication Cookie Middleware (Real Project)

// const cookiesMiddleware = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).send("Unauthorized");
//   }
//   next();
// };
