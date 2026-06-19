// import plans from "razorpay/dist/types/plans.js";
import AllPlans from "../modules/allPlansModule.js";
import dotenv from "dotenv";
import User from "../modules/userModule.js";

dotenv.config();
import express, { response } from "express";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import { randomUUID } from "crypto";
import verification from "../modules/verifycode.js";
const publicRoute = express.Router();
// const resend = new Resend(process.env.RESEND_KEY);
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});
const records = {
  deadlift: [
    { name: "John", weight: "250 kg" },
    { name: "Mike", weight: "240 kg" },
    { name: "Sarah", weight: "230 kg" },
    { name: "David", weight: "225 kg" },
    { name: "Emma", weight: "220 kg" },
  ],
  pushups: [
    { name: "Alex", reps: 150 },
    { name: "Chris", reps: 140 },
    { name: "Sophia", reps: 135 },
    { name: "Daniel", reps: 130 },
    { name: "Olivia", reps: 125 },
  ],
};
publicRoute.get("/allPlans", async (req, res) => {
  //   const query = req.query.q
  // const allPlans = await AllPlans.find({ is_active: true,plan_type:`${query}` });
  console.log("someone get allplans");
  const allPlans = await AllPlans.find();
  res.json({ allPlans });
});
publicRoute.get("/records", (req, res) => {
  res.json({ records });
});
publicRoute.get("/selectedplan/:plan_id", async (req, res) => {
  const planId = req.params.plan_id;
  console.log("plan id for selectedPland", planId);

  const plan = await AllPlans.findById(planId);
  res.json({ plan });
});

publicRoute.post("/forgetpassword/send-code", async (req, res) => {
  const { email } = req.body;
  console.log("re1");
  if (!email) {
    return res.status(400).json({ code: "EMAIL_REQUIRED" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "email_not_found" });
  }
  const code = Math.floor(Math.random() * 1000000).toString();
  const verificationId = randomUUID();

  await verification.create({
    email,
    verifyCode: code,
    verificationId,
  });
  console.log("code for verify", code);
  res.json({ verificationId });
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
  // try {

  //   const { data, error } = await resend.emails.send({
  //     from: "onboarding@resend.dev",
  //     to: email,
  //     subject: "hellow from gym backend",
  //     html: "<h2 classname='text-2xl font-bold bg-red-500'>this is a test emails</h2>",
  //   });
  //   console.log("re3");

  //   if (data) {
  //     console.log("data from resend", data);
  //   }
  //   if (error) {
  //     console.log("error from resend", error);
  //   }
  // } catch (error) {
  //   console.log("catch resend error", error.message);
  // }
});
// curl -X GET https://api.resend.com/domains ` -H  "Authorization:Bearer re_j9UDg4pH_kiVVZvRxLpneQqG3wvvdrBsm"
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
console.log("random", Math.floor(Math.random() * 10000));

export default publicRoute;
