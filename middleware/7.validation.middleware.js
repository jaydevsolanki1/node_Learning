import validator from "validator";

const validationMiddleware = (req, res, next) => {
  const { name, email, password, mobile, age, gender } = req.body;

  // Name
  if (validator.isEmpty(name || "")) {
    return res.send("❌ Name is required");
  }

  // Email
  if (!validator.isEmail(email || "")) {
    return res.send("❌ Invalid Email");
  }

  // Password
  if (!validator.isLength(password || "", { min: 6 })) {
    return res.send("❌ Password must be at least 6 characters");
  }

  // Age
  if (validator.isEmpty(age || "") || Number(age) < 18 || Number(age) > 100) {
    return res.send("❌ Age must be between 18 and 100");
  }

  // Mobile Required
  if (validator.isEmpty(mobile || "")) {
    return res.send("❌ Mobile Number is required");
  }

  // Only Numbers
  if (!validator.isNumeric(mobile)) {
    return res.send("❌ Mobile Number must contain only digits");
  }

  // Exactly 10 Digits
  if (!validator.isLength(mobile, { min: 10, max: 10 })) {
    return res.send("❌ Mobile Number must be exactly 10 digits");
  }

  // Indian Mobile Validation
  if (!validator.isMobilePhone(mobile, "en-IN")) {
    return res.send("❌ Invalid Indian Mobile Number");
  }

  // Gender
  if (
    validator.isEmpty(gender || "") ||
    !["Male", "Female", "Other"].includes(gender)
  ) {
    return res.send("❌ Please select a valid gender");
  }

  console.log("✅ Validation Passed");

  next();
};
export default validationMiddleware;
