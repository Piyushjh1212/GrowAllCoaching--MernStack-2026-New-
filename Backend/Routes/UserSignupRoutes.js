import express from "express";
<<<<<<< HEAD
import { UserLoginController, UserSignupController } from "../Controllers/UserSignupController.js";
=======
import { GatAlltheUser, UserLoginController, UserSignupController } from "../Controllers/UserSignupController.js";
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
import { LoginrateLimiter, protect, SignuprateLimiter, speedSlowDownLimiter } from "../Middleware/Userauthmiddlewear.js";
import { customSanitize } from "../Middleware/CustomSanitizecloneMiddlewear.js";
import UserSignup from "../Modals/UserSignupModal.js"

const UserLoginSignup = express.Router();
<<<<<<< HEAD
UserLoginSignup.post("/Signup", customSanitize, speedSlowDownLimiter, SignuprateLimiter, UserSignupController)

UserLoginSignup.post("/Login", customSanitize, speedSlowDownLimiter, LoginrateLimiter, UserLoginController)

UserLoginSignup.get("/profile", protect, (req, res) => {
    res.json({
        name: req.user.name,
        email: req.user.email,
        JoiningDate: new Date(req.user.createdAt).toLocaleDateString(),
        profilePic:req.user.profilePic
    });
});

UserLoginSignup.get('/totalUser-count', async (req, res) => {
    try {
        const count = await UserSignup.countDocuments(); // total messages
        res.status(200).json({ success: true, count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
})


=======
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
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c

export default UserLoginSignup