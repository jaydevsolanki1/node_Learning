const thirdPartyMiddleware = (req, res, next) => {
  console.log("👤 Visitor entered the website");
  next();
};

export default thirdPartyMiddleware;
