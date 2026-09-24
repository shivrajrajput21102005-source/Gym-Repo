// // import dotenv from "dotenv";
// // dotenv.config({ path: "GymNodejsbackend/.env" });

// // import path  from "path";
// // import { fileURLToPath } from "url";

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);
// // dotenv.config({ path: path.join(  "../.env") });
import express from "express";
import { Router } from "express";
// import Razorpay from "razorpay";
// // const razorpay = new Razorpay({
// //   key_id: process.env.RAZORPAY_TESTID,
// //   key_secret: process.env.RAZORPAY_SECRETKEY,
// // });
// async function f() {
//   try {
//     console.log("payment routes", process.env.EMAIL_PASS, process.env.PORT);
//   } catch {
//     console.log("none catch error");
//   }
// }
// // f();
// // console.log("payment routes", process.env.PORT);
const paymentRoute = express.Router();
// paymentRoute.post("/subscription", async (req, res) => {
//   console.log("start sub1");
//   const { price } = req.body;
//   console.log("start sub2");

//   const options = {
//     amount: price * 100,
//     currency: "INR",
//     receipt: `receipt-${Date.now()}`,
//   };
//   console.log("start sub3");

//   try {
//     const order = await razorpay.orders.create(options);
//     console.log("/subscription", order);
//     res.json({ order });
//   } catch (err) {
//     console.dir(err, { depth: null });
//     console.log("error ", err, "error message", err.message);
//     res.status(500).json({ sucess: false });
//   }
// });
// paymentRoute.post("/verify-order", async (req, res) => {
//   console.log("verify", res.body);
//   res.json({ status: "SUCCESS" });
// });
paymentRoute.get("/paymentstatus", async (req, res) => {
  console.log("payment orderId,", req.params.orderid);
});


export default paymentRoute;
