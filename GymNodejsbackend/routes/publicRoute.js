// import plans from "razorpay/dist/types/plans.js";
import AllPlans from "../modules/allPlansModule.js";
import dotenv from "dotenv";
dotenv.config();
import express, { response } from "express";
import { Resend } from "resend";
const publicRoute = express.Router();
const resend = new Resend("re_j9UDg4pH_kiVVZvRxLpneQqG3wvvdrBsm");
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

publicRoute.post("/forgetpassword", async (req, res) => {
  const { email } = req.body;
  console.log("re1");
  if (!email) {
    return res.status(400).json({ code: "EMAIL_REQUIRED" });
  }
  try {
    console.log("re2", process.env.RESEND_KEY);
    console.log("domains", await resend.domains.list());

    const { data, error } = await resend.emails.send({
      from: "https://resend.com/smtp",
      to: email,
      subject: "hellow from gym backend",
      html: "<p>this is a test emails</p>",
    });
    console.log("re3");

    if (data) {
      console.log("data from resend", data);
    }
    if (error) {
      console.log("error from resend", error);
    }
  } catch (error) {
    console.log("catch resend error", error.message);
  }
});
// curl -X GET https://api.resend.com/domains ` -H  "Authorization:Bearer re_j9UDg4pH_kiVVZvRxLpneQqG3wvvdrBsm"

export default publicRoute;
