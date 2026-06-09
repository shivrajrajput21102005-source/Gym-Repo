import express from "express";
const router = express.Router();
import User from "../modules/userModule.js";
import Member from "../modules/MemberModule.js";
import GoogleUser from "../modules/realgoogleUser.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import upload from "../middlewere/upload.js";
import Post from "../modules/PostModule.js";
import AllPlans from "../modules/allPlansModule.js";
import MemberPlan from "../modules/PlansModule.js";
import dayjs from "dayjs";
const today = dayjs();
const addDays = (days) => {
  const addingDays = dayjs().add(days, "day");
  const lastdate = dayjs(addingDays);
  return lastdate;
};
import crypto from "crypto";
import Razorpay from "razorpay";
// import GoogleUser from "../modules/realgoogleUser.js";
const razorpay = new Razorpay({
  key_id: "rzp_test_SY9KTUPucXwHLj",
  key_secret: "MafHv7zPpMi754NtYnuz7Clo",
});
// const user = User();
export const data = async (req, res) => {
  const userName = req.user.userName;
  res.json({ ram: "data isrt here", userName });
  console.log("/data");
};
export const content = async (req, res) => {
  res.json({ ram: "content is here" });
};
router.get("/", async (req, res) => {
  let user = await User.findById(req.user.id);
  // if (!user) {
  // const user = await GoogleUser.findById(req.user.id);
  // }
  // console.log("user", req.user, "user");
  res.json({ success: true, user });
  console.log("/dataisersuar");
});

router.get("/alluser", async (req, res) => {
  const allUser = await User.find();
  res.json({ allUser });
  // console.log("all User go");
});
router.delete("/delete/:id", async (req, res) => {
  const role = req.user.role;
  if (role !== "admin") {
    console.log("admin only");
    return res.json({ code: "YOU ARE NOT admin" });
  }
  const id = req.params.id;

  try {
    const deleteuser = await User.findByIdAndDelete(id);
    res.status(200).json({ code: "USER DELETE", deletedId: deleteuser.id });
  } catch (error) {
    console.log("delete user error", error.message);
  }
});

router.post("/posts", upload.single("image"), async (req, res) => {
  const { title, content } = req.body;
  if (!title) {
    return res.status(404).json({ code: "NO_TITLE&CONTENT" });
  }
  const id = req.user._id;
  console.log("post user id", id, req.user.id);
  const post = new Post({
    title,
    content,
    image: req.file ? req.file.filename : null,
    user: id,
  });
  await post.save();
  res.status(200).json({ success: true, code: "POST_CREATE" });
});
router.get("/posts", async (req, res) => {
  try {
    const post = await Post.find({ user: req.user._id });
    res.json({ post });
  } catch (err) {
    res.json({ err });
  }
});

router.post("/createmember", async (req, res) => {
  console.log("member");
  const { name, phoneNumber } = req.body;
  if (!name && !phoneNumber) {
    return res.status(404).json({ code: "BODY_IS_EMPTY" });
  }
  const existPhone = await Member.findOne({ phoneNumber });
  console.log("member phone", existPhone);

  if (existPhone) {
    return res.status(404).json({ code: "MEMBER_EXIST" });
  }
  const member = await Member.create({
    name,
    phoneNumber,
  });
  res.status(200).json({ code: "success" });
});
router.get("/member", async (req, res) => {
  const member = await Member.find();
  if (!member) {
    res.status(504).json({ code: "MEMBER_ARE_NOT_AVAILABLE" });
  }
  console.log("allmem", member);
  res.status(200).json({ code: "MEMBER_ARE_AVAILABLE", member });
});

router.get("/filtermember", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return;
  }
  const member = await Member.find({ name: { $regex: query, $options: "i" } });
  // const filteruser = user.filter((user) =>
  //   user.name.toLowerCase().includes(query),
  // );

  res.status(200).json({ member });
});

router.post("/addMembership", async (req, res) => {
  // console.log("first if");

  const memberId = req.query.memberId;
  const planId = req.query.planId;
  if (!memberId && !planId) {
    console.log("first if");
    return res.json({ code: "planid and memberId must be provides" });
  }
  const member = await Member.findById(memberId);
  const plan = await AllPlans.findById(planId);
  if (!plan && !member) {
    console.log("first 2 if");

    return res.json({ code: "member not find" });
  }
  const isalreadyexist = await MemberPlan.findOne({ member: member.id });
  if (isalreadyexist) {
    console.log("member have all ready paln");
    return;
  }
  const amount = Number(plan.price);
  const options = {
    amount: amount * 100,
    currency: "INR",
  };
  try {
    const order = await razorpay.orders.create(options);
    console.log("created order", order.amount, order.id);
    res.json({ order });
  } catch (err) {
    console.log("failed order", err.message);

    return res.json({ err });
  }

  const planDays = plan.duration === "1 month" ? 30 : 365;
  const endDate = addDays(planDays);
  console.log(
    "Add membership console",
    typeof today,
    typeof endDate,
    planId,
    plan.id,
  );
  const addMemberPlan = await MemberPlan.create({
    price: plan.price,
    start_date: today,
    end_date: endDate,
    member: member.id,
    plan: plan.id,
  });
  // res.json({ code: "success fully get membership" });
});
router.post("/verify-order", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha123", "MafHv7zPpMi754NtYnuz7Clo")
    .update(body)
    .digest("hex");
  if (expectedSignature === razorpay_signature) {
    res.json({ status: "SUCCESS" });
  } else {
    res.status(400).json({ status: "failed" });
  }
});
router.get("/memberwithplans", async (req, res) => {
  const mwp = await MemberPlan.find().populate("member");
  res.json({ mwp });
  console.log("l", typeof mwp, typeof res);
});
router.get("/payment/selectedmember", async (req, res) => {
  const selectedMemberId = req.query.memberId;
  const ishaveplan = await MemberPlan.findOne({ member: selectedMemberId });
  if (ishaveplan) {
    console.log("ishave plan", ishaveplan);
    return res.json({ ishaveplan });
  }
  return res.json({ code: "no acitve plan" });
});
router.get("/expiremembers", async (req, res) => {
  const expireMembers = await MemberPlan.find({
    end_date: {
      $lt: today,
    },
  });
  if (!expireMembers) {
    return res.json({ code: "lodu" });
  }
  res.json({ expireMembers });
});

router.get("/data", data);
router.get("/content", content);
// const usera = async () => {
//   const hashPassword = await bcrypt.hash("1234b", 10);
//   const user = await User.create({
//     email: "b@gmail.com",
//     password: hashPassword,
//     userName: "bby",
//   });
// };

// router.post("/login")
// const email = "a@gmail.com";
// const fromEmail = User.find({ email });
// const useraapa = [useraa];
// const m = useraapa.map((u) => console.log(u));
// console.log("user", typeof useraa, useraa.email);
// console.log("user", typeof User(), useraapa.length, fromEmail);
console.log("after");
export default router;
