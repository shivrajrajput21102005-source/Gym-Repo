import { JWT } from "google-auth-library";
import jwt from "jsonwebtoken";

export default async function requireGuest(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return next();
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);

    return res.status(400).json("YOU_ARE_ALREADY_LOGGEDIN");
  } catch {
    return next();
  }
}
