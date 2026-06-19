import mongoose,{ Schema } from "mongoose";
const verificationschema = new Schema({
    email:String,
    verificationId:String,
    verifyCode:String,
    status:{type:Boolean,default:false}
})
const Verification = mongoose.model("Verification",verificationschema)
export default Verification