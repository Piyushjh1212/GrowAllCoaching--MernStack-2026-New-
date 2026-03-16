import express from "express";
import { GatAlltheUser, UserLoginController, UserSignupController } from "../Controllers/UserSignupController.js";
import { adminProtect, LoginrateLimiter, protect, SignuprateLimiter, speedSlowDownLimiter } from "../Middleware/Userauthmiddlewear.js";
import { customSanitize } from "../Middleware/CustomSanitizecloneMiddlewear.js";
import UserSignup from "../Modals/UserSignupModal.js";

const UserLoginSignup = express.Router();

// Signup route
UserLoginSignup.post(
  "/Signup",
  customSanitize,
  speedSlowDownLimiter,
  SignuprateLimiter,
  UserSignupController
);

// Login route
UserLoginSignup.post(
  "/Login",
  customSanitize,
  speedSlowDownLimiter,
  LoginrateLimiter,
  UserLoginController
);

// Profile route
UserLoginSignup.get("/profile", protect, (req, res) => {
  res.json({
    name: req.user.name,
    email: req.user.email,
    JoiningDate: new Date(req.user.createdAt).toLocaleDateString(),
    profilePic: req.user.profilePic,
    purchasedModules: req.user.purchasedModules
  });
});

// Total users count
UserLoginSignup.get("/totalUser-count", adminProtect ,async (req, res) => {
  try {
    const count = await UserSignup.countDocuments();
    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Get all users
UserLoginSignup.get("/Get-all-theUser",adminProtect , GatAlltheUser);



export default UserLoginSignup;