const auth = (req, res, next) => {
  console.log("Authentication Middleware Executed");

  const isLogin = true;

  if (isLogin) {
    next();
  } else {
    res.send("Access Denied");
  }
};

export default auth;
