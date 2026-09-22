import express from "express";
const adminRoutes = express.Router()
 adminRoutes.get("/a", (req, res) => {
  res.json({ code: "Admin routes only " });
});
// export const adminuser = adminRoutes.get("/au", (req, res) => {
//   res.json({ code: "Admin user routes only " });
// });
// export const adminusereditor = adminRoutes.get("/aue", (req, res) => {
//   res.json({ code: "admin editor user routes only " });
// });
export default adminRoutes;
