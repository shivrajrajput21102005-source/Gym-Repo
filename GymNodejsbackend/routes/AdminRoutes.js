import express from "express";
const adminRoutes = express.Router();
export default adminRoutes.get("data",(req,res)=>{
    res.json({code:"Admin routes only "})
})

