import User from "../modules/userModule.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { transporter } from "../routes/publicRoute.js";
import { randomUUID } from "crypto";
// const user = User;
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
};

// console.log("login token 2", req.cookies?.token);
export const signUp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(404).json({ code: "EMAIL_IS_REQUIRED" });
  }

  // const isexist = await User.findOne({ email });
  // if (isexist) {
  //   return res.status(404).json({ code: "USER_IS_ALREADY_EXIST" });
  // }
  const randomId = randomUUID();
  const signupCode = Math.floor(Math.random() * 1000000).toString();
  console.log("signUp data", signupCode, randomId);
  try {
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "test email for signup",
      text: `code for signup :${signupCode}`,
    });
  } catch (err) {
    console.log("catch error in sendMail", err);
    return res.json({ code: "something went wrong" });
  }
  // const makeUserName = email.slice(0, 4) + 1234;
  // const hashPassword = await bcrypt.hash(password, 10);
  // const user = await User.create({
  //   email,
  //   password: hashPassword,
  //   userName: makeUserName,
  // });
  // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  //   expiresIn: "2h",
  // });
  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: false,

  //   sameSite: "lax",
  //   maxAge: 3600000 * 2,
  // });
  // // const signUser = jwt
  // console.log("signup user", user);
  // res.status(200).json({
  //   code: "LOGIN_SUCCESS",
  // });

  // // console.log("f3",user ,user.email , user.userName)
  // console.log("f3");
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
// User.deleteMany();
