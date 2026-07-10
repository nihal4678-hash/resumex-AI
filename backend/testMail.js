const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_EMAIL@gmail.com",
    pass: "YOUR_16_CHARACTER_APP_PASSWORD",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("ERROR:", error);
  } else {
    console.log("SMTP Login Successful!");
  }
});