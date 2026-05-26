import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("MongoDB connection failed on dberror", err);
    process.exit(1);
  }
};
export default ConnectDB;
