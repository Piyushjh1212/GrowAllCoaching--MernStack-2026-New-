// Controllers/UserSignupController.js
import UserSignup from "../Modals/UserSignupModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sanitizeHtml from "sanitize-html";
import { logSecurityEventHelper } from "../Helpers/SuspiouslogHelper.js";

// ------------------- SIGNUP -------------------
export const UserSignupController = async (req, res) => {
  try {

    let { name, email, password, confirmPassword, profilePic } = req.sanitizedBody;

    name = sanitizeHtml(name?.trim() || "");
    email = sanitizeHtml(email?.trim().toLowerCase() || "");
    password = sanitizeHtml(password?.trim() || "");
    confirmPassword = sanitizeHtml(confirmPassword?.trim() || "");

    if ([name, email, password, confirmPassword].some(v => v.includes("<script>"))) {
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "sanitize-block",
        message: "Suspicious input detected in signup"
      });
    }

    if (!name || !email || !password || !confirmPassword) {
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "signup-failed",
        message: "Empty fields"
      });

      return res.status(400).json({ message: "All fields required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password !== confirmPassword) {
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "signup-failed",
        message: "Passwords do not match"
      });

      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const userExists = await UserSignup.findOne({ email });

    if (userExists) {
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "signup-failed",
        message: "User already exists"
      });

      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UserSignup.create({
      name,
      email,
      password: hashedPassword,
      profilePic
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "14d" }
    );

    // ✅ COOKIE ADD KI
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 14 * 24 * 60 * 60 * 1000
    });

    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userId: user._id,
      type: "signup-success",
      message: "User registered successfully"
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {

    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      type: "signup-error",
      message: error.message
    });

    res.status(500).json({ message: error.message });
  }
};

// ------------------- LOGIN -------------------
export const UserLoginController = async (req, res) => {
  try {

    let { email, password } = req.sanitizedBody;

    email = sanitizeHtml(email?.trim().toLowerCase() || "");
    password = sanitizeHtml(password?.trim() || "");

    if ([email, password].some(v => v.includes("<script>"))) {
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "sanitize-block",
        message: "Suspicious input detected in login"
      });
    }

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await UserSignup.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "14d" }
    );

    // ✅ COOKIE ADD KI
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 14 * 24 * 60 * 60 * 1000,
      path: "/" 
    });

    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userId: user._id,
      type: "login-success",
      message: "User logged in successfully"
    });

    res.status(200).json({
      message: "Login successful"
    });

  } catch (error) {

    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      type: "login-error",
      message: error.message
    });

    res.status(500).json({ message: "Server error" });
  }
};


export const UserLogout = async (req, res) => {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/" 
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }  
}; // needs to be change if you are working on development mode

// ------------------- GET ALL USERS -------------------
export const GatAlltheUser = async (req, res) => {
  try {

    const users = await UserSignup
      .find()
      .select("-password");

    res.status(200).json({
      success: true,
      users
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};