import mongoose from "mongoose";
const ConnectDB = async () => {
  try {
    console.log(process.env.MONGO_URI, { dbName: process.env.MONGO_DB_NAME });
    await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.MONGO_DB_NAME });

    console.log(
      "MongoDB connected successfully",
      mongoose.connection.name,
      mongoose.connection.readyState,
     
      process.env.MONGO_URI,
    );
  } catch (err) {
    console.log(
      "MongoDB connection failed on dberror",
      err,
      "uri==",
      process.env.MONGO_URI,
    );
    process.exit(1);
  }
};
export default ConnectDB;
