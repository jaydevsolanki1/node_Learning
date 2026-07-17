import nodemailer from "nodemailer";

console.log("USER =", JSON.stringify(process.env.EMAIL_USER));
console.log("PASS =", JSON.stringify(process.env.EMAIL_PASS));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("SMTP Connected Successfully");
  }
});

export default transporter;
