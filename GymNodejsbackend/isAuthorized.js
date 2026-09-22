import jwt from "jsonwebtoken";
import User from "./modules/userModule.js";
import GoogleUser from "./modules/realgoogleUser.js";
const isauthorized = async (req, res, next) => {
  // console.log(req.headers.authorization);
  const token = req.cookies?.token;
  console.log("token in auth", token);
  // console.log(
  //   "auth 11",
  //   req.cookies.token,
  //   req.headers.cookie,
  //   " auth 111",
  //   token,
  // );
  if (!token) {
    console.log("a1");
    return res.status(404).json({ code: "NOT_AUTHORIZED" });
  }
  // console.log(typeof token, token);
  try {
    const decorded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("auth decorded", decorded);
    const user = await User.findById(decorded.id);
    console.log("auth user", user);
    if (!user) {
      return res.status(404).json({ code: "NOT_AUTHORIZED_NO USER" });
    }
    req.user = user;
    console.log("user id auth", user._id);
    // console.log("auth", req.user, req.user.id);
    next();
  } catch (error) {
    console.log("a2");
    return res.status(404).json({ code: "INVALID_TOKEN" });
  }
};
export default isauthorized;
