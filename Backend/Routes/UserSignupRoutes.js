import express from "express";
import { GatAlltheUser, UserLoginController, UserSignupController } from "../Controllers/UserSignupController.js";
import { LoginrateLimiter, protect, SignuprateLimiter, speedSlowDownLimiter } from "../Middleware/Userauthmiddlewear.js";
import { customSanitize } from "../Middleware/CustomSanitizecloneMiddlewear.js";
import UserSignup from "../Modals/UserSignupModal.js"

const UserLoginSignup = express.Router();
UserLoginSignup.post("/Signup",customSanitize , speedSlowDownLimiter, SignuprateLimiter,  UserSignupController )

UserLoginSignup.post("/Login",customSanitize, speedSlowDownLimiter ,LoginrateLimiter, UserLoginController)

UserLoginSignup.get("/profile", protect, (req, res) => {res.json(req.user);});

UserLoginSignup.get('/totalUser-count', async (req, res) =>{
     try {
          const count = await UserSignup.countDocuments(); // total messages
          res.status(200).json({ success: true, count });
      } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Server Error" });
      }
})

UserLoginSignup.get("/Get-all-theUser", GatAlltheUser)

export default UserLoginSignup