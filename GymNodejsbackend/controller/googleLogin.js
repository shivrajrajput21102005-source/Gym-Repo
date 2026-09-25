import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import GoogleUser from "../modules/realgoogleUser.js";
const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI,
);
export const authGoogle = async (req, res) => {
  console.log("auth google start");

  const url = googleClient.generateAuthUrl({
    access_type: "offline",
    scope: ["openid", "email", "profile"],
  });
  console.log("auth google", url);
  res.redirect(url);
};
export const authGoogleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    console.log("code", code);
    const { tokens } = await googleClient.getToken(code);
    console.log("ggole token", tokens);

    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log("tocket g", ticket);
    const payload = ticket.getPayload();
    console.log("payload", payload);
    const email = payload.email;
    const googleId = payload.sub;
    const name = payload.name;
    let googleUser = await GoogleUser.findOne({ email });
    if (!googleUser) {
      console.log("google user inot", googleUser);
      googleUser = await GoogleUser.create({ email, googleId, name });
    }
    const token = jwt.sign({ id: googleUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("token res", token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    });
    res.redirect(process.env.FRONTEND_URL);
  } catch (err) {
    console.error("err on google callback", err);
    res.status(500).send("GOOGLE authentication failed");
  }
};
// const googleLogin = async (req, res) => {
//   try {
//     const { credential } = req.body;
//     const ticket = await client.verifyIdToken({
//       idToken: credential,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     const payload = ticket.getPayload();
//     let user = await GoogleUser.findOne({ email: payload.email });
//     if (!user) {
//       console.log("user google created");
//       user = await GoogleUser.create({
//         name: payload.name,
//         email: payload.email,
//         googleId: payload.sub,
//         picture: payload.picture,
//       });
//     }
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "15m",
//     });
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//     });
//     res.status(200).json({ code: "GOOGLE LOGIN SUCCESS" });
//   } catch (err) {
//     res.status(401).json({ error: "Invalid Google token" });
//   }
// };
// export default googleLogin;
