import mongoose, { Schema } from "mongoose";
const realuserSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },

  googleId: String,
  picture: String,
  role: { type: String, default: "user", enum: ["user", "admin"] },
});
const GoogleUser = mongoose.model("GoogleUser", realuserSchema);
export default GoogleUser;
