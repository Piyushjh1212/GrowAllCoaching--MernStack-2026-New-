import express from "express";
import { UserLoginController, UserSignupController } from "../Controllers/UserSignupController.js";
import { protect } from "../Middleware/authmiddlewear.js";

const UserLoginSignup = express.Router();
UserLoginSignup.post("/Signup", UserSignupController )

UserLoginSignup.post("/Login", UserLoginController)

UserLoginSignup.get("/profile", protect, (req, res) => {
  res.json(req.user);
});


export default UserLoginSignup