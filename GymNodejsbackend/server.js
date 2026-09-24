// import dotenv from "dotenv";
// const result = dotenv.config();
// console.log("result ", result);
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/router.js";
import publicRouter from "./routes/publicRoute.js";
import Member from "./modules/MemberModule.js";
import bcrypt from "bcryptjs";
import isauthorized from "./isAuthorized.js";
import ConnectDB from "./db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";
import { login, signUp, logout, EmailVerifyCode } from "./controller/login.js";
import User from "./modules/userModule.js";
import { Socket } from "dgram";
import morgan from "morgan";
import Razorpay from "razorpay";
import MemberPlan from "./modules/PlansModule.js";
import strict from "assert/strict";
import { format } from "path";
import googleLogin from "./controller/googleLogin.js";
import MessageModule from "./modules/messageModule.js";
import GoogleUser from "./modules/realgoogleUser.js";
import AllPlans from "./modules/allPlansModule.js";
import { declarPlans } from "./seedAllPlans.js";
import { isadmin } from "./middlewere/isAdmin.js";
import adminRoutes from "./routes/AdminRoutes.js";
import RequireGuest from "./RequireGuest.js";
import payment from "./routes/paymentRoutes.js";
import userRoute from "./routes/member.js";
import Verification from "./modules/verifycode.js";
// import publicRoute from "./routes/publicRoute.js";
// import Jwt from "jsonwebtoken";

console.log("server on express ");
// ConnectDB();

const app = express();
app.use(morgan("dev"));
const server = http.createServer(app);
const PORT = process.env.PORT | 5000;
// ConnectDB().then(() => {
//   server.listen(PORT, () => {
//     console.log("server run on the ", PORT);
//   });
// });
const create = async () => {
  const existing = await AllPlans.countDocuments();
  const existing2 = await User.countDocuments();
  const existing3 = await Member.countDocuments();
  const existing4 = await Verification.countDocuments();
  const existing5 = await GoogleUser.countDocuments();

  console.log("admins signup successfully ALLplans", existing);
  console.log("admins signup successfully User", existing2);
  console.log("admins signup successfully Member", existing3);
  console.log("admins signup successfully Verification", existing4);
  console.log("admins signup successfully googleUser", existing5);
};
const start = async () => {
  try {
    await ConnectDB();
    server.listen(PORT, "0.0.0.0", () => {
      console.log("server run on port ", PORT);
    });
  } catch (err) {
    console.log("err in start", err);
  }
};
app.use(express.json());
// app.use(cors());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: "https://duopofitnessclubmanager.vercel.app",
    // origin: "http://localhost:1212",
    origin: true,
    credentials: true,
  }),
);

start();
// declarPlans();

const io = new Server(server, {
  cors: {
    origin: "https://duopofitnessclubmanager.vercel.app",
    // origin: "http://localhost:1212",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  (console.log("new client connected", socket.id),
    socket.on("send_message", async (data) => {
      try {
        const messagesave = await MessageModule(data);
        await messagesave.save();
      } catch (e) {
        throw new Error("baba bolte message save ni hua");
      }
      console.log("socjet on", data.sender, data.text);
      io.emit("recieve_message", data);
    }));
  socket.on("disconnected", () => {
    io.emit("client disconnected", socket.id);
  });
});

console.log(
  "url pathname before",
  process.env.MONGO_DB_NAME,
  process.env.MONGO_URI,
);

// const url = new URL(process.env.MONGO_URL);
// console.log("url pathname", process.env.MONGO_URL, url);
///Razorpay

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_TESTID,
//   key_secret: process.env.RAZORPAY_SECRETKEY,
// });
app.use("/user", isauthorized, router);
// app.use("/u", isadmin(["admin", "user"]), adminuser);
app.use("/a", isadmin(["admin"]), adminRoutes);
app.use("/u", isadmin(["admin", "user"]), userRoute);

// app.use("/admin", AdminRoute);

app.use("/payment", payment);
app.use("/", publicRouter);
app.post("/login", RequireGuest, login);
app.post("/signup", RequireGuest, signUp);
app.post("/logout", logout);
app.post("/auth/google", RequireGuest, googleLogin);
app.post("/createaccount/verify-code", RequireGuest, EmailVerifyCode);
// app.post("/create-order", async (req, res) => {
//   // const { amount } = req.body;

//   const options = {
//     amount: amount * 100,
//     currency: "INR",
//   };
//   try {
//     const order = await razorpay.orders.create(options);
//     console.log("created order",order.amount , order.id);
//     res.json({ order });
//   } catch (err) {
//     res.json({ err });
//   }
// });

async function hero() {
  const user = await User.find();
  console.log("user", user);
}
// hero();
async function lala() {
  // const lala = await GoogleUser.findById("69e9c605f24831d153e14472");
  const lala = await GoogleUser.find();

  console.log("lal", lala);
}
// lala();
// async function lala2() {
//   // console.log("lala function ", process.env.PORT)
//   try {
//     const res = await fetch("https://api.resend.com/domains", {
//       method: "GET",
//       headers: {
//       },
//     });
//     console.log("resend lala", await res.text());
//     console.log("resend lala", res.status);
//   } catch (err) {
//     console.log("lala catch", err);
//   }
// }
// lala2();

app.post("/updatepass", async (req, res) => {
  const { email, password, newPassword } = req.body;
  if (!email && !password && !newPassword) {
    console.log("password email new Password", email, password, newPassword);
    return res.status(402).json({ code: "maa ki password ni he" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ code: "user not found" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(404).json({ code: "password is wrong" });
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ code: "password change successfully" });
});

const createAdmin = async () => {
  const existing = await User.findOne({ email: "admin@gmail.com" });
  if (!existing) {
    const hashPassword = await bcrypt.hash("1234", 10);
    const user = await User.create({
      email: "admin@gmail.com",
      password: hashPassword,
      userName: "admin123",
      role: "admin",
    });
    console.log("admins signup successfully");
  }
};

// createAdmin();
// llpopo.ar =
// const end = async ()=>{
//   await MemberPlan.collection.updateMany({},[
//     {
//       $set:{
//         end_date:{
//           $dateFromString:{
//             dateString:"$end_date",
//             format:"%d/%m/%Y"
//           }

//         }
//       }

//     }
//   ])
// }
// end()
// const dateMem = async () => {
//   const m = await MemberPlan.collection.updateMany({}, [
//     {
//       $set: {
//         start_date: {
//           $dateFromString: {
//             dateString: "$start_date",
//             format: "%d/%m/%Y",
//           },
//         },
//       },
//     },
//   ])
// };
// dateMem();
// app.get("/content", (req, res) => {
//   res.json({ ram: "content isrt here" });
// });
// const user = User.find({email})
// console.log("yse",typeof User);

// ConnectDB().then(() => {
//   server.listen(PORT, () => {
//     console.log("server run on the ", PORT);
//   });
// });
