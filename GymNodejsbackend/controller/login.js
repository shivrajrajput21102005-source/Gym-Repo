import User from "../modules/userModule.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { transporter } from "../services/EmailTransporter.js";
import { randomUUID } from "crypto";
import { randomBytes, randomFill, randomFillSync, randomInt } from "crypto";
import Verification from "../modules/verifycode.js";
import dayjs from "dayjs";

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("login route");
  if (!email || !password) {
    return res.status(403).json({ code: "EMAIL_PASS_IS_REQUIRED" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ code: "NOT_AUTHORIZED" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("login password", password, user.password, isMatch);
  if (!isMatch) {
    return res.status(400).json({ code: "PASSWORD_IS_INCORRECT" });
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
  console.log("login token", token);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 1000,
  });

  res.status(200).json({ code: "LOGIN_SUCCESS", user });
  console.log("login sucesssedfully");
};

// console.log("login token 2", req.cookies?.token);
export const signUp = async (req, res) => {
  // const oj = res.json.bind(res);
  // const os = res.send.bind(res);
  // const oe = res.end.bind(res);
  // res.json = (body) => {
  //   console.trace("res json called");
  //   return oj(body);
  // };
  // res.send = (body) => {
  //   console.trace("res send called");
  //   return os(body);
  // };
  // res.end = (...arg) => {
  //   console.trace("res end called");
  //   return oe(...arg);
  // };
  const { email } = req.body;
  console.log("signup  header sent s 111", res.headersSent);

  if (!email) {
    return res.status(404).json({ code: "EMAIL_IS_REQUIRED" });
  }
  const randomId = randomUUID();
  const signupCode = Math.floor(Math.random() * 1000000).toString();
  console.log("signup 3");
  console.log("signup  header sent s 1", res.headersSent);

  try {
    console.log("signup 4");
    console.log("signup  header sent s 2", res.headersSent);

    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: `${signupCode}`,
      text: `code for signup :${signupCode}`,
    });
    console.log("signup  header sent s 3", res.headersSent);

    console.log("signup data", signupCode);
  } catch (err) {
    console.log("signup  header sent s 4", res.headersSent);

    console.log("signup 5");
    console.log("signup error 5 ", err.message);
    console.log("signup  header sent s 5", res.headersSent);

    if (res.headersSent) {
      console.log("signup  header sent s 1");
    }
    return res.status(400).json({ code: "something went wrong" });
  }
  console.log("signup  header sent s 7", res.headersSent);

  try {
    const r = await Verification.create({
      verificationId: randomId,
      verifyCode: signupCode,
      verificationEmail: email,
    });
  } catch (err) {
    return res.status(400).json({ code: "something went wrong" });
  }
  console.log("signup 6");
  return res.json({ verifyId: randomId });
};

export const logout = async (req, res) => {
  console.log("logout bc", req.cookies);
  const token = req.cookies?.token;
  console.log("logout bc", token);
  if (!token) {
    return res
      .status(400)
      .json({ code: "TOKEN_IS_NOT_AVAILABLE", success: false });
  }
  res.clearCookie("token");
  res.json({ code: "LOGOUT_SUCESFULLY_MADAR", success: false });
};

export const EmailVerifyCode = async (req, res) => {
  const { verificationCode, verificationId } = req.body;
  if (!verificationCode || !verificationId) {
    console.log("1s");
    return res.json({ code: "VERIFICATION_DETAILS_ARE_NOT_PROVIDED" });
  }

  try {
    const verifyData = await Verification.findOne({
      verificationId,
    });
    if (!verifyData) {
      console.log("22s", verifyData);

      return res.status(404).json({ success: false });
    }
    const date = new Date(verifyData.onCreate).getTime();
    console.log("date", date < Date.now() - 5 * 60000, date, Date.now());
    if (date < Date.now() - 5 * 60000) {
      console.log("333s", verifyData.onCreate, Date.now() - 5 * 60000);

      return res.status(404).json({ success: false });
    }
    if (verifyData.verifyCode !== verificationCode) {
      console.log("4s");

      return res.status(404).json({ success: false });
    }
    verifyData.status = true;
    const user = await User.findOne({ email: verifyData.verificationEmail });
    if (user) {
      console.log("5s");

      return res.json({ user: user });
    }
    const userName = verifyData.verificationEmail.split("@")[0];
    const creatingPassword = randomInt(199999, 999999).toString();
    const hashPassword = await bcrypt.hash(creatingPassword, 10);
    const createUser = await User.create({
      email: verifyData.verificationEmail,
      userName: userName,
      password: hashPassword,
    });
    console.log("6s");
    const token = jwt.sign(
      { id: createUser._id, role: createUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.cookie("token", token, {
      sameSite: "none",
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000,
    });
    await verifyData.save();
    return res.json({ user: createUser, password: creatingPassword });
  } catch (err) {
    console.log("7s", err);

    return res.status(404).json({ code: "SOMETHING_WRONG", success: false });
  }
};
