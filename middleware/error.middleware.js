const errorMiddleware = (err, req, res, next) => {
  console.error("❌ Error:", err.message);

  res.status(500).send("Something went Wrong!");
};

export default errorMiddleware;
