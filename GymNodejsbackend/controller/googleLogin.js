import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import GoogleUser from "../modules/realgoogleUser.js";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    let user = await GoogleUser.findOne({ email: payload.email });
    if (!user) {
      console.log("user google created");
      user = await GoogleUser.create({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        picture: payload.picture,
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ code: "GOOGLE LOGIN SUCCESS" });
  } catch (err) {
    res.status(401).json({ error: "Invalid Google token" });
  }
};
export default googleLogin;
