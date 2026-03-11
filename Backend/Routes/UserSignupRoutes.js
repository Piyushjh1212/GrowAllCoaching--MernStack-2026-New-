import express from "express";
import { UserLoginController, UserSignupController } from "../Controllers/UserSignupController.js";
import { LoginrateLimiter, protect, SignuprateLimiter, speedSlowDownLimiter } from "../Middleware/Userauthmiddlewear.js";

const UserLoginSignup = express.Router();
UserLoginSignup.post("/Signup",speedSlowDownLimiter, SignuprateLimiter,  UserSignupController )

UserLoginSignup.post("/Login", speedSlowDownLimiter ,LoginrateLimiter, UserLoginController)

UserLoginSignup.get("/profile", protect, (req, res) => {res.json(req.user);});


export default UserLoginSignup