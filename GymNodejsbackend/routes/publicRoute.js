import AllPlans from "../modules/allPlansModule.js";
import { Router } from "express";
import { product } from "../seedAllPlans.js";
import nodemailer from "nodemailer";
import { randomUUID } from "crypto";
import verification from "../modules/verifycode.js";
import Product from "../modules/ProductModule.js";
const publicRoute = express.Router();

// ALL plans Route
publicRoute.get("/allPlans", async (req, res) => {
  const query = req.query.q;
  const allPlans = await AllPlans.find({
    is_active: true,
    plan_type: `${query}`,
  });
  if (!allPlans) {
    res.status(500).json({ code: "SOMETHING_WENT_WRONG" });
  }
  res.status(200).json({ allPlans });
});

// Products

// publicRoute.get("/products", async (req, res) => {
//   const product = await Product.find();
//   if (!product) {
//     res.status(500).json({ code: "SOMETHING_WENT_WRONG" });
//   }
//   res.json({ product });
// });

const records = {
  deadlift: [
    { name: "Rahul Tej", weight: "250 kg" },
    { name: "Pratyakhsha Singh", weight: "240 kg" },
    { name: "Sohil Khan", weight: "230 kg" },
    { name: "Babu", weight: "225 kg" },
    { name: "Vikash Yadav", weight: "220 kg" },
  ],
  pushups: [
    { name: "Aaman Patola", reps: 150 },
    { name: "Somya kumar", reps: 140 },
    { name: "Sopen ", reps: 135 },
    { name: "Daksha", reps: 130 },
    { name: "Naman Sharma", reps: 125 },
  ],
  pullups: [
    { name: "Rohan", reps: 150 },
    { name: "Prince", reps: 140 },
    { name: "Soden", reps: 135 },
    { name: "Danu", reps: 130 },
    { name: "Om", reps: 125 },
  ],
  op: [
    { name: "Alex", reps: 150 },
    { name: "Chris", reps: 140 },
    { name: "Sophia", reps: 135 },
    { name: "Daniel", reps: 130 },
    { name: "Olivia", reps: 125 },
  ],
};

publicRoute.get("/records", (req, res) => {
  res.json({ records });
});


publicRoute.post("/forgetpassword/send-code", async (req, res) => {
  const { email } = req.body;
  console.log("re1");
  if (!email) {
    return res.status(400).json({ code: "EMAIL_REQUIRED" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "email_not_found" });
  }
  const code = Math.floor(Math.random() * 1000000).toString();
  const verificationId = randomUUID();

  // await verification.create({
  //   email,
  //   verifyCode: code,
  //   verificationId,
  // });
  console.log("code for verify", code);
  // res.json({ verificationId });
  // try {
  //   await transporter.sendMail({
  //     to: email,
  //     from: process.env.USER_EMAIL,
  //     subject: "test emails",
  //     text: `${code}`,
  //   });
  // } catch (err) {
  //   console.log("nodemailer error", err.message);
  // }
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "hellow from gym backend",
      html: "<h2 classname='text-2xl font-bold bg-red-500'>this is a test emails code: {code}</h2>",
    });
    console.log("re3");

    if (data) {
      console.log("data from resend", data);
    }
    if (error) {
      console.log("error from resend", error);
    }
    res.json({ verificationId });
  } catch (error) {
    console.log("catch resend error", error.message);
  }
});

publicRoute.post("/forgetpassword/verify-code", async (req, res) => {
  const { verificationId, verificationCode } = req.body;
  console.log("apply", await verification.find());
  if (!verificationId && !verificationCode) {
    return res.json({ message: "Verification faild" });
  }
  const verify = await verification.findOne({ verificationId: verificationId });
  console.log("verify", verify, verify.verifyCode, verificationCode);

  if (verify.verifyCode != verificationCode) {
    console.log("coed wrong");
    return res.json({ message: "verificaion_failed" });
  }
  // await verification.findOneAndDelete({ verificationId });

  verify.status = true;
  await verify.save();
  return res.json({ message: "verified" });
});

publicRoute.get("/products", (req, res) => {
  res.json({ product });
});

export default publicRoute;
