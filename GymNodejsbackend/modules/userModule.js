import mongoose, { Schema } from "mongoose";

// const UserSchema= new Schema({
//     email:{
//         type:String , required:true
//     },
//     password:{type:String , required:true},
//     userName:{
//         type:String
//     },
//     profilePhoto:{
//         data:Buffer,
//         contentType:{type:String , default:'image/jpeg'}
//     }
// });
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  name: {
    type: String,
  },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  // profilePhoto:{
  //     data:Buffer,
  //     contentType:{type:String , default:'image/jpeg'}
  // }
});
const User = mongoose.model("User", UserSchema);
export default User;
// console.log("Userschema", typeof UserSchema);
