// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const mongoose = require("mongoose");

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("mongose connect"))
//   .catch((err) => console.log(err));
// const app = express();
// const PORT = process.env.PORT | 5000;

// app.use(express.json());
// app.use(cors());

// app.get("/", (req, res) => {
//   res.json("backend is working");
// });
// app.get("/data", (req, res) => {
//   res.json({ message: "data" });
// });

// app.post("/login", (req, res) => {
//   const { name, password } = req.body;
//   if (!name === "baba123") {
//     return res.json({ message: "username is not found" });
//   }
//   const rightPass = password === "123456";
//   if (rightPass) {
//     return res.json({ message: "pass is incorrect" });
//   }
//   const token = "lula";
//   res.json({ token: token });
// });
// app.listen(PORT, () => {
//   console.log("server is running in the ", PORT);
// });
// const isauthorized = require("./isAuthorized.js");
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const mongoose = require("mongoose");
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import router from "./routes/router.js";
import publicRouter from "./routes/publicRoute.js";
import bcrypt from "bcryptjs";
import isauthorized from "./isAuthorized.js";
import ConnectDB from "./db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";
import { login, signUp, logout } from "./controller/login.js";
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
// import publicRoute from "./routes/publicRoute.js";
// import Jwt from "jsonwebtoken";

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
const start = async () => {
  try {
    await ConnectDB();
    server.listen(PORT, () => {
      console.log("server run on port ", PORT);
    });
  } catch (err) {
    console.log("err in start", err);
  }
};
start();
app.use(express.json());
// app.use(cors());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: "http://localhost:1212",
    credentials: true,
  }),
);

  console.log("allplans documentos", await AllPlans.countDocuments());

// app.use(cors());
// app.use(bodyParser.json());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:1234",
    methods: ["GET", "PORT"],
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

///Razorpay

const razorpay = new Razorpay({
  key_id: "rzp_test_SY9KTUPucXwHLj",
  key_secret: "MafHv7zPpMi754NtYnuz7Clo",
});
app.use("/user", isauthorized, router);
app.use("/", publicRouter);
app.post("/login", login);
app.post("/signup", signUp);
app.post("/logout", logout);
app.post("/auth/google", googleLogin);
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
// cldoof = --0
async function hero() {
  const user = await User.find();
  console.log("user", user);
}
hero();
async function lala() {
  const lala = await GoogleUser.findById("69e9c605f24831d153e14472");
  console.log("lal", lala);
}
lala();
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
