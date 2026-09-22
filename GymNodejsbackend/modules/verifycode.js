import mongoose, { Schema } from "mongoose";
import { type } from "os";
const verificationschema = new Schema({
  verificationEmail: String,
  verificationId: String,
  verifyCode: String,
  status: { type: Boolean, default: false },
  onCreate: { type: Date, default: Date.now() },
});
const Verification = mongoose.model("Verification", verificationschema);
export default Verification;
