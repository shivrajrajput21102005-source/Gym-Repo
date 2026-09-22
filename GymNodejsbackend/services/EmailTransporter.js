import nodemailer from "nodemailer"
export const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
service:"gmail",
  secure: true,
  port: 465,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});