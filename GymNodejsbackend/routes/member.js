import express from "express";
const userRoute = express.Router();
userRoute.get("/u", async (req, res) => {
  res.json("user route only");
});
export default userRoute